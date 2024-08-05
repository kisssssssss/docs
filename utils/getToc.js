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
  // 如果不存在 Toc.json 文件，则直接返回
  if (fs.existsSync(path.join(process.cwd(), "assets",'Toc.json'))) {
    const Toc = await fs.promises.readFile(path.join(process.cwd(), "assets",'Toc.json'), "utf-8");
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
      } else {
        //FIXME 没有考虑文非md文件的情况
        const key = entry.replace(".md", "");
        Toc[key] = getMarkdownHeaders(fs.readFileSync(fullPath, "utf-8"));
      }
    });
  }

  read(path.join(process.cwd(), "docs"));

  let t = Date.now();
  const savePath = path.join(process.cwd(), "assets", "Toc.json");
  fs.writeFile(savePath, JSON.stringify(Toc, null, 2));
  console.log(`Toc.json 已生成，耗时：${t}ms`);

  return Toc;
}

//FIXME 没有考虑文件同名的情况
export async function getToc(filePath) {
  let res = fs.readFileSync(path.join(process.cwd(), filePath), "utf-8");

  return getMarkdownHeaders(res);
}
