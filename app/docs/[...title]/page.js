import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { notFound } from "next/navigation";

import Article from "@/views/docs/Article";

import md from "./md";
import store from "../../store";
import getTheme from "@/utils/getTheme";

import "@/style/docs.css";
import "@/style/atom-one-dark.min.css";

function markdownToHtml(markdown) {
  const fmRegex = /---(.*?)---/gs;
  return {
    meta: yaml.load(fmRegex.exec(markdown)[1]),
    content: md.render(markdown),
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

  // 获取文章标题
  const title = decodeURI(props.params.title[props.params.title.length - 1]);

  // 获取文章url
  let url = path.join(...props.params.title.map((item) => decodeURI(item)));
  // 找到相邻文章
  const nearPage = await store.getNearPage(url);

  // 获取文章目录
  const toc =  await store.getToc(path.join("docs", url+".md"),title);

  // 渲染结果
  let mdHtml;

  if (renderResult.has(url)) {
    mdHtml = renderResult.get(url);
  } else {
    // 获取文件路径
    const mdPath = path.join(process.cwd(), "docs", `${url}.md`);
    // 判断文件是否存在
    if (!fs.existsSync(mdPath)) return notFound();
    // 读取文件
    const mdFile = await fs.promises.readFile(mdPath, "utf-8");
    // 获取渲染结果
    mdHtml = markdownToHtml(mdFile).content;
    // 缓存
    renderResult.set(url, mdHtml);
  }

  return (
    <Article
      title={title}
      content={mdHtml}
      darkMode={darkMode}
      nearPage={nearPage}
      toc={toc}
    />
  );
}
