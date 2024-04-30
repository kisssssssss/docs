'use client';
async function fetchModelList(newTime) {
	const result = await (await fetch('/ModelList.json')).json();
	localStorage.setItem('modelsList', JSON.stringify(result));
	localStorage.setItem('modelsList_updateTime', newTime);
	return result;
}

export default async function getModelsList() {
	try {
		let localTime = parseInt(localStorage.getItem('modelsList_updateTime'));

		let newTime = (await (await fetch('/ModelListUpdateTime.json')).json()).UpdateTime;

		console.log('最新模型列表发布时间: ', new Date(parseInt(newTime)).toLocaleString().replace(/:\d{1,2}$/, ' '));

		if (!localTime || localTime < newTime) {
			return await fetchModelList(newTime);
		} else {
			return JSON.parse(localStorage.getItem('modelsList') || '{}');
		}
	} catch (error) {
		console.log(error);
	}
}
