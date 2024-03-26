import parseDocFile from '../../utils/parseDocFile';

import Article from '../../components/Article';

export default async function Page(props) {
	const title = props.params.title.map(item => decodeURI(item));
	const data = await parseDocFile(title);

	return <Article content={data.content} />;
}
