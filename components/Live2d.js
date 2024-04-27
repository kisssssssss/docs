'use client';
import React, { memo, useEffect } from 'react';

const Live2d = memo(() => {
	useEffect(() => {
		const oml2d = ['HK416-1-normal', 'HK416-2-destroy', 'HK416-2-normal', 'Kar98k-normal', 'xisitina', 'mai', 'rem', 'terisa'];
		window.OML2D.loadOml2d({
			models: [
				...oml2d.map(item => {
					return {
						path: `https://model.oml2d.com/${item}/model.json`
					};
				})
			]
		});
	}, []);

	return <></>;
});

export default Live2d;
