'use client';
import React, { memo, useEffect } from 'react';
import { loadOml2d } from 'oh-my-live2d';
import Cookies from 'js-cookie';

const publicModel = [];

const Live2d = memo(() => {
	useEffect(() => {
		(async function () {
			if (Cookies.get('live2d_open') == 'true') {
				// 获取模型列表
				const modelsList = await (await fetch('/ModelList.json')).json();

				// 存储模型列表以便在设置页面中展示
				localStorage.setItem('modelsList', JSON.stringify(modelsList));

				// 加载模型
				const oml2d = loadOml2d({
					primaryColor: '#8b5cf6',
					models: modelsList.map(item => {
						return {
							name: item.name,
							position: item.position.map(e => Number(e)),
							scale: Number(item.scale),
							stageStyle: item.stageStyle,
							path: `/model/${item.name}/${item.name}.model3.json`
						};
					})

					// 模型筛选
					// models: [
					// 	...publicModel.map(item => {
					// 		return {
					// 			path: `/model/${item}/${item}.model3.json`,
					// 			name: item,
					// 			position: [-100, -150],
					// 			scale: 0.07,
					// 			stageStyle: { height: 450, width: 300 }
					// 		};
					// 	})
					// ]
				});

				// oml2d.onLoad(status => {
				// 	switch (status) {
				// 		case 'success':
				// 			console.log('模型: ' + oml2d.model.name + '加载成功');
				// 			console.log(oml2d.modelIndex);
				// 			oml2d.showModelHitAreaFrames();
				// 			return;
				// 		case 'fail':
				// 			console.log('模型: ' + oml2d.model.name + '加载失败');
				// 			oml2d.loadNextModel();
				// 			return;
				// 		case 'loading':
				// 			console.log('模型: ' + oml2d.model.name + '正在加载中');
				// 			return;
				// 	}
				// });
			}
		})();
	}, []);

	return <></>;
});

export default Live2d;
