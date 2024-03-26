'use server';
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// 将文件的物理路径转换为 url 路径
function getUrlPath(fileRealPath) {
	let res = fileRealPath.split(path.sep).join('/');
	return res.substring(res.lastIndexOf('docs') + 4).replace('.md', '');
}

// 读取目录
function readDir(dirPath) {
	const entries = fs.readdirSync(dirPath);

	let res = entries.map(entry => {
		const fullPath = path.join(dirPath, entry);

		const isDirectory = fs.statSync(fullPath).isDirectory();

		if (isDirectory) {
			return {
				title: entry,
				key: entry,
				children: readDir(fullPath)
			};
		} else {
			const meta = yaml.load(/---(.*?)---/gs.exec(fs.readFileSync(fullPath, 'utf-8'))[1]);
			let temple = entry.replace('.md', '');
			return {
				index: meta.index || 0,
				title: temple,
				key: temple,
				isLeaf: true,
				path: getUrlPath(fullPath)
			};
		}
	});

	// 排序
	res = res.sort((a, b) => {
		// 两边都是文件
		if (typeof a.index == 'number' && typeof b.index == 'number') {
			return a.index - b.index;
		}
		// 有一个或者都是是文件夹
		if (a.isLeaf && !b.isLeaf) {
			return 1;
		} else if (!a.isLeaf && b.isLeaf) {
			return -1;
		} else if (!a.isLeaf && !b.isLeaf) {
			return 0;
		}
	});

	return res;
}

export default async function getDocsMap() {
	return readDir(path.join(process.cwd(), 'public','docs'));
}
