import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    "intro",
    "blog_story",
    {
      text: "开发问题记录与分享",
      icon: "bug",
      prefix: "problems/",
      children: "structure",
    },
    {
      text: "编程语言基础与算法学习",
      icon: "code",
      prefix: "programming-languages/",
      children: "structure"
    },
  ],
});
