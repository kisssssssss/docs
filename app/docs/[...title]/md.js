import MarkdownIt from "markdown-it";
import hljs from "highlight.js/lib/core";

// 导入 markdown 插件
import { sup } from "@mdit/plugin-sup";
import { sub } from "@mdit/plugin-sub";
import anchor from "markdown-it-anchor";
import { mark } from "@mdit/plugin-mark";
import mathjax from "markdown-it-mathjax3";
import { tasklist } from "@mdit/plugin-tasklist";
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

export default new MarkdownIt(markdownOptions)
  .use(mathjax)
  .use(sup)
  .use(sub)
  .use(mark)
  .use(anchor)
  .use(multimdTable)
  .use(tasklist, { disabled: false })
  .use(container, containerOption.tipContainer)
  .use(container, containerOption.infoContainer)
  .use(container, containerOption.errorContainer)
  .use(container, containerOption.detailsContainer)
  .use(container, containerOption.warningContainer);
