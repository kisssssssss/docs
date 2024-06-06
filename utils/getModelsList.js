"use client";
async function fetchModelList(newTime) {
  const result = await (
    await fetch(
      "https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/model/main/live2d.All.json"
    )
  ).json();
  localStorage.setItem("modelsList", JSON.stringify(result));
  return result;
}

export default async function getModelsList() {
  try {
    let res = localStorage.getItem("modelsList");
    if (res) {
      return JSON.parse(res);
    } else {
      return await fetchModelList();
    }
  } catch (error) {
    console.log(error);
  }
}
