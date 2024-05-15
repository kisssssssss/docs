import dynamic from "next/dynamic";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import Sky from "@/views/background/Sky";
import Plum from "@/views/background/Plum";
import WebGL from "@/views/background/WebGL";
const Live2d = dynamic(() => import("../views/Live2d"), {
  ssr: false,
});

import getTheme from "@/utils/getTheme";

import "@/style/globals.css";
import "@/style/normalize.css";

export const metadata = {
  title: "Docs",
  description: "A repository for note",
};

export default function RootLayout({ children }) {
  const [darkMode, theme] = getTheme();

  return (
    <html
      lang="en"
      className={`${darkMode ? "dark" : "light"}`}
      style={{ height: "100%" }}
    >
      <head>
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
      </head>
      <body
        className="h-full w-full"
        style={{ height: "100%", position: "relative", overflow: "hidden" }}
      >
        <AntdRegistry>{children}</AntdRegistry>
        {
          {
            sky: <Sky />,
            plum: <Plum />,
            vortex: <WebGL />,
            null: <></>,
          }[theme]
        }
        <Live2d />
      </body>
    </html>
  );
}
