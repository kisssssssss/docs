'use client';
import React, { memo, useEffect, useRef } from 'react';
import Live2dTips from './Live2dTips';
import Live2DTools from './Live2dTools';

const cdnPath = 'https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/';
let modelList = null;

function randomSelection(obj) {
	return Array.isArray(obj) ? obj[Math.floor(Math.random() * obj.length)] : obj;
}

async function initModel() {
	if (!modelList) {
		const response = await fetch(`${cdnPath}model_list.json`);
		modelList = await response.json();
	}

	let target = randomSelection(modelList.models[0]);

	// 加载模型
	loadlive2d('live2d', `${cdnPath}model/${target}/index.json`);
}

const Live2d = memo(() => {
	const container = useRef();
	const toggle = useRef();

	useEffect(() => {
		initModel();
	}, []);

	return (
		<>
			{/* 模型容器 */}
			<div ref={container} id='live2d-container'>
				<Live2dTips />
				<canvas id='live2d' width='800' height='800'></canvas>
				<Live2DTools container={container} toggle={toggle} />
			</div>
			{/* 模型是否显示 */}
			<div
				ref={toggle}
				id='toggle'
				onClick={() => {
					toggle.current.classList.remove('toggle-active');
					container.current.style.display = '';
					setTimeout(() => {
						container.current.style.bottom = '-5px';
					}, 0);
				}}>
				<span>Live2D</span>
			</div>
		</>
	);
});

export default Live2d;
