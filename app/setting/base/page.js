import dynamic from 'next/dynamic';

import getTheme from "@/utils/getTheme";

const BaseSetting = dynamic(() => import('@/views/setting/baseSetting'), {
	ssr: false
});

export default async function () {
	const [darkMode] = getTheme();
	return <BaseSetting darkMode={darkMode}/>;
}
