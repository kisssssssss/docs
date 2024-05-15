"use client";
import React, { memo, useEffect } from "react";
import { loadOml2d } from "oh-my-live2d";
import Cookies from "js-cookie";
import getModelsList from "../utils/getModelsList";

const b = [
  {
    name: "abeikelongbi_3",
    scale: 0.06,
    position: [0, 10],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "aidang_2",
    scale: 0.1,
    position: [20, 20],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "beierfasite_2",
    scale: 0.12,
    position: [-70, -90],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "lafei_4",
    scale: 0.045,
    position: [0, 90],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "dafeng_2",
    scale: 0.08,
    position: [-90, -80],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "dafeng_4",
    scale: 0.06,
    position: [-50, -20],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "luyijiushi_2",
    scale: 0.065,
    position: [-40, -125],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "ouruola_4",
    scale: 0.06,
    position: [-20, -5],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "aierdeliqi_4",
    scale: 0.1,
    position: [-70, -10],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "aierdeliqi_5",
    scale: 0.06,
    position: [-50, 30],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "aijier_2",
    scale: 0.06,
    position: [-50, 30],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "adaerbote_2",
    scale: 0.08,
    position: [-130, -140],
    stageStyle: { height: 300, width: 400 },
  },
  {
    name: "aijier_3",
    scale: 0.07,
    position: [-100, -220],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "ailunsamuna_2",
    scale: 0.09,
    position: [-130, -70],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "aimierbeierding_2",

    scale: 0.13,
    position: [10, 40],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "aimudeng_2",
    scale: 0.1,
    position: [-140, -140],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "aisaikesi_4",
    scale: 0.08,
    position: [-150, -140],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "baerdimo_5",
    scale: 0.07,
    position: [-40, -50],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "baerdimo_6",
    scale: 0.07,
    position: [-140, -95],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "banrenma_2",
    scale: 0.1,
    position: [-40, 40],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "beikaluolaina_2",
    scale: 0.065,
    position: [-130, -50],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "bisimai_2",
    scale: 0.075,
    position: [-100, -80],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "bola_2",
    scale: 0.07,
    position: [-150, -85],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "boyixi_2",
    scale: 0.07,
    position: [-110, -85],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "bulaimodun_4",
    scale: 0.07,
    position: [-10, -80],
    stageStyle: { height: 410, width: 400 },
  },
  {
    name: "bulaimodun_5",
    scale: 0.07,
    position: [-70, -20],
    stageStyle: { height: 410, width: 350 },
  },
  {
    name: "buleisite_2",
    scale: 0.07,
    position: [-130, -50],
    stageStyle: { height: 410, width: 400 },
  },
  {
    name: "chaijun_3",
    scale: 0.045,
    position: [-80, 10],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "chicheng_5",
    scale: 0.065,
    position: [-90, -130],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "chuixue_3",
    scale: 0.065,
    position: [-10, 10],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "dafeng_3",
    scale: 0.065,
    position: [-10, 50],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "dafeng_6",
    scale: 0.065,
    position: [-50, 0],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "daofeng_4",
    scale: 0.1,
    position: [-140, -120],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "deyizhi_3",
    scale: 0.15,
    position: [-80, 0],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "dujiaoshou_4",
    scale: 0.085,
    position: [-40, -10],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "dujiaoshou_6",
    scale: 0.08,
    position: [-170, -150],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "dunkeerke_2",
    scale: 0.055,
    position: [-70, -40],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "edu_3",
    scale: 0.065,
    position: [-40, 70],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "edu_4",
    scale: 0.08,
    position: [-230, -65],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "geliqiya_2",
    scale: 0.045,
    position: [-50, -45],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "genaisennao_2",
    scale: 0.08,
    position: [-80, -100],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "guangrong_3",
    scale: 0.06,
    position: [-30, -40],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "guangrong_4",
    scale: 0.06,
    position: [-30, -40],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "hailunna_4",
    scale: 0.09,
    position: [-90, -160],
    stageStyle: { height: 420, width: 350 },
  },
  {
    name: "heitaizi_2",
    scale: 0.08,
    position: [-20, -15],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "hemin_2",
    scale: 0.1,
    position: [-20, -5],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "hemin_3",
    scale: 0.07,
    position: [-100, -67],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "huangjiafangzhou_3",
    scale: 0.16,
    position: [-60, -50],
    stageStyle: { height: 400, width: 350 },
  },
  {
    name: "huonululu_3",
    scale: 0.085,
    position: [-40, -30],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "jialisuoniye_3",
    scale: 0.065,
    position: [-130, 70],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "jialisuoniye_4",
    scale: 0.07,
    position: [-130, 0],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "jianye_2",
    scale: 0.07,
    position: [-100, -80],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "jianye_3",
    scale: 0.07,
    position: [-120, -90],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "jiuyun_2",
    scale: 0.085,
    position: [-60, -110],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "junhe_4",
    scale: 0.065,
    position: [-60, -40],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "kalangshitade_2",
    scale: 0.07,
    position: [-100, -10],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "kalvbudisi_2",
    scale: 0.07,
    position: [-80, -70],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "kelaimengsuo_2",
    scale: 0.07,
    position: [-80, -70],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "kubo_2",
    scale: 0.07,
    position: [-80, -20],
    stageStyle: { height: 400, width: 400 },
  },
  {
    name: "kuersike_2",
    scale: 0.07,
    position: [-80, -190],
    stageStyle: { height: 400, width: 400 },
  },
];

const publicModel = [
  "lafei",
  "lingbo",
  "lingbo_10",
  "linuo_3",
  "lisailiu_2",
  "lisailiu_3",
  "longfeng_2",
  "luoen_4",
  "luoma_2",
  "lupuleixite_2",
  "lvzuofu_2",
  "maliluosi_3_doa",
  "mingshi",
  "nengdai_2",
  "ninghai_4",
  "ougen_5",
  "ougen_6",
  "pinghai_4",
  "pinghai_6",
  "qianwei_2",
  "qibolin_2",
  "qiye_7",
  "qiye_9",
  "rangbaer_3",
  "rangbaer_4",
  "shengluyisi_2",
  "shengluyisi_3",
  "shengluyisi_4",
  "shitelasai_2",
  "sipeibojue_5",
  "taiyuan_2",
  "tiancheng_3",
  "tianlangxing_3",
  "tierbici_2",
  "weineituo_2",
  "weixi_2",
  "weiyan_2",
  "weiyan_6",
  "wuerlixi_2",
  "wuqi_2",
  "xianghe_2",
  "xinnong_3",
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
            // models: publicModel.map((key) => {
            //   return {
            //     path: `/model/test/b/${key}/${key}.model3.json`,
            //     name: "west",
            //     scale: 0.07,
            //     // position: [-80, -190],
            //     // stageStyle: { height: 400, width: 400 },
            //   };
            // }),
          });

          oml2d.onLoad((status) => {
            switch (status) {
              case "success":
                console.log("模型: " + oml2d.model.name + "加载成功");
                oml2d.showModelHitAreaFrames();
                return;
              case "fail":
                // console.log("模型: " + oml2d.model + "加载失败");
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
