'use client';
import React, { memo } from 'react';

const Generator = memo(({ data }) => {
	return (
		<li className='mt-1 mb-2'>
			<span
				className='has-[:hover]:text-violet-500 inline-block w-full truncate'
				style={{ fontSize: `${16 - (data.level * data.level) / 10}px` }}>
				<a href={`#${data.text.toLowerCase()}`}>{data.text}</a>
			</span>

			{(() => {
				if (data.children.length != 0) {
					return (
						<ul style={{ marginLeft: `${4 + 4 * data.level}px` }}>
							{data.children.map((item, index) => (
								<Generator data={item} key={index} />
							))}
						</ul>
					);
				}
			})()}
		</li>
	);
});

const Catalog = memo(({ catalog, isShowCatalog }) => {
	return isShowCatalog ? (
		<div
			id='Catalog'
			className='fixed right-0 top-[8%] max-h-[70%] w-[270px] overflow-y-auto overflow-x-hidden bg-gray-100 text-current rounded-lg pt-2 pb-1'>
			<ul className='ml-[10px] pr-2'>
				{catalog.map((item, index) => {
					return <Generator data={item} key={index} />;
				})}
			</ul>
		</div>
	) : null;
});

export default Catalog;
