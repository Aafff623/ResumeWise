#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
本机 DeepSeek CORS 代理（仅开发/原型用）

用法：
  python deepseek-proxy.py

默认监听 http://127.0.0.1:8787
前端把 Authorization: Bearer <API_Key> 传来，代理转发到 DeepSeek，不落盘、不记日志里的 Key。
"""

from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
import json
import os

PORT = int(os.environ.get("RW_PROXY_PORT", "8787"))
DEFAULT_BASE = "https://api.deepseek.com"


class Handler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization, X-DeepSeek-Base",
        )

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        if self.path in ("/", "/health"):
            body = json.dumps(
                {
                    "ok": True,
                    "service": "resumewise-deepseek-proxy",
                    "port": PORT,
                    "hint": "POST /chat/completions",
                }
            ).encode("utf-8")
            self.send_response(200)
            self._cors()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        self.send_error(404)

    def do_POST(self):
        if not (
            self.path.startswith("/chat/completions")
            or self.path.startswith("/v1/chat/completions")
        ):
            self.send_error(404)
            return

        length = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(length)
        auth = self.headers.get("Authorization") or ""
        base = (self.headers.get("X-DeepSeek-Base") or DEFAULT_BASE).rstrip("/")
        # 兼容 base 是否已带 /v1
        if self.path.startswith("/v1/"):
            target = f"{base}{self.path}"
        else:
            if base.endswith("/v1"):
                target = f"{base}/chat/completions"
            else:
                target = f"{base}/chat/completions"
                # 部分部署需要 /v1 前缀，失败由上游返回

        try:
            req = Request(
                target,
                data=raw,
                method="POST",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": auth,
                },
            )
            with urlopen(req, timeout=120) as resp:
                data = resp.read()
                self.send_response(resp.status)
                self._cors()
                self.send_header(
                    "Content-Type",
                    resp.headers.get("Content-Type", "application/json"),
                )
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)
        except HTTPError as e:
            data = e.read() if e.fp else str(e).encode("utf-8")
            self.send_response(e.code)
            self._cors()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except URLError as e:
            msg = json.dumps({"error": {"message": f"proxy upstream failed: {e.reason}"}}).encode(
                "utf-8"
            )
            self.send_response(502)
            self._cors()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(msg)))
            self.end_headers()
            self.wfile.write(msg)
        except Exception as e:
            msg = json.dumps({"error": {"message": str(e)}}).encode("utf-8")
            self.send_response(500)
            self._cors()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(msg)))
            self.end_headers()
            self.wfile.write(msg)

    def log_message(self, fmt, *args):
        # 不打印 Authorization
        print("[%s] %s" % (self.log_date_time_string(), fmt % args))


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"ResumeWise DeepSeek proxy on http://127.0.0.1:{PORT}")
    print("POST /chat/completions  →  DeepSeek")
    print("Ctrl+C to stop")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nbye")
