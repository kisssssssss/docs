import MarkdownIt from 'markdown-it';
import { createMathjaxInstance, mathjax } from '@mdit/plugin-mathjax';
import { container } from '@mdit/plugin-container';
import { sup } from '@mdit/plugin-sup';
import { sub } from '@mdit/plugin-sub';
import { mark } from '@mdit/plugin-mark';
import hljs from 'highlight.js';
const multimdTable = require('markdown-it-multimd-table');
const yaml = require('js-yaml');

const mathjaxInstance = createMathjaxInstance({ output: 'chtml' });

const md = new MarkdownIt({
	html: true,
	highlight: function (str, lang) {
		let code = md.utils.escapeHtml(str);
		if (lang && hljs.getLanguage(lang)) {
			code = hljs.highlight(lang, str, true).value;
		}
		return `<pre class="hljs"><code>${code}</code></pre>`;
	}
})
	.use(mathjax, mathjaxInstance)
	.use(sup)
	.use(sub)
	.use(mark)
	.use(multimdTable, {
		multiline: true,
		rowspan: true,
		headerless: true,
		multibody: true,
		autolabel: true
	})
	.use(container, {
		name: 'info',
		openRender: (tokens, index, _options) => {
			const info = tokens[index].info.trim().trim();
			return `<div class="custom-container info">\n<p class="custom-container-title info">${info || 'Info'}</p>\n`;
		}
	})
	.use(container, {
		name: 'tip',
		openRender: (tokens, index, _options) => {
			const info = tokens[index].info.trim().trim();
			return `<div class="custom-container tip">\n<p class="custom-container-title tip">${info || 'Tip'}</p>\n`;
		}
	})
	.use(container, {
		name: 'warning',
		openRender: (tokens, index, _options) => {
			const info = tokens[index].info.trim().trim();
			return `<div class="custom-container warning">\n<p class="custom-container-title warning">${info || 'Warning'}</p>\n`;
		}
	})
	.use(container, {
		name: 'error',
		openRender: (tokens, index, _options) => {
			const info = tokens[index].info.trim().trim();
			return `<div class="custom-container error">\n<p class="custom-container-title error">${info || 'Error'}</p>\n`;
		}
	});

export function markdownToHtml(markdown) {
	const fmRegex = /---(.*?)---/gs;

	return {
		meta: yaml.load(fmRegex.exec(markdown)[1]),
		content: md.render(markdown.replace(fmRegex, ''))
	};
}
