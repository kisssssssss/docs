"use client";
import { useRouter } from "next/navigation";
import { memo, useState, useCallback } from "react";
import { FloatButton, Divider, ConfigProvider, theme } from "antd";
import {
  HomeOutlined,
  ProfileOutlined,
  ArrowUpOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";

const Toc = dynamic(() => import("./Toc"), { ssr: false });

const Article = memo(({ content, darkMode, title, nearPage }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  useCallback(() => {
    console.log(123)
  },[])

  const button = [
    {
      icon: <ArrowUpOutlined />,
      onClick: () => scrollTo(0, 0),
    },
    {
      icon: <ProfileOutlined />,
      onClick: () => setOpen(true),
    },
    {
      icon: <HomeOutlined />,
      onClick: () => {
        router.push("/#docs");
        sessionStorage.setItem("hashPath", "#docs");
      },
    },
    {
      icon: <SettingOutlined />,
      onClick: () => {
        router.push("/setting/base");
      },
    },
  ];

  const pre = useCallback(() => {
    if (nearPage.pre?.path) {
      router.push(`/docs/${nearPage.pre.path}`);
    }
  }, [nearPage]);

  const next = useCallback(() => {
    if (nearPage.next?.path) {
      router.push(`/docs/${nearPage.next.path}`);
    }
  }, [nearPage]);

  return (
    <>
      <div className="lg:max-w-screen-[896px] xl:max-w-screen-[1120px] prose mx-auto px-6 py-20 dark:prose-invert prose-a:underline-offset-[6px] prose-blockquote:border-[#c4b5fd] prose-code:font-[CaskaydiaCoveNerdFontMono] prose-code:font-medium prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:font-[CaskaydiaCoveNerdFontMono] dark:prose-code:bg-zinc-800 dark:prose-pre:bg-zinc-600 sm:max-w-screen-sm md:max-w-screen-md ">
        <article
          dangerouslySetInnerHTML={{
            __html: `<h1 class="page-title">${title}</h1>` + content,
          }}
        ></article>

        <ConfigProvider
          theme={{
            algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}
        >
          <Divider />
        </ConfigProvider>

        <div className="flex w-full items-center justify-between">
          <div className="ml-4 w-[35%] border-l-[3px] border-violet-500 py-3 pl-6">
            <span
              className="block w-fit cursor-pointer text-2xl hover:text-violet-500"
              onClick={pre}
            >
              pre
            </span>
            <span>{nearPage.pre?.title || "没有上一章了"}</span>
          </div>
          <div className="mr-4 w-[35%] border-r-[3px] border-violet-500 py-3 pr-6">
            <div className="flex flex-row-reverse">
              <span
                className="block w-fit cursor-pointer text-2xl hover:text-violet-500"
                onClick={next}
              >
                next
              </span>
            </div>
            <div className="flex flex-row-reverse">
              <span className="block w-fit">
                {nearPage.next?.title || "没有下一章了"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Toc open={open} setOpen={setOpen} darkMode={darkMode} />

      <FloatButton.Group shape="circle" style={{ right: 24 }}>
        {button.map((item, index) => (
          <FloatButton
            key={index}
            type="primary"
            icon={item.icon}
            onClick={() => item.onClick()}
          />
        ))}
      </FloatButton.Group>
    </>
  );
});

export default Article;
