'use client';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { FloatButton } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HomeOutlined, ProfileOutlined, ArrowUpOutlined } from '@ant-design/icons';

const Catalogs = dynamic(() => import('./Catalogs'), {
	ssr: false
});

const getCatalogs = () => {
	// 获取h1-h6节点
	let headers = [];
	let temp = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
	for (let i = 0; i < temp.length; i++) {
		headers.push({ text: temp[i].innerHTML, level: Number(temp[i].tagName[1]), children: [] });
	}
	let res = [];
	// 生成目录树
	if (headers.length >= 1) {
		res.push(headers[0]);
		for (let i = 1; i < headers.length; i++) {
			const lastIndex1 = res.length - 1;

			if (headers[i].level > res[lastIndex1].level) {
				const lastIndex2 = res[lastIndex1]?.children.length - 1;
				const lastIndex3 = res[lastIndex1]?.children[lastIndex2]?.children.length - 1;
				const lastIndex4 = res[lastIndex1]?.children[lastIndex2]?.children[lastIndex3]?.children.length - 1;
				const lastIndex5 = res[lastIndex1]?.children[lastIndex2]?.children[lastIndex3]?.children[lastIndex4]?.children.length - 1;

				switch (headers[i].level - res[lastIndex1].level) {
					case 1:
						res[lastIndex1].children.push(headers[i]);
						break;
					case 2:
						res[lastIndex1].children[lastIndex2].children.push(headers[i]);
						break;
					case 3:
						res[lastIndex1].children[lastIndex2].children[lastIndex3].children.push(headers[i]);
						break;
					case 4:
						res[lastIndex1].children[lastIndex2].children[lastIndex3].children[lastIndex4].children.push(headers[i]);
						break;
					case 5:
						res[lastIndex1].children[lastIndex2].children[lastIndex3].children[lastIndex4].children[lastIndex5].children.push(headers[i]);
				}
			} else {
				res.push(headers[i]);
			}
		}
	}
	return res;
};

export default function Article({ content }) {
	const router = useRouter();

	const darkMode = Cookies.get('darkMode') === 'true';

	// 目录
	const [catalogs, setCatalogs] = useState([]);
	useEffect(() => {
		setCatalogs(getCatalogs());
	}, [content]);

	const [open, setOpen] = useState(false);

	return (
		<>
			<Catalogs catalogs={catalogs} darkMode={darkMode} open={open} setOpen={setOpen} />

			<article
				className={`prose dark:prose-invert prose-pre:font-[CaskaydiaCoveNerdFontMono] prose-code:font-medium prose-code:before:content-[''] prose-code:after:content-[''] prose-code:font-[CaskaydiaCoveNerdFontMono] prose-a:underline-offset-[6px] mx-auto px-6 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-[896px] xl:max-w-screen-[1120px] py-20`}
				dangerouslySetInnerHTML={{ __html: content }}></article>

			<FloatButton.Group shape='circle' style={{ right: 24 }}>
				<FloatButton type='primary' icon={<ProfileOutlined />} onClick={() => setOpen(true)} />
				<FloatButton type='primary' icon={<ArrowUpOutlined />} onClick={() => scrollTo(0, 0)} />
				<FloatButton
					type='primary'
					icon={<HomeOutlined />}
					onClick={() => {
						router.push('/');
					}}
				/>
			</FloatButton.Group>
		</>
	);
}
