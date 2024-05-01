import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';

const Live2dSetting = dynamic(() => import('../../../components/setting/live2dSetting'), {
	ssr: false
});

export default async function () {
	return <Live2dSetting darkMode={cookies().get('theme')?.value === 'dark'} />;
}
