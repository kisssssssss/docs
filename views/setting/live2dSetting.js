"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { SwapLeftOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { memo, useCallback, useEffect, useState } from "react";
import {
  Switch,
  Card,
  Divider,
  Space,
  FloatButton,
  ConfigProvider,
  theme,
} from "antd";

import ModelListSkeleton from "@/components/ModelListSkeleton";

import getModelsList from "@/utils/getModelsList";

const { Meta } = Card;

const keyMap = {
  Azur: "碧蓝航线",
  BengHuai2: "崩坏学园2",
  GirlsFrontline: "少女前线",
  Sin: "sin 七大罪～魔王崇拜～",
  VenusScramble: "女神大乱战",
  StarRail: "崩坏: 星穹铁道",
  shuangshengshijie: "双生视界 少女咖啡枪",
};

const changeModel = (modelName) => {
  const targetIndex = window.oml2d.options.models.findIndex(
    (item) => item.name === modelName
  );
  window.oml2d.loadModelByIndex(targetIndex);
};

const getModelsListNode = (list) => {
  if (!list) return null;

  let res = [null];

  let count = 0;
  for (const key in list) {
    const Node = (
      <div key={key} id={key}>
        <p className="text-lg font-bold dark:text-gray-200/85">
          {keyMap[key]}
          <span className="mx-2 text-base text-[#00000073] dark:text-gray-300/30 font-semibold">
            数量：{list[key].length}
          </span>
        </p>
        <Space wrap size="large" id={key} key={`${key}_space`}>
          {list[key].map((item, index) => {
            return (
              <Card
                hoverable
                style={{ width: 160 }}
                key={item.configuration.name}
                cover={
                  <img
                    className="my-0 object-cover w-[160px] h-[160px]"
                    alt=""
                    src={item.cover}
                    loading="lazy"
                  />
                }
                styles={{
                  cover: {
                    width: "160px",
                    height: "160px",
                    overflow: "hidden",
                  },
                  body: { padding: "12px 16px" },
                }}
                onClick={() => changeModel(item.configuration.name)}
              >
                <Meta title={item.title} description={item.description} />
              </Card>
            );
          })}
        </Space>
        <Divider />
      </div>
    );
    res.push(Node);
    count += list[key].length;
  }

  const summaryNode = (
    <div key={"count"}>
      <p className="text-xl font-bold dark:text-gray-200/90">
        当前 Live2D 数量：{count}
      </p>
      <p className="text-base text-[#00000073] dark:text-gray-400/60 font-semibold">
        类型：
        {Object.keys(list).map((key) => (
          <span
            key={`type_${key}`}
            className="mx-2 hover:text-violet-500 dark:hover:text-violet-500/80 hover:underline underline-offset-4 cursor-pointer"
            onClick={() => {
              document.getElementById(key).scrollIntoView();
            }}
          >
            {keyMap[key]}
          </span>
        ))}
      </p>
      <Divider />
    </div>
  );
  res[0] = summaryNode;

  return res;
};

const ModelList = memo(({ enable, darkMode }) => {
  if (!enable) return <></>;

  const [renderer, setRenderer] = useState(
    <ModelListSkeleton darkMode={darkMode} />
  );

  useEffect(() => {
    (async function () {
      let time1 = Date.now();
      let list = await getModelsList();

      if (Date.now() - time1 < 600) {
        setTimeout(() => setRenderer(getModelsListNode(list)), 600);
      } else {
        setRenderer(getModelsListNode(list));
      }
    })();
  }, []);

  return <>{renderer}</>;
});

const Live2dSetting = memo(({darkMode}) => {
  const router = useRouter();

  //	live2d 是否启用
  const live2d_enable = Cookies.get("live2d_enable") == "true";

  // 启用/禁用 Live2d
  const enableLive2d = useCallback((checked) => {
    Cookies.set("live2d_enable", checked, { expires: 365 });
    // 通过 setTimeout 防止 Switch组件动画 卡顿
    setTimeout(() => window.location.reload(), 100);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {/* 回到主页 */}
      <SwapLeftOutlined
        className="hover:text-violet-500 dark:hover:text-violet-500 cursor-pointer text-[25px] dark:text-gray-200/90"
        style={{ fontSize: "20px" }}
        onClick={() => router.push("/")}
      />

      {/* 显示/禁用 Live2D */}
      <div className="flex items-center justify-between">
        <p className="inline-block text-xl font-bold dark:text-gray-200/90">
          显示 Live2D
        </p>
        <Switch defaultChecked={live2d_enable} onChange={enableLive2d} />
      </div>

      {/* 分割线 */}
      <Divider />

      {/* 展示 Live2D 模型列表 */}
      <ModelList enable={live2d_enable} darkMode={darkMode} />

      {/* 回到顶部 */}
      <FloatButton
        type="primary"
        icon={<ArrowUpOutlined />}
        onClick={() => scrollTo(0, 0)}
      />
    </ConfigProvider>
  );
});

export default Live2dSetting;
