'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FloatButton } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import parseDocFile from '../../utils/parseDocFile';

export default function Page(props) {
	let title = props.params.title.map(item => decodeURI(item));

	const router = useRouter();

	const [data, setData] = useState('');
	useEffect(() => {
		parseDocFile(title).then(data => {
			setData(data);
			document.title = data.meta.title;
		});
	}, []);

	return (
		<>
			<article
				className='prose mx-auto px-6 my-20 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-[896px] xl:max-w-screen-[1120px]'
				dangerouslySetInnerHTML={{ __html: data.content }}></article>
			<FloatButton
				type='primary'
				icon={<HomeOutlined />}
				onClick={() => {
					router.push('/');
				}}
			/>
		</>
	);
}
