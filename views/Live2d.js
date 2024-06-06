"use client";
import React, { memo, useEffect } from "react";
import { loadOml2d } from "oh-my-live2d";
import Cookies from "js-cookie";
import getModelsList from "../utils/getModelsList";

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
            menus: (model, currentIndex) => {
              return {
                items: (defaultItem) => {
                  if (Array.isArray(model.path)) {
                    return defaultItem;
                  } else {
                    return defaultItem.filter(
                      (item) => item.id != "SwitchModelClothes",
                    );
                  }
                },
              };
            },
            models: Object.keys(models)
              .map((key) => {
                return models[key].map((item) => item.configuration);
              })
              .flat(1),
            // models: ["知更鸟"].map((item) => {
            //   return {
            //     path: `/model/model/live2d/StarRail/${item}/${item}.model3.json`,
            //     name: item,
            //     scale: 0.045,
            //     position: [0, -10],
            //     stageStyle: { height: 400, width: 350 },
            //   };
            // }),
          });

          oml2d.onLoad((status) => {
            switch (status) {
              case "success":
                console.log("模型: " + oml2d.model.name + "加载成功");
                // oml2d.showModelHitAreaFrames();
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
