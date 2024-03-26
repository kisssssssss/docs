'use server';
import path from 'path';
import fs from 'fs';
import { markdownToHtml } from '../utils/markdownIt';

export default async function parseDocFile(mdPath) {
	// 获取文档所在路径
	let finalMdPath = `${path.join(...mdPath)}.md`;
	if (finalMdPath.startsWith('/')) {
		finalMdPath = finalMdPath.slice(1);
	}
	finalMdPath = path.join(process.cwd(), 'docs', finalMdPath);

	try {
		let source = await fs.promises.readFile(finalMdPath, 'utf-8');
		return markdownToHtml(source);
	} catch (e) {
		console.error(e);
		return null;
	}
}
