'use client';
import { useRouter } from 'next/navigation';
import { FloatButton } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
export default function Article({content}) {
	const router = useRouter();
	return (
		<>
			<article
				className='prose mx-auto px-6 my-20 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-[896px] xl:max-w-screen-[1120px]'
				dangerouslySetInnerHTML={{ __html: content }}></article>
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
