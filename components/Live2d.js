'use client';
import React, { memo, useEffect } from 'react';
import { loadOml2d } from 'oh-my-live2d';
import Cookies from 'js-cookie';

const publicModel = [];

const Live2d = memo(() => {
	useEffect(() => {
		(async function () {
			if (Cookies.get('live2d_open') == 'true') {
				try {
					// 获取并存储 模型信息
					const response = await (await fetch('/ModelList.json')).json();
					localStorage.setItem('modelsList', JSON.stringify(response));

					// 生成模型数组
					let models = [];
					for (const key in response) {
						const temp = response[key].map(item => ({
							name: item.name,
							position: item.position.map(e => Number(e)),
							scale: Number(item.scale),
							stageStyle: item.stageStyle,
							path: `/model/${key}/${item.name}/${item.name}.model3.json`
						}));
						models.push(...temp);
					}

					// 加载模型
					const oml2d = loadOml2d({
						primaryColor: '#8b5cf6',
						models
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
				} catch (error) {}
			}
		})();
	}, []);

	return <></>;
});

export default Live2d;
