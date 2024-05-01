'use client';
import React, { memo, useCallback, useRef } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Tree, ConfigProvider, theme } from 'antd';
import Cookies from 'js-cookie';

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

const Catalog = memo(({ catalogs, darkMode, setOpen }) => {
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
		<ConfigProvider
			theme={{ algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm, token: { colorBgContainer: 'transparent' } }}>
			<Tree showLine defaultExpandAll switcherIcon={<DownOutlined />} onSelect={onSelect} treeData={createTreeData(catalogs)} />
		</ConfigProvider>
	);
});

export default Catalog;
