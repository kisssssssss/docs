'use client';
import React, { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Switch } from 'antd';
import { SwapLeftOutlined } from '@ant-design/icons';

const live2d = memo(() => {
	const router = useRouter();

	const change = useCallback(checked => {
		Cookies.set('live2d_open', checked, { expires: 365 });
		// 通过 setTimeout 防止 Switch 卡顿
		setTimeout(() => window.location.reload(), 100);
	}, []);

	return (
		<div className='prose mx-auto px-6 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-[896px] xl:max-w-screen-[1120px] py-20'>
			<SwapLeftOutlined
				className='-ml-8 hover:text-violet-500 cursor-pointer'
				onClick={() => {
					router.push('/');
				}}
			/>
			<div className='flex items-center justify-between'>
				<p className='inline-block text-xl font-bold'>显示 Live2D</p>
				<Switch defaultChecked={Cookies.get('live2d_open') == 'true'} onChange={change} />
			</div>
		</div>
	);
});

export default live2d;
