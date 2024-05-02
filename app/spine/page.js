import dynamic from 'next/dynamic';
import Script from 'next/script';

const Spine = dynamic(() => import('@/views/spine/spine'), { ssr: false });

export default async function () {
	return (
		<>
			<Script src='/spine/spine-player40.min.js' />

			<Spine />
		</>
	);
}
