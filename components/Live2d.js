'use client';
import React, { memo, useEffect } from 'react';
import { loadOml2d } from 'oh-my-live2d';
import Cookies from 'js-cookie';

const publicModel = [];

const a = [
	{
		name: 'abeikelongbi_3',
		position: [0, 50],
		scale: 0.05,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'aidang_2',
		position: [0, 35],
		scale: 0.1,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'aijier_2',
		position: [-50, 35],
		scale: 0.05,
		stageStyle: { height: 300, width: 300 }
	},
	{
		name: 'aijier_3',
		position: [-70, 35],
		scale: 0.05,
		stageStyle: { height: 470, width: 280 }
	},
	{
		name: 'aimierbeierding_3',
		position: [-180, 35],
		scale: 0.1,
		stageStyle: { height: 400, width: 250 }
	},
	{
		name: 'ankeleiqi_2',
		position: [-200, -50],
		scale: 0.08,
		stageStyle: { height: 300, width: 350 }
	},
	{
		name: 'baerdimo_6',
		position: [-250, -140],
		scale: 0.09,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'beierfasite_2',
		position: [-120, -70],
		scale: 0.13,
		stageStyle: { height: 450, width: 250 }
	},
	{
		name: 'beikaluolaina_2',
		position: [-190, -180],
		scale: 0.09,
		stageStyle: { height: 350, width: 400 }
	},
	{
		name: 'bisimai_2',
		position: [-200, -180],
		scale: 0.09,
		stageStyle: { height: 350, width: 350 }
	},
	{
		name: 'boyixi_2',
		position: [-200, -180],
		scale: 0.09,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'chaijun_3',
		position: [-200, -80],
		scale: 0.06,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'dafeng_2',
		position: [-150, -60],
		scale: 0.09,
		stageStyle: { height: 450, width: 330 }
	},
	{
		name: 'dafeng_3',
		position: [-35, -80],
		scale: 0.08,
		stageStyle: { height: 300, width: 350 }
	},
	{
		name: 'dafeng_4',
		position: [-160, -30],
		scale: 0.09,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'dafeng_6',
		position: [-80, -80],
		scale: 0.06,
		stageStyle: { height: 300, width: 350 }
	},
	{
		name: 'dunkeerke_2',
		position: [-130, -70],
		scale: 0.07,
		stageStyle: { height: 450, width: 300 }
	},
	{
		name: 'edu_4',
		position: [-340, -120],
		scale: 0.1,
		stageStyle: { height: 450, width: 300 }
	},
	{
		name: 'geliqiya_2',
		position: [-170, -130],
		scale: 0.06,
		stageStyle: { height: 450, width: 300 }
	},
	{
		name: 'guangrong_3',
		position: [-80, -60],
		scale: 0.06,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'hailunna_4',
		position: [-100, -120],
		scale: 0.08,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'hemin_2',
		position: [-100, -120],
		scale: 0.13,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'hemin_3',
		position: [-170, -120],
		scale: 0.09,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'jianye_2',
		position: [-120, -180],
		scale: 0.07,
		stageStyle: { height: 300, width: 350 }
	},
	{
		name: 'jianye_3',
		position: [-140, -160],
		scale: 0.07,
		stageStyle: { height: 300, width: 350 }
	},
	{
		name: 'kalangshitade_2',
		position: [-250, -40],
		scale: 0.1,
		stageStyle: { height: 500, width: 300 }
	},
	{
		name: 'kalvbudisi_2',
		position: [-200, -170],
		scale: 0.1,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'kuersike_2',
		position: [-120, -180],
		scale: 0.07,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'lafei_4',
		position: [-120, -0],
		scale: 0.07,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'luyijiushi_2',
		position: [-50, -50],
		scale: 0.06,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'ougen_5',
		position: [-250, -350],
		scale: 0.1,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'ougen_6',
		position: [-220, -250],
		scale: 0.09,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'ouruola_4',
		position: [-100, -20],
		scale: 0.09,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'qiye_7',
		position: [-200, -90],
		scale: 0.07,
		stageStyle: { height: 450, width: 300 }
	},
	{
		name: 'qiye_9',
		position: [-150, -120],
		scale: 0.07,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'shengluyisi_2',
		position: [-80, 0],
		scale: 0.17,
		stageStyle: { height: 420, width: 300 }
	},
	{
		name: 'shengluyisi_4',
		position: [-30, -100],
		scale: 0.1,
		stageStyle: { height: 450, width: 300 }
	},
	{
		name: 'tiancheng_3',
		position: [-180, -120],
		scale: 0.1,
		stageStyle: { height: 300, width: 400 }
	},
	{
		name: 'tianlangxing_3',
		position: [-140, -30],
		scale: 0.09,
		stageStyle: { height: 450, width: 300 }
	},
	{
		name: 'wuqi_2',
		position: [-150, -25],
		scale: 0.07,
		stageStyle: { height: 450, width: 300 }
	},
	{
		name: 'xinnong_3',
		position: [-170, -150],
		scale: 0.1,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'xinzexi_3',
		position: [-150, -170],
		scale: 0.08,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'xukufu_3',
		position: [-80, -70],
		scale: 0.07,
		stageStyle: { height: 450, width: 300 }
	},
	{
		name: 'yanusi_3',
		position: [-160, -150],
		scale: 0.13,
		stageStyle: { height: 400, width: 300 }
	},
	{
		name: 'yibei_3',
		position: [-100, -30],
		scale: 0.07,
		stageStyle: { height: 450, width: 300 }
	}
];

const Live2d = memo(() => {
	useEffect(() => {
		(async function () {
			if (Cookies.get('live2d_open') == 'true') {
				// 获取模型列表
				const modelsList = await (await fetch('/ModelList.json')).json();
				// 加载模型
				const oml2d = loadOml2d({
					primaryColor: '#8b5cf6',
					sayHello: false,
					models: modelsList.map(item => {
						return {
							...item,
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
				oml2d.onLoad(status => {
					switch (status) {
						case 'success':
							console.log('模型: ' + oml2d.model.name + '加载成功');
							return;
						case 'fail':
							console.log('模型: ' + oml2d.model.name + '加载失败');
							return;
						case 'loading':
							console.log('模型: ' + oml2d.model.name + '正在加载中');
							return;
					}
				});
			}
		})();
	}, []);

	return <></>;
});

export default Live2d;
