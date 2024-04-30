'use client';
import React, { memo, useEffect } from 'react';
import { loadOml2d } from 'oh-my-live2d';
import Cookies from 'js-cookie';

const publicModel = [];

const Live2d = memo(() => {
	useEffect(() => {
		(async function () {
			if (Cookies.get('live2d_enable') == 'true' && !window.live2d_mounted) {
				try {
					// 获取模型信息
					const response = await (await fetch('/ModelList.json')).json();

					// 生成模型数组
					let models = [];
					for (const key in response) {
						const temp = response[key].map(item => {
							// 获取模型文件路径
							let path = 'https://cdn.jsdelivr.net/gh/kisssssssss/docs/public';
							switch (key) {
								case 'Azur':
									path += `/model/${key}/${item.name}/${item.name}.model3.json`;
									break;
								case 'BengHuai2':
									path += `/model/${key}/${item.name}/model.json`;
									break;
								case 'GirlsFrontline':
									path += `/model/${key}/${item.name}/${item.name.split('@')[1]}.model3.json`;
									break;
							}

							return {
								name: item.name,
								position: item.position.map(e => Number(e)),
								scale: Number(item.scale),
								stageStyle: item.stageStyle,
								path
							};
						});
						models.push(...temp);
					}

					// 加载模型并挂载到 window
					window.oml2d = loadOml2d({
						primaryColor: '#8b5cf6',
						models
						// models: publicModel.map(item => {
						// 	return {
						// 		path: `/model/test/${item}/${item.split('@')[1]}.model3.json`,
						// 		name: item,
						// 		position: [10, 50],
						// 		scale: 0.1,
						// 		stageStyle: { height: 400, width: 350 }
						// 	};
						// })
					});
					console.log(oml2d);

					oml2d.onLoad(status => {
						switch (status) {
							case 'success':
								console.log('模型: ' + oml2d.model.name + '加载成功');
								console.log(oml2d.modelIndex);
								// oml2d.showModelHitAreaFrames();
								return;
							case 'fail':
								console.log('模型: ' + oml2d.model.name + '加载失败');
								return;
							case 'loading':
								console.log('模型: ' + oml2d.model.name + '正在加载中');
								return;
						}
					});

					// 存储模型信息
					localStorage.setItem('modelsList', JSON.stringify(response));

					// 设置 live2d 挂载标志
					window.live2d_mounted = true;
				} catch (error) {
					console.error(error);
				}
			}
		})();
	}, []);

	return <></>;
});

export default Live2d;
