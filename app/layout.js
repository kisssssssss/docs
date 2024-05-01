import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import Sky from '../components/Sky';
import Plum from '../components/Plum';
const Live2d = dynamic(() => import('../components/Live2d'), {
	ssr: false
});

import '../style/sky.css';
import '../style/globals.css';
import '../style/normalize.css';
import '../style/atom-one-dark.min.css';

export const metadata = {
	title: 'Docs',
	description: 'A repository for note'
};

export default function RootLayout({ children }) {
	const darkMode = cookies().get('darkMode')?.value === 'dark';

	return (
		<html lang='en'>
			<head>
				<link rel='dns-prefetch' href='//cdn.jsdelivr.net' />
			</head>
			<body className={`h-full ${darkMode ? 'dark' : 'light'}`}>
				<AntdRegistry>{children}</AntdRegistry>
				{darkMode ? <Sky /> : <Plum />}
				<Live2d />
			</body>
		</html>
	);
}
