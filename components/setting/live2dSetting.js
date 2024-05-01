'use client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { SwapLeftOutlined, ArrowUpOutlined } from '@ant-design/icons';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Switch, Card, Divider, Space, FloatButton, ConfigProvider, theme } from 'antd';

import getModelsList from '../../utils/getModelsList';

const { Meta } = Card;

const keyMap = {
	Azur: '碧蓝航线',
	BengHuai2: '崩坏学园2',
	GirlsFrontline: '少女前线',
	Sin: 'sin 七大罪～魔王崇拜～',
	VenusScramble: '女神大乱战'
};

const ModelList = memo(({ enable, darkMode }) => {
	if (!enable) return <></>;

	const list = useRef(null);
	const renderResult = useRef(null);
	const [renderer, serRenderer] = useState([]);

	// 模型切换
	const changeModel = useCallback(modelIndex => {
		if (window.oml2d.modelIndex != modelIndex) {
			window.oml2d?.loadSpecificModel(modelIndex);
		}
	}, []);

	useEffect(() => {
		(async function () {
			if (list.current == null) {
				list.current = await getModelsList();
			}

			if (renderResult.current == null) {
				renderResult.current = [];
				// 获取模型预览图
				let count = 0;
				for (const key in list.current) {
					renderResult.current.push(
						<div key={key} id={key}>
							<p className='text-lg font-bold text-gray-200/85'>
								{keyMap[key]}{' '}
								<span className='mx-2 text-base text-[#00000073] dark:text-gray-300/30 font-semibold'>
									数量：{list.current[key].length}
								</span>
							</p>
							<ConfigProvider theme={{ algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
								<Space wrap size='large'>
									{list.current[key].map((item, index) => {
										const currentCount = count + index;
										return (
											<Card
												hoverable
												key={item.name}
												style={{ width: 160 }}
												cover={<img className='my-0 object-cover  w-[160px] h-[160px]' alt='' src={item.cover} loading='lazy' />}
												styles={{
													cover: { width: '160px', height: '160px', overflow: 'hidden' },
													body: { padding: '12px 16px' }
												}}
												onClick={() => changeModel(currentCount)}>
												<Meta title={item.title} description={item.description} />
											</Card>
										);
									})}
								</Space>
								<Divider />
							</ConfigProvider>
						</div>
					);
					count += list.current[key].length;
				}

				// 获取模型数量及类型
				renderResult.current.unshift(
					<div key={'count'}>
						<p
							className='text-xl font-bold dark:text-gray-200/90'
							onClick={() => {
								a(1);
							}}>
							当前 Live2D 数量：{count}
						</p>
						<p className='text-base text-[#00000073] dark:text-gray-400/60 font-semibold'>
							类型：
							{Object.keys(list.current).map(key => (
								<span
									key={`type_${key}`}
									className='mx-2 hover:text-violet-500 dark:hover:text-violet-500/80 hover:underline underline-offset-4 cursor-pointer'
									onClick={() => {
										document.getElementById(key).scrollIntoView();
									}}>
									{keyMap[key]}
								</span>
							))}
						</p>
						<Divider />
					</div>
				);
			}

			serRenderer(renderResult.current);
		})();
	});

	return <>{renderer}</>;
});

const live2d = memo(() => {
	const router = useRouter();

	// 获取当前页面是否为暗色模式
	const darkMode = Cookies.get('darkMode') == 'true';

	//	live2d 是否启用
	const live2d_enable = Cookies.get('live2d_enable') == 'true';

	// 启用/禁用 Live2d
	const enableLive2d = useCallback(checked => {
		Cookies.set('live2d_enable', checked, { expires: 365 });
		// 通过 setTimeout 防止 Switch组件动画 卡顿
		setTimeout(() => window.location.reload(), 100);
	}, []);

	return (
		<div className='prose mx-auto px-6 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-[896px] xl:max-w-screen-[1120px] py-20'>
			<SwapLeftOutlined
				className='-ml-8 hover:text-violet-500 dark:hover:text-violet-500 cursor-pointer text-[25px] dark:text-gray-200/90'
				onClick={() => {
					router.push('/');
				}}
			/>
			<div className='flex items-center justify-between'>
				<p className='inline-block text-xl font-bold dark:text-gray-200/90'>显示 Live2D</p>

				<ConfigProvider theme={{ algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
					<Switch defaultChecked={live2d_enable} onChange={enableLive2d} />
				</ConfigProvider>
			</div>

			<ConfigProvider theme={{ algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
				<Divider />
			</ConfigProvider>

			<ModelList enable={live2d_enable} darkMode={darkMode} />

			<FloatButton type='primary' icon={<ArrowUpOutlined />} onClick={() => scrollTo(0, 0)} />
		</div>
	);
});

export default live2d;
