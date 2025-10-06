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
          text: "公共编程概念",
          prefix: "common-concepts/",
          children: [
            "",
            "01-procedural-programming.md",
            "02-object-oriented-programming.md",
            "03-functions-basics.md",
            "04-data-structures-basics.md",
            "05-algorithms-basics.md",
            "06-design-patterns.md"
          ]
        },
        {
          text: "数学计算",
          prefix: "math-calculations/",
          children: [
            "",
            "01-number-systems-bitwise-principles.md",
            "02-vector-operations.md",
            "03-matrix-operations.md"
          ]
        },
        {
          text: "编程工具",
          prefix: "programming-tools/",
          children: [
            "",
            "01-cmake-basics.md",
            "02-git-basics.md"
          ]
        },
        {
          text: "C语言",
          prefix: "c/",
          children: [
            "",
            "01-first-program.md",
            "02-variables-data-types.md",
            "03-operators.md",
            "04-control-statements.md",
            "05-loops.md",
            "06-practice-summary.md",
            "07-functions-arrays.md",
            "08-bitwise-operations.md",
            "09-practice-functions-arrays.md",
            "10-pointers-basics.md",
            "11-memory-management.md",
            "12-algorithm-basics.md",
            "13-structs-unions.md",
            "14-file-io.md",
            "15-sorting-algorithms.md",
            "16-searching-algorithms.md"
          ]
        },
        {
          text: "C++",
          prefix: "cpp/",
          children: [
            "",
            "01-getting-started.md",
            "02-enhanced-data-types.md",
            "03-io-operations.md",
            "04-enhanced-functions.md",
            "05-classes-objects.md",
            "06-constructors-destructors.md",
            "07-inheritance-polymorphism.md",
            "08-operator-overloading.md",
            "09-templates.md",
            "10-standard-library-containers.md",
            "11-standard-library-algorithms.md",
            "12-exception-handling.md",
            "13-raii-resource-management.md",
            "14-namespaces.md",
            "15-stl-algorithms.md",
            "16-memory-model.md",
            "17-multithreading.md",
            "18-move-semantics.md",
            "19-smart-pointers.md",
            "20-modern-cpp-features.md"
          ]
        },
        {
          text: "C#",
          prefix: "csharp/",
          children: [""]
        },
        {
          text: "Java",
          prefix: "java/",
          children: [""]
        },
        {
          text: "Python",
          prefix: "python/",
          children: [
            "",
            "01-first-program.md",
            "02-variables-data-types.md",
            "03-operators-expressions.md",
            "04-input-output.md",
            "05-conditional-statements.md",
            "06-loop-statements.md",
            "07-practice-summary.md",
            "08-lists.md",
            "09-tuples-sets-dictionaries.md",
            "10-strings-and-regular-expressions.md",
            "11-functions.md",
            "12-modules-packages.md",
            "13-exceptions-handling.md",
            "14-file-handling.md",
            "15-object-oriented-programming.md",
            "16-advanced-oop.md",
            "17-iterators-generators-coroutines.md",
            "18-context-managers-decorators.md",
            "19-advanced-topics.md",
            "20-concurrency.md",
            "21-network-programming.md",
            "22-database-programming.md",
            "23-gui-programming.md",
            "24-graphics-and-multimedia.md",
            "25-scientific-computing-data-analysis.md"
          ]
        }
      ]
    },
  ],
});
