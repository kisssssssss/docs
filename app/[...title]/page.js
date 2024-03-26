import path from 'path';
import fs from 'fs';
// import { markdownToHtml } from '../utils/markdownIt';
// import parseDocFile from '../../utils/parseDocFile';

// import Article from '../../components/Article';

import MarkdownIt from 'markdown-it';
const md = new MarkdownIt()

export default async function Page(props) {
	const title = props.params.title.map(item => decodeURI(item));
	const mdPath = path.join(process.cwd(), 'docs', `${path.join(...title)}.md`);

	let source;
	try {
		source = await fs.promises.readFile(mdPath, 'utf-8');
	} catch (_) {}

	// const data = await parseDocFile(title);

	// return <Article content={data.content} />;

	return <h1>{md.render(source)}</h1>;
}
