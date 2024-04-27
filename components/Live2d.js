'use client';
import React, { memo, useEffect } from 'react';

const Live2d = memo(() => {
	useEffect(() => {
		const oml2d = ['HK416-1-normal', 'HK416-2-destroy', 'HK416-2-normal', 'Kar98k-normal', 'xisitina', 'mai', 'rem', 'terisa'];
		const publicModel = [];
		// window.OML2D.loadOml2d({
		// 	models: [
		// 		// ...oml2d.map(item => {
		// 		// 	return {
		// 		// 		path: `https://model.oml2d.com/${item}/model.json`
		// 		// 	};
		// 		// }),
		// 		...publicModel.map(item => {
		// 			return { path: `/model/${item}/${item}.model3.json`, scale: 0.1 };
		// 		})
		// 	]
		// });
	}, []);

	return <></>;
});

export default Live2d;
