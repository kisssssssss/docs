import dynamic from "next/dynamic";

import getDocsMap from "@/utils/getDocsMap";
import getTheme from "@/utils/getTheme";

import "@/style/fullpage.css";

const Home = dynamic(() => import("../views/home/index"), {
  ssr: false,
});

export default async function APP() {
  const [darkMode] = getTheme();

  const docs = await getDocsMap();

  return <Home docs={docs} darkMode={darkMode} />;
}
