"use client";
import React, { memo, useEffect } from "react";
import { loadOml2d } from "oh-my-live2d";
import Cookies from "js-cookie";
import getModelsList from "../utils/getModelsList";

const a = [
  {
    name: "0113upd__l2d_356.u",
    position: [0, 80],
    scale: 0.2,
    stageStyle: { height: 400, width: 300 },
    title: "丽达",
    description: "清理者",
  },
  {
    name: "0113upd__l2d_357.u",
    position: [-20, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 300 },
    title: "沐恩",
    description: "清理者",
  },
  {
    name: "0113upd__l2d_359.u",
    position: [-20, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 300 },
    title: "千姬",
    description: "清理者",
  },
  {
    name: "0202upd__l2d_349.u",
    position: [-20, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 300 },
    title: "时无瑕",
    description: "小礼服",
  },
  {
    name: "0202upd__l2d_351.u",
    position: [60, 10],
    scale: 0.08,
    stageStyle: { height: 400, width: 350 },
    title: "洛可可",
    description: "小礼服·金",
  },
  {
    name: "0202upd__l2d_355.u",
    position: [60, 30],
    scale: 0.09,
    stageStyle: { height: 400, width: 350 },
    title: "时无瑕",
    description: "小礼服·金",
  },
  {
    name: "0202upd__l2d_379.u",
    position: [-90, 40],
    scale: 0.15,
    stageStyle: { height: 400, width: 350 },
    title: "千姬",
    description: "氤氲",
  },
  {
    name: "0202upd__l2d_385.u",
    position: [-40, 60],
    scale: 0.12,
    stageStyle: { height: 400, width: 400 },
    title: "阿尼娅",
    description: "砌玉",
  },
  {
    name: "0629upd__l2d_362.u",
    position: [-10, 95],
    scale: 0.12,
    stageStyle: { height: 400, width: 400 },
    title: "丽达",
    description: "闲趣",
  },
  {
    name: "0629upd__l2d_363.u",
    position: [-40, 60],
    scale: 0.15,
    stageStyle: { height: 400, width: 400 },
    title: "聂诗柔",
    description: "爱好",
  },
  {
    name: "0828upd__l2d_379.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "洛可可",
    description: "浴衣",
  },
  {
    name: "0828upd__l2d_380.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "艾琳",
    description: "浴衣",
  },
  {
    name: "0828upd__l2d_381.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "时无忧",
    description: "浴衣",
  },
  {
    name: "0828upd__l2d_382.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "伊珂丝",
    description: "浴衣",
  },
  {
    name: "0828upd__l2d_391.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "千姬",
    description: "公式服",
  },
  {
    name: "0911upd__l2d_343.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "沐恩",
    description: "小礼服",
  },
  {
    name: "0911upd__l2d_344.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "艾琳",
    description: "小礼服",
  },
  {
    name: "0911upd__l2d_347.u",
    position: [40, 60],
    scale: 0.09,
    stageStyle: { height: 400, width: 350 },
    title: "沐恩",
    description: "小礼服·金",
  },
  {
    name: "0911upd__l2d_348.u",
    position: [50, 70],
    scale: 0.08,
    stageStyle: { height: 400, width: 350 },
    title: "艾琳",
    description: "小礼服·金",
  },
  {
    name: "0925upd__l2d_365.u",
    position: [0, 100],
    scale: 0.1,
    stageStyle: { height: 400, width: 400 },
    title: "高奈利亚",
    description: "赏月",
  },
  {
    name: "0925upd__l2d_367.u",
    position: [-10, 100],
    scale: 0.1,
    stageStyle: { height: 400, width: 400 },
    title: "格兰妮",
    description: "观杏",
  },
  {
    name: "10qpt01__l2d_355.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "朱诺",
    description: "童话",
  },
  {
    name: "10qpt01__l2d_356.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "格兰妮",
    description: "童话",
  },
  {
    name: "10qpt01__l2d_357.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "伊珂丝",
    description: "童话",
  },
  {
    name: "1119upd__l2d_368.u",
    position: [0, 130],
    scale: 0.11,
    stageStyle: { height: 400, width: 350 },
    title: "洛可可",
    description: "捕心",
  },
  {
    name: "1119upd__l2d_370.u",
    position: [0, 130],
    scale: 0.085,
    stageStyle: { height: 400, width: 400 },
    title: "朱诺",
    description: "共枕",
  },
  {
    name: "12qpt03__l2d_376.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "艾琳",
    description: "污染者",
  },
  {
    name: "12qpt04__l2d_377.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "格兰妮",
    description: "污染者",
  },
  {
    name: "26__l2d_115.u",
    position: [20, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "朱诺",
    description: "睡衣",
  },
  {
    name: "27__l2d_116.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "沐恩",
    description: "睡衣",
  },
  {
    name: "28__l2d_117.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "苏小真",
    description: "睡衣",
  },
  {
    name: "33__l2d_136.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "高奈利亚",
    description: "西洋棋",
  },
  {
    name: "34__l2d_137.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "时无忧",
    description: "西洋棋",
  },
  {
    name: "35__l2d_138.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "格兰妮",
    description: "西洋棋",
  },
  {
    name: "36__l2d_139.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "伊珂丝",
    description: "西洋棋",
  },
  {
    name: "3__l2d_31.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "朱诺",
    description: "水着",
  },
  {
    name: "47__l2d_200.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "时无瑕",
    description: "水着",
  },
  {
    name: "47__l2d_201.u",
    position: [0, 100],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "丽达",
    description: "水着",
  },
  {
    name: "47__l2d_202.u",
    position: [0, 70],
    scale: 0.22,
    stageStyle: { height: 400, width: 350 },
    title: "洛可可",
    description: "水着",
  },
  {
    name: "47__l2d_203.u",
    position: [0, 70],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "艾琳",
    description: "水着",
  },
  {
    name: "4__l2d_32.u",
    position: [0, 70],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "沐恩",
    description: "水着",
  },
  {
    name: "5__l2d_33.u",
    position: [0, 70],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "苏小真",
    description: "水着",
  },
  {
    name: "6__l2d_34.u",
    position: [0, 70],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "伊珂丝",
    description: "水着",
  },
  {
    name: "724upd__l2d_383.u",
    position: [0, 70],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "洛可可",
    description: "群青之翼",
  },
  {
    name: "724upd__l2d_384.u",
    position: [0, 70],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "沐恩",
    description: "群青之翼",
  },
  {
    name: "724upd__l2d_385.u",
    position: [0, 70],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "时无瑕",
    description: "群青之翼",
  },
  {
    name: "724upd__l2d_386.u",
    position: [0, 70],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "时无忧",
    description: "群青之翼",
  },
  {
    name: "724upd__l2d_388.u",
    position: [0, 70],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "苏小真",
    description: "少女星辰",
  },
  {
    name: "724upd__l2d_389.u",
    position: [0, 70],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "伊珂丝",
    description: "少女星辰",
  },
  {
    name: "724upd__l2d_390.u",
    position: [0, 70],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "阿尼娅",
    description: "少女星辰",
  },
  {
    name: "728upd__l2d_392.u",
    position: [0, 100],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "丽达",
    description: "公式服",
  },
  {
    name: "8qpt01__l2d_322.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "艾琳",
    description: "事务官",
  },
  {
    name: "8qpt01__l2d_323.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "洛可可",
    description: "事务官",
  },
  {
    name: "8qpt01__l2d_324.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "时无瑕",
    description: "事务官",
  },
  {
    name: "8qpt01__l2d_325.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "丽达",
    description: "事务官",
  },
  {
    name: "9qpt01__l2d_327.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "格兰妮",
    description: "水着",
  },
  {
    name: "9qpt01__l2d_328.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "聂诗柔",
    description: "水着",
  },
  {
    name: "l2d1__l2d_75.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "洛可可",
    description: "战术装备",
  },
  {
    name: "l2d2__l2d_77.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "格兰妮",
    description: "战术装备",
  },
  {
    name: "l2d3__l2d_78.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "时无忧",
    description: "战术装备",
  },
  {
    name: "l2d4__l2d_182.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "千姬",
    description: "水着",
  },
  {
    name: "l2d5__l2d_139.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "时无忧",
    description: "水着",
  },
  {
    name: "l2d5__l2d_94.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "时无忧",
    description: "水着?",
  },
  {
    name: "l2d6__l2d_184.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "时无瑕",
    description: "污染者",
  },
  {
    name: "l2d7__l2d_76.u",
    position: [0, 60],
    scale: 0.2,
    stageStyle: { height: 400, width: 350 },
    title: "高奈利亚",
    description: "战术装备",
  },
];
const publicModel = [
  // "newg01__l2d_364.u",
  // "newg02__l2d_297.u",
  // "newg03__l2d_298.u",
  // "newg04__l2d_299.u",
  // "swg01__l2d_291.u",
  // "swg02__l2d_292.u",
  // "swg03__l2d_293.u",
  // "swg04__l2d_294.u",
  // "sy3q__l2d_342.u",
  // "tw75__l2d_232.u",
  // "tw75__l2d_233.u",
  // "tw75__l2d_234.u",
  // "xnl2d1__l2d_222.u",
  // "xnl2d2__l2d_223.u",
  // "xnl2d3__l2d_224.u",
  // "xnl2d4__l2d_225.u",
  // "ybxd0414__l2d_336.u",
  // "ybxd0414__l2d_337.u",
  // "ybxd0414__l2d_338.u",
  // "ybxd0414__l2d_339.u",
  // "zst0518__l2d_360.u",
  // "zst0518__l2d_361.u",
];
const Live2d = memo(() => {
  useEffect(() => {
    (async function () {
      if (Cookies.get("live2d_enable") == "true" && !window.live2d_mounted) {
        try {
          // 获取模型信息
          let models = await getModelsList();

          // 设置 live2d 挂载标志
          window.live2d_mounted = true;
          // 加载模型并挂载到 window
          window.oml2d = loadOml2d({
            primaryColor: "#8b5cf6",
            tips: {
              welcomeTips: {
                duration: 0,
              },
            },
            models: Object.keys(models)
              .map((key) => {
                return models[key].map((item) => item.configuration);
              })
              .flat(1),
          });

          oml2d.onLoad((status) => {
            console.log(status);
            switch (status) {
              case "success":
                console.log("模型: " + oml2d.model.name + "加载成功");
                oml2d.showModelHitAreaFrames();
                return;
              case "fail":
                console.log("模型: " + oml2d.model + "加载失败");
                return;
              case "loading":
                // console.log('模型: ' + oml2d.model.name + '正在加载中');
                return;
            }
          });
        } catch (error) {
          window.live2d_mounted = false;
          console.error(error);
        }
      }
    })();
  }, []);

  return <></>;
});

export default Live2d;
