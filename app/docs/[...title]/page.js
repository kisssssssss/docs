import path from "path";
import { notFound } from "next/navigation";

import Article from "@/views/docs/Article";

import store from "../../store";
import getTheme from "@/utils/getTheme";

import "@/style/docs.css";
import "@/style/atom-one-dark.min.css";

export async function generateMetadata({ params, searchParams }, parent) {
  const title = params.title.map((item) => decodeURI(item));
  return {
    title: title[title.length - 1],
    keywords: title,
  };
}

export default async function Page(props) {
  const [darkMode] = getTheme();

  // 获取文章标题
  const title = decodeURI(props.params.title[props.params.title.length - 1]);

  // 获取文章url和文件路径
  const urlArray = props.params.title.map((item) => decodeURI(item));
  const urlPath = path.join(...urlArray);
  const mdPath = path.join(process.cwd(), "docs", `${urlPath}.md`);

  // 找到相邻文章
  const nearPage = await store.getNearPage(urlPath);

  // 获取文章目录
  const toc = await store.getToc(mdPath);

  // 渲染结果
  let mdHtml = await store.getRenderResult(urlPath, mdPath, () => {
    notFound();
  });

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
