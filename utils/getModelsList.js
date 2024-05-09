"use client";
async function fetchModelList(newTime) {
  const result = await (
    await fetch(
      "https://cdn.jsdelivr.net/gh/kisssssssss/model/ModelList_Live2d.json"
    )
  ).json();
  localStorage.setItem("modelsList", JSON.stringify(result));
  return result;
}

export default async function getModelsList() {
  try {
    let res = localStorage.getItem("modelsList");
    if (res) {
      return res;
    } else {
      return await fetchModelList();
    }
  } catch (error) {
    console.log(error);
  }
}
