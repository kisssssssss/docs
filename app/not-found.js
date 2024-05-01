import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
			<div className='flex items-center dark:text-gray-200/90'>
				<h1 className='inline-block'>404</h1>
				<div className='border-solid pl-5 ml-4 border-l-gray-950 dark:border-l-gray-50 border-l-2'>
					<h2 className='inline-block text-2xl'>Not Found</h2>
					<p className='my-1'>Could not find requested page</p>
					<Link href='/'>👉 Return Home</Link>
				</div>
			</div>
		</div>
	);
}
