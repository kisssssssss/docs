'use client';
import { useRouter } from 'next/navigation';
import React, { memo, useCallback } from 'react';
import { Switch, Card, Divider, Space, FloatButton } from 'antd';
import { SwapLeftOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

const { Meta } = Card;

const live2d = memo(() => {
	const router = useRouter();

	//	live2d 是否启用
	const live2d_enable = Cookies.get('live2d_enable') == 'true';

	// 启用/禁用 Live2d
	const enableLive2d = useCallback(checked => {
		Cookies.set('live2d_enable', checked, { expires: 365 });

		// 通过 setTimeout 防止 Switch组件动画 卡顿
		setTimeout(() => window.location.reload(), 100);
	}, []);

	// 模型切换
	const changeModel = useCallback(modelIndex => {
		if (window.oml2d && modelIndex) {
			window.oml2d.loadSpecificModel(modelIndex);
		}
	}, []);

	// 模型列表
	const ModelList = useCallback(() => {
		if (!live2d_enable) return <></>;

		const list = JSON.parse(localStorage.getItem('modelsList') || '{}');

		const renderResult = [];
		const keyMap = { Azur: '碧蓝航线', BengHuai2: '崩坏学园2', GirlsFrontline: '少女前线' };

		// 获取模型预览图
		let count = 0;
		for (const key in list) {
			renderResult.push(
				<div key={key} id={key}>
					<p className='text-lg font-bold'>
						{keyMap[key]} <span className='mx-2 text-base text-[#00000073] font-semibold'>数量：{list[key].length}</span>
					</p>
					<Space wrap size='large'>
						{list[key].map((item, index) => {
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
				</div>
			);
			count += list[key].length;
		}

		// 获取模型数量及类型
		renderResult.unshift(
			<div key={'count'}>
				<p className='text-xl font-bold'>当前 Live2D 数量：{count}</p>
				<p className='text-base text-[#00000073] font-semibold'>
					类型：
					{Object.keys(list).map(key => (
						<span
							key={`type_${key}`}
							className='mx-4 hover:text-violet-500 hover:underline underline-offset-4 cursor-pointer'
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

		return renderResult;
	}, []);

	return (
		<div className='prose mx-auto px-6 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-[896px] xl:max-w-screen-[1120px] py-20'>
			<SwapLeftOutlined
				className='-ml-8 hover:text-violet-500 cursor-pointer text-[25px]'
				onClick={() => {
					router.push('/');
				}}
			/>
			<div className='flex items-center justify-between'>
				<p className='inline-block text-xl font-bold'>显示 Live2D</p>
				<Switch defaultChecked={live2d_enable} onChange={enableLive2d} />
			</div>
			<Divider />
			<ModelList />
			<FloatButton type='primary' icon={<ArrowUpOutlined />} onClick={() => scrollTo(0, 0)}></FloatButton>
		</div>
	);
});

export default live2d;