import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "关于我",
    icon: "circle-info",
    children: [
      { text: "个人简介", icon: "user", link: "/intro.md" },
      { text: "博客心路历程", icon: "book-open", link: "/blog_story.md" },
    ],
  },
  {
    text: "文章",
    icon: "file-lines",
    children: [
      { text: "开发问题记录与分享", icon: "bug", link: "/problems/" },
      { text: "编程语言基础与算法学习", icon: "code", link: "/programming-languages/" },
    ],
  },
]);
