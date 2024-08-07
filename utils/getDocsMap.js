"use server";
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

// 获取相邻文章
function getNearPage(docsMap) {
  return docsMap.map((item, index) => {
    if (item.children) {
      return {
        ...item,
        children: getNearPage(item.children),
      };
    } else {
      let pre = null;
      if (index > 0 && !item.isolated) {
        pre = {
          title: docsMap[index - 1].title,
          path: docsMap[index - 1].path,
        };
      }
      let next = null;
      if (index < docsMap.length - 1 && !item.isolated) {
        next = {
          title: docsMap[index + 1].title,
          path: docsMap[index + 1].path,
        };
      }

      return {
        ...item,
        pre,
        next,
      };
    }
  });
}
// 将文件的物理路径转换为 url 路径
function getUrlPath(fileRealPath) {
  let res = fileRealPath.split(path.sep).join("/");
  return res.substring(res.lastIndexOf("docs") + 4).replace(".md", "");
}

// 读取目录
function readDir(dirPath) {
  const entries = fs.readdirSync(dirPath);

  let res = entries.map((entry, index) => {
    const fullPath = path.join(dirPath, entry);

    const isDirectory = fs.statSync(fullPath).isDirectory();

    if (isDirectory) {
      return {
        title: entry,
        key: `${entry}-dir-${index}`,
        children: readDir(fullPath),
      };
    } else {
      const meta = yaml.load(
        /---(.*?)---/gs.exec(fs.readFileSync(fullPath, "utf-8"))[1],
      );
      let temple = entry.replace(".md", "");
      return {
        // 自定义字段
        /**
         * @description 用于排序
         * */
        index: meta.index || 0,
        /**
         * @description 判断文件是否独立，一般无需设定
         * */
        isolated: meta.isolated || false,

        // 渲染时使用的字段
        title: temple,
        key: `${temple}-file-${index}`,
        isLeaf: true,
        path: getUrlPath(fullPath),
      };
    }
  });

  // 排序
  res = res.sort((a, b) => {
    // 两边都是文件
    if (typeof a.index == "number" && typeof b.index == "number") {
      return a.index - b.index;
    }
    // 有一个或者都是是文件夹
    if (a.isLeaf && !b.isLeaf) {
      return 1;
    } else if (!a.isLeaf && b.isLeaf) {
      return -1;
    } else if (!a.isLeaf && !b.isLeaf) {
      return 0;
    }
  });

  return getNearPage(res);
}

export default async function getDocsMap() {
  const startTime = Date.now();

  const savePath = path.join(process.cwd(), "assets", "docsMap.json");

  // 如果存在 Toc.json 文件，则直接返回
  if (fs.existsSync(savePath)) {
    const docsMap = await fs.promises.readFile(savePath, "utf-8");
    console.log(`执行 getDocsMap 耗时：${Date.now() - startTime}ms`);
    return JSON.parse(docsMap);
  }

  const docsMap = readDir(path.join(process.cwd(), "docs"));

  await fs.promises.writeFile(savePath, JSON.stringify(docsMap, null, 2));

  console.log(`执行 getDocsMap 耗时：${Date.now() - startTime}ms`);

  return docsMap;
}
