import path from 'path';
import fs from 'fs';
// import parseDocFile from '../../utils/parseDocFile';

import Article from '../../components/Article';

import MarkdownIt from 'markdown-it';
import yaml from 'js-yaml';
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

	let mdSource;
	let mdHtml;
	try {
		mdSource = await fs.promises.readFile(mdPath, 'utf-8');
		mdHtml = markdownToHtml(mdSource).content;
	} catch (_) {}

	return <Article content={mdHtml} />;
}
