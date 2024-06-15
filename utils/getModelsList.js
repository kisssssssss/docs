"use client";
const List = "modelsList";
const ListTime = "modelsListTime";
const Translation = "modelsListTranslation";
const TranslationTime = "modelsListTranslationTime";

export async function checkModels() {
  // 请求模型列表
  async function fetchModelList() {
    const result = await (
      await fetch(
        "https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/model/main/live2d.All.json",
      )
    ).json();
    localStorage.setItem(List, JSON.stringify(result));
    localStorage.setItem(ListTime, new Date().getTime());
    return result;
  }
  // 请求模型列表翻译
  async function fetchModelTranslation() {
    const result = await (
      await fetch(
        `https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/model/main/live2dTranslation.json`,
      )
    ).json();
    localStorage.setItem(Translation, JSON.stringify(result));
    localStorage.setItem(TranslationTime, new Date().getTime());
    return result;
  }
  // 检查日期是否超过一天
  function validateTime(time) {
    return new Date().getTime() - time < 1000 * 60 * 60 * 24;
  }

  // 检查模型列表是否过期
  let modelsListTime = localStorage.getItem(ListTime);
  if (
    !modelsListTime ||
    !validateTime(modelsListTime) ||
    !localStorage.getItem(List)
  ) {
    await fetchModelList();
  }

  // 检查模型列表翻译是否过期
  let modelsTranslationTime = localStorage.getItem(TranslationTime);
  if (
    !modelsTranslationTime ||
    !validateTime(modelsTranslationTime) ||
    !localStorage.getItem(Translation)
  ) {
    await fetchModelTranslation();
  }
}

export async function getModelsList() {
  await checkModels();
  return JSON.parse(localStorage.getItem(List));
}

export async function getModelsTranslation() {
  await checkModels();
  return JSON.parse(localStorage.getItem(Translation));
}
