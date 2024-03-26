import path from 'path';
// import parseDocFile from '../../utils/parseDocFile';

// import Article from '../../components/Article';

export default async function Page(props) {
	const title = props.params.title.map(item => decodeURI(item));

	// const data = await parseDocFile(title);

	// return <Article content={data.content} />;

	let finalMdPath = path.join(process.cwd(), 'docs', `${path.join(...title)}.md`);
	return <h1>{finalMdPath}</h1>
}
