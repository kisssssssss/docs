import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Article from '../../../components/Article';

// 把 markdown 抽离到其它文件后，vercel会显示500错误
import yaml from 'js-yaml';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import mathjax from 'markdown-it-mathjax3';
import multimdTable from 'markdown-it-multimd-table';
import { sup } from '@mdit/plugin-sup';
import { sub } from '@mdit/plugin-sub';
import { mark } from '@mdit/plugin-mark';
import { tasklist } from '@mdit/plugin-tasklist';
import { container } from '@mdit/plugin-container';

const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
	highlight: function (str, lang) {
		let code = md.utils.escapeHtml(str);
		if (lang && hljs.getLanguage(lang)) {
			code = hljs.highlight(lang, str, true).value;
		}
		return `<pre class="hljs"><code>${code}</code></pre>`;
	}
})
	.use(mathjax)
	.use(sup)
	.use(sub)
	.use(mark)
	.use(anchor)
	.use(container, {
		name: 'info',
		openRender: (tokens, index, _options) => {
			const info = tokens[index].info.trim().trim();
			return `<div class="custom-container info">`;
			// return `<div class="custom-container info">\n<p class="custom-container-title info">${info || 'Info'}</p>\n`;
		}
	})
	.use(container, {
		name: 'tip',
		openRender: (tokens, index, _options) => {
			const info = tokens[index].info.trim().trim();
			return `<div class="custom-container tip">`;
			// return `<div class="custom-container tip">\n<p class="custom-container-title tip">${info || 'Tip'}</p>\n`;
		}
	})
	.use(container, {
		name: 'warning',
		openRender: (tokens, index, _options) => {
			const info = tokens[index].info.trim().trim();
			return `<div class="custom-container warning">`;
			// return `<div class="custom-container warning">\n<p class="custom-container-title warning">${info || 'Warning'}</p>\n`;
		}
	})
	.use(container, {
		name: 'error',
		openRender: (tokens, index, _options) => {
			const info = tokens[index].info.trim().trim();
			return `<div class="custom-container error">`;
			// return `<div class="custom-container error">\n<p class="custom-container-title error">${info || 'Error'}</p>\n`;
		}
	})
	.use(tasklist, {
		disabled: false
	})
	.use(multimdTable);

function markdownToHtml(markdown) {
	const fmRegex = /---(.*?)---/gs;
	return {
		meta: yaml.load(fmRegex.exec(markdown)[1]),
		content: md.render(markdown.replace(fmRegex, ''))
	};
}

// 实现缓存
const renderResult = new Map();

export default async function Page(props) {
	const title = path.join(...props.params.title.map(item => decodeURI(item)));

	// 渲染结果
	let mdHtml;

	if (renderResult.has(title)) {
		mdHtml = renderResult.get(title);
	} else {
		// 获取文件路径
		const mdPath = path.join(process.cwd(), 'docs', `${title}.md`);
		// 判断文件是否存在
		if (!fs.existsSync(mdPath)) return notFound();
		// 读取文件
		const mdFile = await fs.promises.readFile(mdPath, 'utf-8');
		// 获取渲染结果
		mdHtml = markdownToHtml(mdFile).content;
		// 缓存
		renderResult.set(title, mdHtml);
	}

	return <Article content={mdHtml} />;
}
