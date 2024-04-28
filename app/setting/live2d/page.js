import dynamic from 'next/dynamic';

const Live2dSetting = dynamic(() => import('../../../components/setting/live2dSetting'), {
	ssr: false
});

export default async function () {
	return <Live2dSetting />;
}
