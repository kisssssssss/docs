'use client';
import React, { memo, useEffect } from 'react';
import { loadOml2d } from 'oh-my-live2d';
import Cookies from 'js-cookie';
import getModelsList from '../utils/getModelsList';

// const publicModel = [
// 	'girl01_l2d00.u',
// 	'girl01_l2d01.u',
// 	'girl01_l2d02.u',
// 	'girl01_l2d03.u',
// 	'girl01_l2d04.u',
// 	'girl01_l2d26.u',
// 	'girl01_l2d29.u',
// 	'girl02_l2d00.u',
// 	'girl02_l2d01.u',
// 	'girl02_l2d02.u',
// 	'girl02_l2d03.u',
// 	'girl02_l2d04.u',
// 	'girl02_l2d12.u',
// 	'girl02_l2d17.u',
// 	'girl02_l2d19.u',
// 	'girl02_l2d22.u',
// 	'girl02_l2d27.u',
// 	'girl02_l2d5017.u'
// ];
const Live2d = memo(() => {
	useEffect(() => {
		(async function () {
			if (Cookies.get('live2d_enable') == 'true' && !window.live2d_mounted) {
				try {
					// 获取模型信息
					const list = await getModelsList();

					// 生成模型数组
					let models = [];
					for (const key in list) {
						const temp = list[key].map(item => {
							// 获取模型文件路径
							let path = 'https://cdn.jsdelivr.net/gh/kisssssssss/model/live2d';
							switch (key) {
								case 'Azur':
								case 'Sin':
									path += `/${key}/${item.name}/${item.name}.model3.json`;
									break;
								case 'BengHuai2':
								case 'VenusScramble':
									path += `/${key}/${item.name}/model.json`;
									break;
								case 'GirlsFrontline':
									path += `/${key}/${item.name}/${item.name.split('@')[1]}.model3.json`;
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

					// 设置 live2d 挂载标志
					window.live2d_mounted = true;
					// 加载模型并挂载到 window
					window.oml2d = loadOml2d({
						primaryColor: '#8b5cf6',
						tips: {
							welcomeTips: {
								duration: 0
							}
						},
						models
						// models: publicModel.map(item => {
						// 	return {
						// 		path: `/model/test/少女咖啡枪 girls cafe gun/${item}/${item.split('_')[1]}.model3.json`,
						// 		name: item,
						// 		// position: [10, 30],
						// 		scale: 0.2
						// 		// stageStyle: { height: 400, width: 400 }
						// 	};
						// })
					});

					oml2d.onLoad(status => {
						switch (status) {
							case 'success':
								console.log('模型: ' + oml2d.model.name + '加载成功');
								// oml2d.showModelHitAreaFrames();
								return;
							case 'fail':
								// console.log('模型: ' + oml2d.model.name + '加载失败');
								return;
							case 'loading':
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
