'use server';

import MarkdownIt from 'markdown-it';



const md = new MarkdownIt()


export async function markdownToHtml(markdown) {
	const fmRegex = /---(.*?)---/gs;

	return {
		// meta: yaml.load(fmRegex.exec(markdown)[1]),
		content: md.render(markdown.replace(fmRegex, ''))
	};
}
