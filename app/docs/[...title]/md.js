import fs from "fs";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js/lib/core";

// 导入 markdown 插件
import { sup } from "@mdit/plugin-sup";
import { sub } from "@mdit/plugin-sub";
import anchor from "markdown-it-anchor";
import { mark } from "@mdit/plugin-mark";
import mathjax from "markdown-it-mathjax3";
import { figure } from "@mdit/plugin-figure";
import { tasklist } from "@mdit/plugin-tasklist";
import frontMatter from "markdown-it-front-matter";
import { container } from "@mdit/plugin-container";
import multimdTable from "markdown-it-multimd-table";

// 导入 hljs 语言
import cpp from "highlight.js/lib/languages/cpp";
import xml from "highlight.js/lib/languages/xml";
import json from "highlight.js/lib/languages/json";
import plaintext from "highlight.js/lib/languages/plaintext";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";

hljs.registerLanguage("xml", xml);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("json", json);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("plaintext", plaintext);

// markdown 配置
const markdownOptions = {
  html: true,
  linkify: true,
  typographer: true,
  highlight: (code, language) => {
    language = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
};

// 容器配置
const containerOption = {
  infoContainer: {
    name: "info",
    openRender: (tokens, index, _options) => {
      const info = tokens[index].info.trim().trim();
      return `<div class="custom-container info">`;
      // return `<div class="custom-container info">\n<p class="custom-container-title info">${info || 'Info'}</p>\n`;
    },
  },
  tipContainer: {
    name: "tip",
    openRender: (tokens, index, _options) => {
      const tip = tokens[index].info.replace("tip", "").trim();
      if (tip) {
        return `<div class="custom-container tip">\n<p class="custom-container-title tip">${tip || "Tip"}</p>\n`;
      } else {
        return `<div class="custom-container tip">`;
      }
    },
  },
  warningContainer: {
    name: "warning",
    openRender: (tokens, index, _options) => {
      const info = tokens[index].info.trim().trim();
      return `<div class="custom-container warning">`;
      // return `<div class="custom-container warning">\n<p class="custom-container-title warning">${info || 'Warning'}</p>\n`;
    },
  },
  errorContainer: {
    name: "error",
    openRender: (tokens, index, _options) => {
      const info = tokens[index].info.trim().trim();
      return `<div class="custom-container error">`;
      // return `<div class="custom-container error">\n<p class="custom-container-title error">${info || 'Error'}</p>\n`;
    },
  },
  detailsContainer: {
    name: "details",
    openRender: (tokens, index, _options) => {
      const info = tokens[index].info.replace("details", "").trim();
      return `<details>
        <summary><p>${info || "详情"}</p></summary><div class="details-content">
      `;
    },
    closeRender: (tokens, index, _options) => {
      return `</div></details>`;
    },
  },
};

// 存储 front matter 数据的变量
let frontMatterData = {};
function saveFrontMatter(fm) {
  fm.split("\n").forEach((item) => {
    if (item) {
      const [key, value] = item.split(":");
      frontMatterData[key.trim()] = value.trim();
    }
  });
}

// 修改图片URL
function modifyImageURLs(md) {
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const originalUrl = token.attrGet("src");
    const modifiedUrl = modifyURL(originalUrl, frontMatterData);
    token.attrSet("src", modifiedUrl);
    return self.renderToken(tokens, idx, options);
  };
}
// 根据 front matter 的 typoraRootUrl 修改 URL
function modifyURL(url, frontMatter) {
  /**
   * 因为本地在typora使用相对路径，如![](123.png)
   * 因此 URL 长度大于 7，说明我使用的不是相对路径，大概率是网络图片，直接返回即可
   * **/
  if (url.length > 7) return url;
  // 使用 front matter 中的 typora-root-url
  const typoraRootUrl = frontMatter["typora-root-url"];
  if (!typoraRootUrl) {
    return url; // 如果没有 typora-root-url，就返回原始 URL
  }

  // 提取路径中关键部分
  const match = typoraRootUrl.match(/docs[\\/].+/);
  const relativePath = match ? match[0].replace(/\\/g, "/") : "";

  // 拼接完整的 URL
  const baseURL =
    "https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/";
  const fullUrl = `${baseURL}${relativePath}/${url}`;

  return fullUrl;
}

export const DEFAULT_MARKDOWN = new MarkdownIt(markdownOptions)
  .use(frontMatter, saveFrontMatter)
  .use(mathjax)
  .use(sup)
  .use(sub)
  .use(mark)
  .use(anchor)
  .use(figure, {})
  .use(multimdTable)
  .use(modifyImageURLs)
  .use(tasklist, { disabled: false })
  .use(container, containerOption.tipContainer)
  .use(container, containerOption.infoContainer)
  .use(container, containerOption.errorContainer)
  .use(container, containerOption.detailsContainer)
  .use(container, containerOption.warningContainer);

export async function markdown2Html(key, filePath) {
  const startTime = Date.now();

  // 读取文件
  const mdFile = await fs.promises.readFile(filePath, "utf-8");

  // 获取渲染结果
  const html = DEFAULT_MARKDOWN.render(mdFile);

  console.log(`执行 ${key} 耗时：${Date.now() - startTime}ms`);

  return html;
}

export default DEFAULT_MARKDOWN;
