"use server";
const fs = require("fs");
const path = require("path");

const getMarkdownHeaders = (markdown) => {
  const headers = [];

  // 使用正则表达式一次性匹配所有标题行
  const headerRegex = /^(#{1,6})\s+(.*)$/gm;
  let match;
  while ((match = headerRegex.exec(markdown)) !== null) {
    headers.push({
      text: match[2],
      level: match[1].length,
      children: [],
      index: [], // 用于存储每个标题的索引路径
    });
  }

  function generateToc(headers) {
    const nestedHeaders = [];
    let currentLevel = 1;
    let currentContainer = nestedHeaders;
    const headerStack = [];
    const levelCounters = [0, 0, 0, 0, 0, 0]; // 用于计数各级标题的数量

    headers.forEach((header) => {
      const { level, text } = header;

      // 更新当前级别和更高级别的计数器
      levelCounters[level - 1]++;
      for (let i = level; i < levelCounters.length; i++) {
        levelCounters[i] = 0;
      }

      // 构建索引路径
      const index = levelCounters.slice(0, level).join(".");

      const newItem = {
        text: text,
        level: level,
        children: [],
        index: index,
      };

      if (level === currentLevel) {
        currentContainer.push(newItem);
      } else if (level > currentLevel) {
        while (currentLevel < level) {
          headerStack.push({
            level: currentLevel,
            container: currentContainer,
          });
          currentContainer =
            currentContainer[currentContainer.length - 1].children;
          currentLevel++;
        }
        currentContainer.push(newItem);
      } else {
        while (currentLevel > level) {
          const last = headerStack.pop();
          currentLevel = last.level;
          currentContainer = last.container;
        }
        currentContainer.push(newItem);
      }
    });

    return nestedHeaders;
  }

  function generateTreeData(array) {
    return array.map((item) => ({
      title: item.text,
      key: `${item.text}-${item.index}`,
      children:
        item.children.length === 0 ? null : generateTreeData(item.children),
    }));
  }

  const Toc = generateToc(headers);

  return Toc.length > 0 ? generateTreeData(Toc) : [];
};

export async function getAllToc() {
  const startTime = Date.now();

  const savePath = path.join(process.cwd(), "assets", "Toc.json");

  // 如果存在 Toc.json 文件，则直接返回
  if (fs.existsSync(savePath)) {
    const Toc = await fs.promises.readFile(savePath, "utf-8");
    console.log(`执行 getAllToc 耗时：${Date.now() - startTime}ms`);
    return JSON.parse(Toc);
  }

  let Toc = {};

  // 读取目录
  function read(dirPath) {
    const entries = fs.readdirSync(dirPath);

    entries.forEach((entry, index) => {
      const fullPath = path.join(dirPath, entry);
      const isDirectory = fs.statSync(fullPath).isDirectory();

      if (isDirectory) {
        read(fullPath);
      } else if (entry.includes(".md")) {
        let key = fullPath.split(path.sep);
        key = key
          .slice(key.lastIndexOf("docs") + 1)
          .join(path.sep)
          .replace(".md", "");
        Toc[key] = getMarkdownHeaders(fs.readFileSync(fullPath, "utf-8"));
      }
    });
  }

  read(path.join(process.cwd(), "docs"));

  /**
   * 存储Toc.json的目的是为了减少每次启动时的解析时间
   * **/

  await fs.promises.writeFile(savePath, JSON.stringify(Toc, null, 2));
  console.log(`执行 getAllToc 耗时：${Date.now() - startTime}ms`);

  return Toc;
}

//FIXME 没有考虑文件同名的情况
export async function getToc(filePath) {
  let res = await fs.promises.readFile(filePath, "utf-8");

  return getMarkdownHeaders(res);
}
