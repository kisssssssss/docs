'use client';
import React, { memo } from 'react';

import '@/style/sky.css';

const Sky = memo(() => {
	return (
		<div className='flex flex-auto flex-col fixed top-0 left-0 right-0 bottom-0 bg-[#040d21] -z-10 overflow-hidden'>
			<div className='signup-space'>
				<div className='signup-stars'></div>
				<div className='signup-stars'></div>
				<div className='signup-stars'></div>
				<div className='signup-stars'></div>
				<div className='signup-stars'></div>
				<div className='signup-stars'></div>
			</div>
			<img
				src='/img/hero-glow.svg'
				alt='Glowing universe'
				className='absolute overflow-hidden pointer-events-none top-1/2 left-1/2 w-[200%]'
				style={{ transform: 'translate(-50%, -50%)' }}
			/>
		</div>
	);
});

export default Sky;
