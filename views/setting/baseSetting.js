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

const baseSetting = memo(({ darkMode }) => {
  const router = useRouter();

  const isCatalogClose = !(Cookies.get("isCatalogClose") === "false");

  return (
    <div className="prose mx-auto px-6 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-[896px] xl:max-w-screen-[1120px] py-20">
      <SwapLeftOutlined
        className="-ml-8 hover:text-violet-500 dark:text-gray-200/90 cursor-pointer text-[25px]"
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
          <p className="block text-xl font-bold dark:text-gray-200/90">Theme</p>
          <Space>
            <Card
              cover={
                <img
                  alt="example"
                  src="/img/sky.png"
                  className="my-[2px] mx-auto max-w-[98%]"
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
                changeTheme("sky");
              }}
            >
              <p className="my-0 text-lg font-medium">sky</p>
            </Card>
            <Card
              cover={
                <img
                  alt="example"
                  src="/img/plum.png"
                  className="my-[2px] mx-auto max-w-[98%]"
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
                changeTheme("plum");
              }}
            >
              <p className="my-0 text-lg font-medium">plum</p>
            </Card>
            <Card
              cover={
                <img
                  alt="example"
                  src="/img/vortex.png"
                  className="my-[2px] mx-auto max-w-[98%]"
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
                changeTheme("vortex");
              }}
            >
              <p className="my-0 text-lg font-medium">vortex</p>
            </Card>
            <Card
              cover={
                <img
                  alt="example"
                  src="/img/null.png"
                  className="my-[2px] mx-auto max-w-[98%]"
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
                changeTheme("null");
              }}
            >
              <p className="my-0 text-lg font-medium">null</p>
            </Card>
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
