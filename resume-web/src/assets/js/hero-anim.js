/**
 * Homepage hero visual — GSAP loop (prefers-reduced-motion safe)
 */
(function () {
  function boot() {
    if (typeof gsap === "undefined") return;
    const root = document.querySelector(".hero-visual");
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(root.querySelectorAll(".resume-paper, .float-note, .ai-seal, .progress span, .score"), {
        clearProps: "all"
      });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const paper = root.querySelector(".resume-paper");
      const stack = root.querySelector(".paper-stack");
      const noteA = root.querySelector(".note-a");
      const noteB = root.querySelector(".note-b");
      const noteC = root.querySelector(".note-c");
      const seal = root.querySelector(".ai-seal");
      const bar = root.querySelector(".progress span");
      const score = root.querySelector(".score");
      const chips = root.querySelectorAll(".keyword-chip");

      gsap.set([noteA, noteB, noteC], { transformOrigin: "50% 50%" });
      if (bar) gsap.set(bar, { scaleX: 0.35, transformOrigin: "left center" });

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power1.inOut" } });

      // card gentle float + tilt
      if (paper) {
        tl.to(paper, { y: -10, rotation: -2.2, duration: 2.4 }, 0)
          .to(paper, { y: 4, rotation: -0.8, duration: 2.6 }, 2.4)
          .to(paper, { y: 0, rotation: -1.5, duration: 2.2 }, 5);
      }
      if (stack) {
        tl.to(stack, { y: -6, duration: 2.5 }, 0.2).to(stack, { y: 0, duration: 2.5 }, 2.7);
      }

      // floating notes
      if (noteA) {
        tl.fromTo(noteA, { y: 12, autoAlpha: 0.55 }, { y: -6, autoAlpha: 1, duration: 1.8 }, 0.3)
          .to(noteA, { y: 4, duration: 2 }, 2.2)
          .to(noteA, { y: 0, duration: 1.6 }, 4.2);
      }
      if (noteB) {
        tl.fromTo(noteB, { y: -8, autoAlpha: 0.5 }, { y: 8, autoAlpha: 1, duration: 2 }, 0.6)
          .to(noteB, { y: -4, duration: 2.2 }, 2.6)
          .to(noteB, { y: 0, duration: 1.8 }, 4.8);
      }
      if (noteC) {
        tl.fromTo(noteC, { y: 10, autoAlpha: 0.55 }, { y: -8, autoAlpha: 1, duration: 1.9 }, 0.9)
          .to(noteC, { y: 2, duration: 2.1 }, 2.9)
          .to(noteC, { y: 0, duration: 1.7 }, 5);
      }

      // AI seal pulse / orbit feel
      if (seal) {
        tl.to(seal, { scale: 1.06, duration: 1.2 }, 0)
          .to(seal, { scale: 0.96, duration: 1.2 }, 1.2)
          .to(seal, { scale: 1.04, duration: 1.2 }, 2.4)
          .to(seal, { scale: 1, duration: 1.2 }, 3.6)
          .to(seal, { rotation: 8, duration: 2 }, 0.5)
          .to(seal, { rotation: -6, duration: 2.2 }, 2.5)
          .to(seal, { rotation: 0, duration: 1.8 }, 4.7);
      }

      // progress bar breathe
      if (bar) {
        tl.to(bar, { scaleX: 0.78, duration: 2.2 }, 0.4)
          .to(bar, { scaleX: 0.52, duration: 1.8 }, 2.6)
          .to(bar, { scaleX: 0.72, duration: 2 }, 4.4)
          .to(bar, { scaleX: 0.35, duration: 1.6 }, 6.4);
      }

      // score ring soft pulse
      if (score) {
        tl.to(score, { scale: 1.05, duration: 1.5 }, 0.8)
          .to(score, { scale: 1, duration: 1.5 }, 2.3)
          .to(score, { scale: 1.04, duration: 1.4 }, 4)
          .to(score, { scale: 1, duration: 1.4 }, 5.4);
      }

      // keyword chips stagger blink
      if (chips.length) {
        tl.to(
          chips,
          { y: -3, stagger: 0.12, duration: 0.7, yoyo: true, repeat: 1 },
          1.2
        );
      }

      // total loop length ~7.2s
      tl.to({}, { duration: 0.4 });

      return () => {
        tl.kill();
      };
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
