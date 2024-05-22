import dynamic from "next/dynamic";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import Background from "@/views/background";
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
    <html lang="en" className={`${darkMode ? "dark" : "light"} h-full`}>
      <head>
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
      </head>
      <body className="relative h-full w-full">
        <AntdRegistry>{children}</AntdRegistry>
        <Background theme={theme} />
        <Live2d />
      </body>
    </html>
  );
}
