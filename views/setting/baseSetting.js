"use client";
import Cookies from "js-cookie";
import React, { memo } from "react";
import { useRouter } from "next/navigation";
import { SwapLeftOutlined } from "@ant-design/icons";
import { Switch, Tag, ConfigProvider, theme, Card, Divider, Space } from "antd";

const changeTheme = (checked) => {
  Cookies.set("theme", String(checked), { expires: 365 });
  window.location.reload();
};

const changeIsCatalogClose = (checked) => {
  Cookies.set("isCatalogClose", String(checked), { expires: 365 });
};

const enableLive2d = (checked) => {
  Cookies.set("live2d_enable", checked, { expires: 365 });
  // 通过 setTimeout 防止 Switch组件动画 卡顿
  setTimeout(() => window.location.reload(), 100);
};

const baseSetting = memo(({ darkMode }) => {
  const router = useRouter();

  const isCatalogClose = !(Cookies.get("isCatalogClose") === "false");

  const live2d_enable = Cookies.get("live2d_enable") == "true";

  return (
    <div className="lg:max-w-screen-[896px] xl:max-w-screen-[1120px] prose mx-auto px-6 py-20 sm:max-w-screen-sm md:max-w-screen-md">
      <SwapLeftOutlined
        className="cursor-pointer text-[25px] hover:text-violet-500 dark:text-gray-200/90"
        onClick={() => {
          router.push("/");
        }}
      />
      <ConfigProvider
        theme={{
          algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <div>
          <p className="block text-xl font-bold dark:text-gray-200/90">
            Background
          </p>
          <Space wrap>
            {[
              "null",
              "plum",
              "vortex",
              "whiteGrid",
              "sky",
              "blackGrid",
              "blackGridLarge",
              "wave",
            ].map((item) => {
              return (
                <Card
                  key={item}
                  cover={
                    <img
                      alt="example"
                      src={`/img/${item}.png`}
                      className="mx-auto my-[2px] max-w-[98%]"
                    />
                  }
                  styles={{
                    cover: {
                      width: "160px",
                      height: "79.75px",
                      overflow: "hidden",
                      cursor: "pointer",
                    },
                    body: { padding: "12px 16px", cursor: "pointer" },
                  }}
                  classNames={{
                    body: "hover:text-violet-500 dark:hover:text-violet-500/80",
                  }}
                  onClick={() => {
                    changeTheme(item);
                  }}
                >
                  <p className="my-0 text-lg font-medium">{item}</p>
                </Card>
              );
            })}
          </Space>
        </div>
        <Divider />
        <div className="flex items-center justify-between">
          <p className="inline-block text-xl font-bold dark:text-gray-200/90">
            点击文章目录后关闭目录
          </p>
          <Switch
            defaultChecked={isCatalogClose}
            onChange={changeIsCatalogClose}
          />
        </div>
        <Divider />
        <div className="flex items-center justify-between">
          <div>
            <p className="inline-block text-xl font-bold dark:text-gray-200/90">
              Live2D
              <Tag
                color="processing"
                style={{ marginLeft: "15px", borderRadius: "50px" }}
              >
                Beta
              </Tag>
            </p>
            <p
              className="my-0 cursor-pointer select-none text-gray-700/70 hover:text-violet-400 dark:text-gray-300/70 dark:hover:text-violet-400/90"
              onClick={() => {
                router.push("/setting/live2d");
              }}
            >
              查看所有 Live2D 模型
            </p>
          </div>
          <Switch defaultChecked={live2d_enable} onChange={enableLive2d} />
        </div>
        <Divider />
        <div className="flex items-center justify-between">
          <p className="inline-block text-xl font-bold dark:text-gray-200/90">
            Spine
            <Tag
              color="processing"
              style={{ marginLeft: "15px", borderRadius: "50px" }}
            >
              Alpha
            </Tag>
          </p>
          <Switch
            defaultChecked={false}
            onChange={() => router.push("/spine")}
          />
        </div>
      </ConfigProvider>
    </div>
  );
});

export default baseSetting;
