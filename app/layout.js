import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import Sky from '@/views/Sky';
import Plum from '@/views/Plum';
const Live2d = dynamic(() => import('../views/Live2d'), {
	ssr: false
});

import '@/style/globals.css';
import '@/style/normalize.css';

export const metadata = {
	title: 'Docs',
	description: 'A repository for note'
};

export default function RootLayout({ children }) {
	const darkMode = cookies().get('darkMode')?.value === 'true';

	return (
		<html lang='en' className={`${darkMode ? 'dark' : 'light'}`}>
			<head>
				<link rel='dns-prefetch' href='//cdn.jsdelivr.net' />
			</head>
			<body className='h-full w-full'>
				<AntdRegistry>{children}</AntdRegistry>
				{darkMode ? <Sky /> : <Plum />}
				<Live2d />
			</body>
		</html>
	);
}
