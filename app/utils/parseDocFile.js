'use server';
import path from 'path';
import fs from 'fs';
import { markdownToHtml } from './markdownIt';

export default async function parseDocFile(mdPath) {
	// 获取文档所在路径
	let finalMdPath = path.join(process.cwd(), 'docs', `${path.join(...mdPath)}.md`);

	try {
		let source = await fs.promises.readFile(finalMdPath, 'utf-8');
		return markdownToHtml(source);
	} catch (e) {
		console.error('读取文件错误', finalMdPath, e);
		return null;
	}
}