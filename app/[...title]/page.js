import path from 'path';
import fs from 'fs';
// import parseDocFile from '../../utils/parseDocFile';

// import Article from '../../components/Article';

import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

function markdownToHtml(markdown) {
	const fmRegex = /---(.*?)---/gs;

	return {
		// meta: yaml.load(fmRegex.exec(markdown)[1]),
		content: md.render(markdown.replace(fmRegex, ''))
	};
}

export default async function Page(props) {
	const title = props.params.title.map(item => decodeURI(item));
	const mdPath = path.join(process.cwd(), 'docs', `${path.join(...title)}.md`);

	let source;
	try {
		source = await fs.promises.readFile(mdPath, 'utf-8');
		console.log(source);
		source = markdownToHtml(source).content;
		console.log(source);
	} catch (_) {}

	// const data = await parseDocFile(title);

	// return <Article content={data.content} />;

	return <h1>{source}</h1>;
}
