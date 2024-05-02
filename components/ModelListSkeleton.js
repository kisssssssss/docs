import React, { memo } from 'react';
import { Skeleton, Divider, ConfigProvider, theme, Space } from 'antd';

const ModelListSkeleton = memo(({ darkMode }) => {
	return (
		<ConfigProvider theme={{ algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
			<Skeleton.Input active />
			<Skeleton.Input active block style={{ marginTop: '1rem' }} />
			<Divider />
			<Space align='end'>
				<Skeleton.Input active />
				<Skeleton.Input active size='small' />
			</Space>
			<br />
			<Space align='center' wrap style={{ marginTop: '1rem' }}>
				{Array(8)
					.fill(null)
					.map((_, i) => (
						<Skeleton.Image style={{ height: 200, width: 160 }} active size='large' key={i} />
					))}
			</Space>
		</ConfigProvider>
	);
});

export default ModelListSkeleton;
