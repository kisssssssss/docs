'use client';
async function fetchModelList() {
	const result = await (await fetch('/ModelList.json')).json();
	localStorage.setItem('modelsList', JSON.stringify(result));
	return result;
}

export default async function getModelsList() {
	let newTime, res;
	try {
		res = localStorage.getItem('modelsList');
		newTime = await (await fetch('/ModelListUpdateTime.json')).json();

		if (res) {
			res = JSON.parse(res);
			if (Object.hasOwnProperty.call(res, 'UpdateTime') && res.UpdateTime < newTime) {
				return fetchModelList();
			} else {
				return res;
			}
		} else {
			return fetchModelList();
		}
	} catch (error) {
		console.log(error);
	}
}
