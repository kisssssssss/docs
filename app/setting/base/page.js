import dynamic from 'next/dynamic';

const BaseSetting = dynamic(() => import('../../../components/setting/baseSetting'), {
	ssr: false
});

export default async function () {
	return <BaseSetting />;
}
