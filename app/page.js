import { cookies } from 'next/headers';
import Home from '../components/home';// 将home文件改成Home后，vercel部署会失败，显示找不到 ../components/Home ?
import getDocsMap from '../utils/getDocsMap';

export default async function APP() {
	const darkMode = cookies().get('darkMode')?.value === 'dark';
	const docs = await await getDocsMap();

	return <Home docs={docs} darkMode={darkMode} />;
}
