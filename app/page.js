import Home from '@/views/home'; // 将home文件改成Home后，vercel部署会失败，显示找不到 ../components/Home ?
import getDocsMap from '@/utils/getDocsMap';

export default async function APP() {
	const docs = await getDocsMap();

	return <Home docs={docs}/>;
}
