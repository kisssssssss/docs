import { AntdRegistry } from '@ant-design/nextjs-registry';

import Plum from '../components/Plum';

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
			<body>
				<AntdRegistry>{children}</AntdRegistry>
				<Plum></Plum>
			</body>
		</html>
	);
}
