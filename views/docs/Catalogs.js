'use client';
import Cookies from 'js-cookie';
import { DownOutlined } from '@ant-design/icons';
import React, { memo, useCallback, useRef } from 'react';
import { Tree, ConfigProvider, theme, Drawer } from 'antd';

// 创建目录树元素
const createTreeData = array => {
	if (!array) return [];

	return array.map(item => {
		return {
			title: item.text,
			key: item.text,
			children: item.children.length == 0 ? null : createTreeData(item.children)
		};
	});
};

const Catalog = memo(({ catalogs, darkMode, open, setOpen }) => {
	const isClose = useRef(!(Cookies.get('isCatalogClose') === 'false'));

	// 点击目录
	const onSelect = useCallback(key => {
		const h = document.getElementById(encodeURI(key[0].toLowerCase()));
		if (h) {
			h.scrollIntoView();
			isClose.current && setOpen(false);
		}
	});

	return (
		<ConfigProvider theme={{ algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
			<Drawer
				rootStyle={{}}
				title='目录'
				width={252}
				open={open}
				onClose={() => setOpen(false)}
				placement={window.innerWidth < 768 ? 'bottom' : 'right'}>
				<ConfigProvider theme={{ token: { colorBgContainer: 'transparent' } }}>
					<Tree showLine defaultExpandAll switcherIcon={<DownOutlined />} onSelect={onSelect} treeData={createTreeData(catalogs)} />
				</ConfigProvider>
			</Drawer>
		</ConfigProvider>
	);
});

export default Catalog;
