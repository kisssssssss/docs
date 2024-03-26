import fs from 'fs';
import path from 'path';
import { markdownToHtml } from '../../utils/markdownIt';
// import parseDocFile from '../../utils/parseDocFile';

// import Article from '../../components/Article';

export default async function Page(props) {
	const title = props.params.title.map(item => decodeURI(item));
	const mdPath = path.join(process.cwd(), 'public', 'docs', `${path.join(...title)}.md`);

	let md;
	try {
		// fs.readdirSync(path.join(process.cwd(), 'public','docs'))
		// md = await fs.promises.readFile(mdPath, 'utf-8');
	} catch (err) {
		md = String(err);
	}

	// const data = await parseDocFile(title);

	// return <Article content={data.content} />;

	return <h1>{md}</h1>;
}
