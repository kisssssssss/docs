import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import Plum from '../components/Plum';

import '../style/globals.css';
import '../style/normalize.css';
import '../style/atom-one-dark.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Docs',
	description: 'A repository for note'
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AntdRegistry>{children}</AntdRegistry>
				<Plum></Plum>
			</body>
		</html>
	);
}
