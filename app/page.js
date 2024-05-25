import dynamic from "next/dynamic";

import getTheme from "@/utils/getTheme";

import store from "./store";

import "@/style/fullpage.css";

const Home = dynamic(() => import("../views/home/index"), {
  ssr: false,
});

export default async function APP() {
  const [darkMode] = getTheme();

  const docs = await store.getDocsMap();

  return <Home docs={docs} darkMode={darkMode} />;
}
