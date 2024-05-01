import { cookies } from 'next/headers';
import Home from '../components/home';
import getDocsMap from '../utils/getDocsMap';

export default async function APP() {
	const darkMode = cookies().get('darkMode')?.value === 'dark';
	const docs = await await getDocsMap();

	return <Home docs={docs} darkMode={darkMode} />;
}
