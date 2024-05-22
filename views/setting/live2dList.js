"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { SwapLeftOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { memo, useEffect, useState } from "react";
import {
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
  Sin: "sin七大罪～魔王崇拜～",
  VenusScramble: "女神大乱战",
  StarRail: "崩坏:星穷铁道",
  shuangshengshijie: "双生视界少女咖啡枪",
  sansehuilian: "三色绘恋",
  baoshi: "宝石研物语",
  baoshi2: "宝石研物语2",
  hqxy: "魂器学院",
};

const changeModel = (modelName) => {
  const targetIndex = window.oml2d.options.models.findIndex(
    (item) => item.name === modelName,
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
          <span className="mx-2 text-base font-semibold text-[#00000073] dark:text-gray-300/30">
            数量：{list[key].length}
          </span>
        </p>
        <Space wrap size="large" id={key} key={`${key}_space`}>
          {list[key].map((item, index) => {
            return (
              <Card
                hoverable
                style={{ width: 160 }}
                key={item.configuration.name + index}
                cover={
                  <img
                    className="my-0 h-[160px] w-[160px] object-cover"
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
      <div className="text-base font-semibold text-[#00000073] dark:text-gray-400/60">
        类型：
        <ul>
          {Object.keys(list).map((key) => (
            <li
              key={`type_${key}`}
              className="mx-2 my-1 cursor-pointer underline-offset-4 hover:text-violet-500 hover:underline dark:hover:text-violet-500/80"
              onClick={() => {
                document.getElementById(key).scrollIntoView();
              }}
            >
              {keyMap[key]}
            </li>
          ))}
        </ul>
      </div>
      <Divider />
    </div>
  );
  res[0] = summaryNode;

  return res;
};

const ModelList = memo(({ darkMode }) => {
  const [renderer, setRenderer] = useState(
    <ModelListSkeleton darkMode={darkMode} />,
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

const Live2dSetting = memo(({ darkMode }) => {
  const router = useRouter();

  //	live2d 是否启用
  const live2d_enable = Cookies.get("live2d_enable") == "true";

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {/* 回到主页 */}
      <SwapLeftOutlined
        className="cursor-pointer text-[25px] hover:text-violet-500 dark:text-gray-200/90 dark:hover:text-violet-500"
        style={{ fontSize: "20px" }}
        onClick={() => router.push("/setting/base")}
      />
      <Divider />

      {!live2d_enable && (
        <div className="mb-6 rounded-md border-2 border-gray-100 px-6 py-4 text-lg font-bold shadow-md dark:text-gray-200/90">
          <p>当前未开启 Live2D 模型，因此无法预览模型。若需要预览，请先 </p>{" "}
          <span
            className="cursor-pointer select-none text-violet-400/75 hover:text-violet-400/95 "
            onClick={() => router.push("/setting/base")}
          >
            开启 Live2D {"->"}
          </span>
        </div>
      )}

      {/* 展示 Live2D 模型列表 */}
      <ModelList darkMode={darkMode} />

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
