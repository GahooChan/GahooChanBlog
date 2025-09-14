import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/GahooChenBlog/",

  lang: "zh-CN",
  title: "GahooChen的个人博客",
  description: "分享技术，分享快乐",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
