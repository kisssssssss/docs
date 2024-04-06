'use client';
import React, { memo } from 'react';

const Generator = memo(({ data }) => {
	if (data.children.length === 0) {
		return <li>{data.text}</li>;
	} else {
		return (
			<li>
				<span>{data.text}</span>
				<ol>
					{data.children.map((item, index) => (
						<Generator data={item} key={index} />
					))}
				</ol>
			</li>
		);
	}
});

const Catalog = memo(({ catalog }) => {
	return (
		<div className='prose'>
			<ol>
				{catalog.map((item, index) => {
					return <Generator data={item} key={index} />;
				})}
			</ol>
		</div>
	);
});

export default Catalog;
