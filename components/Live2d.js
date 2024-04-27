'use client';
import React, { memo, useEffect } from 'react';
import { loadOml2d } from 'oh-my-live2d';

const Live2d = memo(() => {
	useEffect(() => {
		const oml2d = [
			'HK416-1-normal',
			'HK416-2-destroy',
			'HK416-2-normal',
			'Kar98k-normal',
			'Pio',
			'Senko_Normals',
			'bilibili-22',
			'bilibili-33',
			'cat-black',
			'cat-white',
			'chino',
			'date',
			'hallo',
			'haruto',
			'hibiki',
			'histoire',
			'kobayaxi',
			'koharu',
			'kp31',
			'live_uu',
			'mai',
			'murakumo',
			'platelet',
			'platelet_2',
			'potion-Maker-Pio',
			'rem',
			'rem_2',
			'shizuku',
			'shizuku_48',
			'shizuku_pajama',
			'terisa',
			'tia',
			'umaru',
			'uni',
			'wed_16',
			'xisitina',
			'z16'
		];
		loadOml2d({
			models: [
				...oml2d.map(item => {
					return {
						path: `https://model.oml2d.com/${item}/model.json`,
						scale:0.05
					};
				})
			]
		});
	}, []);

	return <></>;
});

export default Live2d;
