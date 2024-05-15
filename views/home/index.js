"use client";
import React, { memo, useEffect } from "react";
import fullpage from "fullpage.js";
import { Divider, ConfigProvider, theme } from "antd";

import HomeLinks from "./HomeLinks";
import HomeDocs from "./HomeDocs";

const projects = [
  {
    url: "https://github.com/kisssssssss/Song-App",
    repo: "Song-App",
  },
  {
    url: "https://github.com/kisssssssss/Songs",
    repo: "Songs",
  },
  {
    url: "https://github.com/kisssssssss/docs",
    repo: "docs",
  },
  {
    url: "https://github.com/oh-my-live2d/oh-my-live2d",
    username: "oh-my-live2d",
    repo: "oh-my-live2d",
  },
];

const home = memo(({ darkMode, docs }) => {
  useEffect(() => {
    // 初始化
    const fullpageInstance = new fullpage("#fullpage", {
      navigation: true,
      anchors: ["info", "docs", "project"],
      paddingTop: "40px",
      paddingBottom: "40px",
    });
    window.fullpageInstance = fullpageInstance;
    // 如果是从文章页返回的话，跳转到文档页
    const hashPath = sessionStorage.getItem("hashPath");
    if (hashPath) {
      fullpageInstance.silentMoveTo(2);
      sessionStorage.setItem("hashPath", "");
    }
    return () => {
      fullpageInstance.destroy("all");
    };
  }, []);

  const width =
    "sm:max-w-[512px] md:max-w-[614px] lg:max-w-[820px] xl:max-w-[1024px] mx-auto";

  return (
    <main
      id="fullpage"
      className="fullpage-wrapper h-full relative touch-none"
      style={{ transform: "translate3d(0px, 0px, 0px)" }}
    >
      <div
        className={`section w-full flex justify-center items-center h-full ${width}`}
      >
        <img
          className="mx-auto w-16 h-16 min-w-16 min-h-16 xl:w-24 xl:min-w-24 xl:h-24 xl:min-h-24 2xl:w-32 2xl:min-w-32 2xl:h-32 2xl:min-h-32 rounded-full shadow-lg"
          src="/img/icon.png"
          alt=""
        />
        <HomeLinks darkMode={darkMode} />
      </div>
      <div className="section">
        <div className={`${width} px-5 my-4`}>
          <p className="dark:text-gray-200/90 text-2xl mb-4">DOCS:</p>
          <HomeDocs docs={docs} darkMode={darkMode} />
        </div>
      </div>
      <div className="section">
        <div className={`${width} px-5`}>
          <img
            className="w-[320px] mx-auto md:mx-0"
            src={`https://github-readme-stats.vercel.app/api?username=kisssssssss&show_icons=true${
              darkMode ? "&theme=dark" : ""
            }&hide=contribs`}
          />
          <ConfigProvider
            theme={{
              algorithm: darkMode
                ? theme.darkAlgorithm
                : theme.defaultAlgorithm,
            }}
          >
            <Divider />
          </ConfigProvider>
          <div className="flex flex-wrap gap-3">
            {projects.map((item) => {
              const { url, username, repo } = item;
              return (
                <a
                  href={url}
                  key={url}
                  target="_blank"
                  className="mx-auto md:mx-0"
                >
                  <img
                    className="w-[320px] h-[120px]"
                    src={`https://github-readme-stats.vercel.app/api/pin/?username=${
                      username ? username : "kisssssssss"
                    }&repo=${repo}${darkMode ? "&theme=dark" : ""}`}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
});

export default home;
