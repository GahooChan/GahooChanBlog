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
      children: [
        "",
        {
          
          text: "C语言",
          prefix: "c/",
          children: [""],
        },
        {
          text: "C++",
          prefix: "cpp/",
          children: [""],
        },
        {
          text: "C#",
          prefix: "csharp/",
          children: [""],
        },
        {
          text: "Java",
          prefix: "java/",
          children: [""],
        },
        {
          text: "Python",
          prefix: "python/",
          children: [""],
        },
        {
          text: "通用概念",
          prefix: "common-concepts/",
          children: [""],
        },
        {
          text: "数学计算",
          prefix: "math-calculations/",
          children: [""],
        },
        {
          text: "编程工具",
          prefix: "programming-tools/",
          children: [""],
        },
      ],
    },
  ],
});
