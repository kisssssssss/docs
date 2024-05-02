'use client';
import Cookies from 'js-cookie';
import React, { memo } from 'react';
import { useRouter } from 'next/navigation';
import { SwapLeftOutlined } from '@ant-design/icons';
import { Switch, Tag, ConfigProvider, theme } from 'antd';

const changeTheme = checked => {
	Cookies.set('darkMode', checked ? 'true' : 'false');
	window.location.reload();
};

const changeIsCatalogClose = checked => {
	Cookies.set('isCatalogClose', checked ? 'true' : 'false');
};

const baseSetting = memo(() => {
	const router = useRouter();

	const darkMode = Cookies.get('darkMode') === 'true';

	const isCatalogClose = !(Cookies.get('isCatalogClose') === 'false');

	return (
		<div className='prose mx-auto px-6 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-[896px] xl:max-w-screen-[1120px] py-20'>
			<SwapLeftOutlined
				className='-ml-8 hover:text-violet-500 dark:text-gray-200/90 cursor-pointer text-[25px]'
				onClick={() => {
					router.push('/');
				}}
			/>
			<ConfigProvider theme={{ algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
				<div className='flex items-center justify-between'>
					<p className='inline-block text-xl font-bold dark:text-gray-200/90'>Dark Theme</p>
					<Switch defaultChecked={darkMode} onChange={changeTheme} />
				</div>
				<div className='flex items-center justify-between'>
					<p className='inline-block text-xl font-bold dark:text-gray-200/90'>点击文章目录后关闭目录</p>
					<Switch defaultChecked={isCatalogClose} onChange={changeIsCatalogClose} />
				</div>
				<div className='flex items-center justify-between'>
					<p className='inline-block text-xl font-bold dark:text-gray-200/90'>
						Spine
						<Tag color='processing' style={{ marginLeft: '15px', borderRadius: '50px' }}>
							Alpha
						</Tag>
					</p>
					<Switch defaultChecked={false}  onChange={() => router.push('/spine')}/>
				</div>
			</ConfigProvider>
		</div>
	);
});

export default baseSetting;
