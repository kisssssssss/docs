'use client';
import React, { memo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Switch, Card, Divider, Space } from 'antd';
import { SwapLeftOutlined } from '@ant-design/icons';

const { Meta } = Card;

const live2d = memo(() => {
	const router = useRouter();

	const change = useCallback(checked => {
		Cookies.set('live2d_open', checked, { expires: 365 });
		// 通过 setTimeout 防止 Switch 卡顿
		setTimeout(() => window.location.reload(), 100);
	}, []);

	const ModelList = useCallback(() => {
		let list = localStorage.getItem('modelsList');
		if (list) {
			list = JSON.parse(list);
			return (
				<div>
					<h2>当前 Live2D 数量：{list.length}</h2>
					<Space wrap size='large'>
						{list.map(item => (
							<Card
								key={item.name}
								hoverable
								style={{ width: 160 }}
								styles={{
									cover: { width: '160px', height: '90px', overflow: 'hidden' },
									body: { padding: '12px 16px' }
								}}
								cover={<img className='my-0 object-scale-down  w-[160px] h-[90px]' alt='' src={item.cover} loading='lazy' />}>
								<Meta title={item.title} />
							</Card>
						))}
					</Space>
				</div>
			);
		} else {
			return <></>;
		}
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
				<Switch defaultChecked={Cookies.get('live2d_open') == 'true'} onChange={change} />
			</div>
			<Divider />
			<ModelList />
		</div>
	);
});

export default live2d;
