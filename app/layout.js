import { AntdRegistry } from '@ant-design/nextjs-registry';

import Plum from '../components/Plum';
import Live2d from '../components/Live2d';

import '../style/globals.css';
import '../style/normalize.css';
import '../style/atom-one-dark.min.css';

export const metadata = {
	title: 'Docs',
	description: 'A repository for note'
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<link rel='stylesheet' href='/live2d/live2d.css'></link>
				<script src='/live2d/live2d.min.js'></script>
			</head>
			<body>
				<AntdRegistry>{children}</AntdRegistry>
				<Plum />
				<Live2d />
			</body>
		</html>
	);
}
