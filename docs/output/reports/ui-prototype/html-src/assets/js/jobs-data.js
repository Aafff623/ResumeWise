/**
 * Mock 岗位 + 多份样板简历（占位正文，待调研包替换）
 */
window.RW_JOBS = {
  java: {
    id: "java",
    title: "Java 后端开发实习生",
    keywords: ["Java", "Spring Boot", "MySQL", "RESTful API", "Git", "Maven"],
    requirements: "掌握 Java 基础与集合；了解 Spring Boot、MyBatis；能编写 REST 接口；熟悉 Git。",
    modelResumes: [
      {
        id: "java-a",
        title: "校园项目向 · 扎实版",
        note: "占位样板 · 待调研替换",
        body: `# 李可｜软件工程｜某某大学 2026 届
****求职意向：** ** Java 后端开发实习生

## 教育背景
某某大学 · 本科 · 软件工程 · 2022.09–2026.06

## 专业技能
· Java、集合框架、多线程基础
· Spring Boot、MyBatis、MySQL
· RESTful API 设计与联调
· Git / Maven

## 项目经历
校园活动管理系统｜后端负责人
· 基于 Spring Boot 拆分活动发布、报名、审核模块，提供 REST 接口 12+
· 使用 MyBatis 完成报名状态流转与查询分页，高峰演示并发约 50 QPS 稳定
· 与前端约定接口文档，Git 分支协作完成 3 次迭代演示

## 自我评价
注重接口清晰与可维护性，能在实习节奏下交付可演示的后端模块。`
      },
      {
        id: "java-b",
        title: "接口与协作 · 亮点版",
        note: "占位样板 · 待调研替换",
        body: `# 周衡｜计算机｜某某大学 2026 届
****求职意向：** ** Java 后端开发实习生

## 教育背景
某某大学 · 本科 · 计算机科学与技术 · 2022.09–2026.06

## 专业技能
Java · Spring Boot · MySQL · Redis 基础 · REST · Git

## 项目经历
图书借还微服务练习｜后端
· 独立完成借还、续借接口，统一错误码与分页约定
· 补充接口文档与 Postman 集合，协助联调缩短对接时间
· 使用 Git 管理分支，提交信息规范化

## 校园经历
实验室项目组后端成员，参与周迭代演示。`
      }
    ]
  },
  frontend: {
    id: "frontend",
    title: "前端开发实习生（Vue）",
    keywords: ["Vue3", "JavaScript", "Element Plus", "组件化", "Git", "Axios"],
    requirements: "熟悉 Vue3 与组件化；会使用 JS/ES6；了解工程化与接口联调。",
    modelResumes: [
      {
        id: "fe-a",
        title: "组件化实践 · 扎实版",
        note: "占位样板 · 待调研替换",
        body: `# 王岚｜计算机科学与技术｜某某大学 2026 届
**求职意向：** 前端开发实习生（Vue）

## 教育背景
某某大学 · 本科 · 计算机科学与技术 · 2022.09–2026.06

## 专业技能
· Vue3、Composition API、组件拆分
· JavaScript / ES6、Axios
· Element Plus、基础工程化（Vite）
· Git 协作

## 项目经历
校园二手交易平台｜前端负责人
· 使用 Vue3 + Element Plus 完成商品列表、详情、发布页组件化
· 封装请求层与错误提示，对接 REST 接口完成下单链路
· 优化列表渲染与图片懒加载，首屏体感提升约 30%

## 自我评价
关注组件边界与交互细节，能快速对接后端接口完成演示闭环。`
      },
      {
        id: "fe-b",
        title: "工程化表达 · 亮点版",
        note: "占位样板 · 待调研替换",
        body: `# 林予｜软件工程｜某某大学 2026 届
**求职意向：** 前端开发实习生（Vue）

技能
Vue3 · JavaScript · Element Plus · Git · 接口联调

项目
社团招新站点｜前端
· 拆分表单与列表组件，统一状态管理方式
· 与后端约定字段与错误码，Axios 拦截统一提示
· 移动端基础适配，演示设备可完整走通报名流程`
      }
    ]
  },
  test: {
    id: "test",
    title: "软件测试实习生",
    keywords: ["测试用例", "缺陷管理", "接口测试", "功能测试", "回归"],
    requirements: "会编写测试用例；了解缺陷流程；能做基础接口/功能测试。",
    modelResumes: [
      {
        id: "test-a",
        title: "用例与缺陷 · 扎实版",
        note: "占位样板 · 待调研替换",
        body: `# 赵宁｜软件工程｜某某大学 2026 届
**求职意向：** 软件测试实习生

## 教育背景
某某大学 · 本科 · 软件工程 · 2022.09–2026.06

## 专业技能
· 功能测试、边界与异常路径设计
· 测试用例编写与缺陷报告
· 基础接口测试（Postman）
· Git 基础

## 项目经历
选课系统测试实践｜测试执行
· 针对选课、退课、冲突检测编写用例 40+，覆盖主流程与边界
· 提交缺陷单 15 条，推动 3 个阻断问题在演示前关闭
· 参与回归测试清单整理，保证演示版本可重复走通

## 自我评价
细心记录复现步骤，重视可回归与沟通效率。`
      }
    ]
  },
  product: {
    id: "product",
    title: "产品助理实习生",
    keywords: ["需求分析", "原型", "用户调研", "文档", "Axure"],
    requirements: "能梳理需求；会基础原型；文档表达清晰。",
    modelResumes: [
      {
        id: "pd-a",
        title: "需求与原型 · 扎实版",
        note: "占位样板 · 待调研替换",
        body: `# 陈予｜信息管理｜某某大学 2026 届
**求职意向：** 产品助理实习生

## 教育背景
某某大学 · 本科 · 信息管理与信息系统 · 2022.09–2026.06

## 专业技能
· 需求访谈与用户故事拆分
· 原型：Axure / Figma 基础
· 竞品分析与文档沉淀
· 跨角色沟通

## 项目经历
校园互助小程序｜产品助理
· 访谈 12 名同学，输出痛点列表与优先级矩阵
· 完成核心流程低保真原型，组织 2 次可用性走查
· 编写需求说明与验收标准，跟进开发演示节点

## 自我评价
习惯用结构化文档推动共识，关注「能不能讲清楚为什么做」。`
      }
    ]
  },
  data: {
    id: "data",
    title: "数据分析实习生",
    keywords: ["SQL", "Excel", "数据可视化", "Python", "统计分析"],
    requirements: "会 SQL/Excel；能做基础清洗与可视化；表达结论清晰。",
    modelResumes: [
      {
        id: "data-a",
        title: "SQL 与可视化 · 扎实版",
        note: "占位样板 · 待调研替换",
        body: `# 周然｜数据科学｜某某大学 2026 届
**求职意向：** 数据分析实习生

## 教育背景
某某大学 · 本科 · 数据科学与大数据技术 · 2022.09–2026.06

## 专业技能
· SQL 查询与聚合分析
· Excel 数据透视与清洗
· Python 基础（pandas）
· 可视化图表表达

## 项目经历
食堂消费行为分析｜分析执行
· 清洗 2 万+ 模拟流水，用 SQL 完成分时段与品类汇总
· 输出 3 张核心图表与简要结论，支撑「错峰」建议讨论
· 文档化指标口径，保证结果可复算

## 自我评价
关注指标定义与可复现，能把数据结论讲给人听。`
      }
    ]
  }
};

/** 兼容读取：始终返回样板数组 */
window.RW_getModelResumes = function (job) {
  if (!job) return [];
  if (Array.isArray(job.modelResumes) && job.modelResumes.length) return job.modelResumes;
  if (job.modelResume) return [job.modelResume];
  return [];
};
