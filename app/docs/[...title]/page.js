import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import Article from "@/views/docs/Article";
import { notFound } from "next/navigation";

import md from "./md";
import getTheme from "@/utils/getTheme";

import "@/style/atom-one-dark.min.css";

function markdownToHtml(markdown) {
  const fmRegex = /---(.*?)---/gs;
  return {
    meta: yaml.load(fmRegex.exec(markdown)[1]),
    content: md.render(markdown.replace(fmRegex, "")),
  };
}

export async function generateMetadata({ params, searchParams }, parent) {
  const title = params.title.map((item) => decodeURI(item));
  return {
    title: title[title.length - 1],
    keywords: title,
  };
}

// 实现缓存
const renderResult = new Map();

export default async function Page(props) {
  const [darkMode] = getTheme();

  const title = path.join(...props.params.title.map((item) => decodeURI(item)));

  // 渲染结果
  let mdHtml;

  if (renderResult.has(title)) {
    mdHtml = renderResult.get(title);
  } else {
    // 获取文件路径
    const mdPath = path.join(process.cwd(), "docs", `${title}.md`);
    // 判断文件是否存在
    if (!fs.existsSync(mdPath)) return notFound();
    // 读取文件
    const mdFile = await fs.promises.readFile(mdPath, "utf-8");
    // 获取渲染结果
    mdHtml = markdownToHtml(mdFile).content;
    // 缓存
    renderResult.set(title, mdHtml);
  }

  return <Article content={mdHtml} darkMode={darkMode} />;
}
