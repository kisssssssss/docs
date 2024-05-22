import dynamic from 'next/dynamic';

import getTheme from "@/utils/getTheme";

const Live2dSetting = dynamic(() => import('@/views/setting/live2dList'), {
	ssr: false
});

export default async function () {
	const [darkMode] = getTheme();
	return (
		<div className='prose mx-auto px-6 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-[896px] xl:max-w-screen-[1120px] py-20'>
			<Live2dSetting darkMode={darkMode}/>
		</div>
	);
}
