import React, { memo } from 'react';

const HomeTodo = memo(() => {
	return (
		<div className='prose dark:prose-invert'>
			<p className='dark:text-gray-200/90 text-2xl mb-2'>TODO:</p>
			<ol className='mt-[4px] ml-4'>
				<li className='my-0 pl-0'>测试模型</li>
				
			</ol>
		</div>
	);
});

export default HomeTodo;
