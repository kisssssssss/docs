import getDocsMap from './utils/getDocsMap';
import Home from '../components/home';

export default async function APP() {
	const docs = await await getDocsMap();

	return <Home docs={docs} />;
}
