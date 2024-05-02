import dynamic from 'next/dynamic';

const BaseSetting = dynamic(() => import('@/views/setting/baseSetting'), {
	ssr: false
});

export default async function () {
	return <BaseSetting />;
}
