---
title: tailwind
abbrlink: 3
---
Tailwind CSS IntelliSense插件配置

- 添加自定义提示

  在 VsCode 配置里添加

  ```json
  "tailwindCSS.experimental.classRegex": [
      "classNames\\(([^)]*)"
    ],
  ```

  在使用classNames库时就有智能提示

  ```ts
  import classNames from "classnames";
  let titleClass = classNames("输入时有智能提示");
  ```

  