'use client';
import React, { memo } from 'react';
import { useRouter } from 'next/navigation';
import { SwapLeftOutlined } from '@ant-design/icons';

const baseSetting = memo(() => {
	const router = useRouter();
	return (
		<div className='prose mx-auto px-6 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-[896px] xl:max-w-screen-[1120px] py-20'>
			<SwapLeftOutlined
				className='-ml-8 hover:text-violet-500 cursor-pointer text-[25px]'
				onClick={() => {
					router.push('/');
				}}
			/>
		</div>
	);
});

export default baseSetting;
