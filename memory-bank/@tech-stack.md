# 技术栈推荐：JoJo 命运引力

## 结论

最适合本网站的技术栈是：

**React + TypeScript + Vite + Cytoscape.js + 本地 JSON 数据 + CSS Modules + Vitest + Playwright + Cloudflare Pages**

这是一个以“交互式人物关系图谱”为核心的网站，不是多人实时游戏，也不是 3D 场景应用。因此首版不建议使用 Three.js、WebSocket、数据库或后端服务。最简单且稳健的方案是把它做成一个静态前端应用，用成熟的 2D 图谱库处理节点、关系线、布局、缩放、拖拽和点击交互。

## 推荐技术栈

| 模块 | 推荐选择 | 用途 |
| --- | --- | --- |
| 应用框架 | React | 构建界面、详情面板、筛选栏、状态视图 |
| 类型系统 | TypeScript | 约束角色、关系、收藏物等数据结构 |
| 构建工具 | Vite | 本地开发快、配置少、适合静态部署 |
| 图谱引擎 | Cytoscape.js | 渲染交互式关系网络、节点、边、布局和图谱事件 |
| 状态管理 | React Context + 自定义 Hooks | 首版足够，不额外引入复杂状态库 |
| 数据存储 | 静态 JSON 文件 | 存角色、关系、收藏触发规则，便于扩展和版本管理 |
| 数据校验 | Zod | 校验 JSON 数据结构，避免内容错误导致页面崩溃 |
| 样式方案 | CSS Modules | 简单、稳定、不会和全局样式互相污染 |
| 动效 | CSS Transition + 少量 Web Animations API | 满足高亮、面板切换、黄金旋回动效，避免过重依赖 |
| 单元测试 | Vitest | 测试筛选逻辑、数据校验、收藏触发规则 |
| 端到端测试 | Playwright | 测试搜索、点击节点、筛选、移动端布局 |
| 部署 | Cloudflare Pages | 静态网站部署简单、速度快、无需维护服务器 |

## 为什么这是最简单但最健壮的方案

### 1. 不需要后端

当前设计文档里的核心功能包括：

- 人物关系图谱
- 角色详情面板
- 部数、家族、关系类型筛选
- 圣者遗体收藏进度
- 搜索和聚焦节点

这些都可以在浏览器端完成。首版使用静态 JSON 数据即可，不需要数据库、登录系统、API 服务或 WebSocket。

### 2. 不需要 Three.js

Three.js 适合 3D 场景、实时渲染、游戏或空间交互。这个网站的核心是“读清楚复杂关系”，2D 图谱比 3D 更容易扫描、筛选和理解。

如果使用 Three.js，首版会增加以下复杂度：

- 相机控制
- 3D 节点遮挡
- 点击拾取
- 移动端性能
- 文字标签可读性
- 无障碍支持

这些复杂度不会明显提升关系图谱的可用性。

### 3. Cytoscape.js 比手写 D3 图谱更省风险

D3 很强，但更偏底层，需要自己处理很多图谱交互细节。Cytoscape.js 本身就是图论和网络可视化库，内置节点、边、布局、选择、平移、缩放、手势和图谱查询能力，更适合这个网站。

它还支持 JSON 序列化、图谱样式、选择器、图算法和移动端手势，后续扩展到更多角色也更稳。

### 4. React Context 足够首版使用

首版状态不会太复杂，主要包括：

- 当前选中角色
- 当前筛选条件
- 当前搜索关键词
- 当前图谱视图模式
- 已发现收藏物

这些用 React Context + 自定义 Hooks 可以保持简单。只有当后续状态变复杂，例如多面板、历史记录、用户自定义布局、复杂撤销重做时，再考虑 Zustand。

## 建议目录结构

```txt
src/
  app/
    App.tsx
    routes.ts
  components/
    GraphCanvas/
      GraphCanvas.tsx
      graphStyles.ts
    CharacterPanel/
      CharacterPanel.tsx
    FilterBar/
      FilterBar.tsx
    Legend/
      Legend.tsx
    CollectiblesBar/
      CollectiblesBar.tsx
  data/
    characters.json
    relationships.json
    collectibles.json
  domain/
    schema.ts
    graph.ts
    filters.ts
    collectibles.ts
  hooks/
    useGraphSelection.ts
    useFilters.ts
    useCollectibles.ts
  styles/
    tokens.css
    global.css
  tests/
    filters.test.ts
    schema.test.ts
    collectibles.test.ts
```

## 核心数据模型

```ts
export type Character = {
  id: string;
  name: string;
  romanizedName: string;
  part: number[];
  family: "Joestar" | "Brando" | "Zeppeli" | "Other";
  role: "protagonist" | "antagonist" | "ally" | "mentor" | "other";
  stand?: string | null;
  quote?: string;
  summary: string;
  tags: string[];
};

export type Relationship = {
  id: string;
  source: string;
  target: string;
  type: "blood" | "rivalry" | "ally" | "mentor" | "fate" | "parallel";
  label: string;
  part: number[];
  strength: 1 | 2 | 3 | 4 | 5;
  description: string;
};
```

## 推荐安装依赖

```bash
npm create vite@latest jojo-fate-gravity -- --template react-ts
cd jojo-fate-gravity
npm install cytoscape zod
npm install -D vitest playwright @playwright/test
```

可选依赖：

```bash
npm install cytoscape-fcose
```

只有当默认布局不能满足复杂关系图时，再加入 `cytoscape-fcose`。首版可以先用 Cytoscape.js 自带布局。

## 不推荐首版使用

| 技术 | 不推荐原因 |
| --- | --- |
| Next.js | 当前没有服务端渲染、接口路由或复杂 SEO 需求，Vite 更简单 |
| Three.js | 关系图谱不需要 3D，反而增加可读性和性能风险 |
| WebSocket | 没有多人实时协作需求 |
| 数据库 | 首版内容可以静态 JSON 管理 |
| Redux | 状态规模不大，首版过重 |
| Framer Motion | 可以后续加入，首版用 CSS/Web Animations 更轻 |
| D3 全手写图谱 | 灵活但实现成本更高，交互细节容易变复杂 |

## 什么时候升级技术栈

### 加入 Zustand

当出现以下需求时再加入：

- 多个复杂面板共享状态
- 用户自定义图谱布局
- 撤销/重做
- 跨页面持久化状态

### 加入后端

当出现以下需求时再加入：

- 用户登录
- 云端收藏同步
- 用户投稿角色关系
- 管理后台
- 评论或社区功能

推荐升级路线：

**Cloudflare Pages + Cloudflare Workers + D1**

### 加入 Three.js

只有当网站明确转向 3D 体验时再加入，例如：

- 3D 星图式命运宇宙
- 角色节点空间漫游
- 可旋转的圣者遗体 3D 收藏陈列

不建议把核心关系图谱改成 3D。

## 最小可交付版本

第一版只需要实现：

1. React 页面框架。
2. Cytoscape.js 图谱画布。
3. JSON 角色和关系数据。
4. 点击节点显示角色详情。
5. 搜索角色。
6. 按部数和关系类型筛选。
7. 圣者遗体本地收藏进度。
8. 桌面和移动端基础适配。
9. 关键逻辑的 Vitest 测试。
10. 一条 Playwright 冒烟测试：打开网站、搜索角色、点击节点、看到详情。

## 参考来源

- Cytoscape.js 官方文档：https://js.cytoscape.org/
- React TypeScript 官方文档：https://react.dev/learn/typescript
- Vitest 官方文档：https://vitest.dev/
- Zod 官方文档：https://zod.dev/
- Cloudflare Pages React 文档：https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/

