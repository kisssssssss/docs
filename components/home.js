'use client';
import { useRouter } from 'next/navigation';
import { Tree, ConfigProvider } from 'antd';

const { DirectoryTree } = Tree;

export default function Home({ docs }) {
	const router = useRouter();
	const onSelect = (keys, info) => {
		if (info.node.isLeaf) {
			router.push(info.node.path);
		}
	};
	return (
		<main className='max-w-[1200px] mx-auto flex flex-col lg:flex-row lg:mt-20'>
			<div className='w-full lg:w-fit flex flex-col justify-center lg:justify-start items-center mt-10 lg:mt-0'>
				<img
					className='w-16 h-16 min-w-16 min-h-16 xl:w-24 xl:min-w-24 xl:h-24 xl:min-h-24 2xl:w-32 2xl:min-w-32 2xl:h-32 2xl:min-h-32 rounded-full shadow-lg'
					src='/icon.png'
					alt=''></img>

				<div className='mx-auto mt-6 mb-3'>
					<p
						className='w-full text-center mt-2 mb-1 mx-2 lg:mx-0 text-sm inline lg:inline-block text-gray-700 hover:text-violet-500 no-underline hover:underline hover:underline-offset-4 hover:decoration-dashed cursor-pointer'
						onClick={() => router.push('https://kisssssssss.space/')}>
						Home
					</p>
				</div>
			</div>
			<div className='w-full px-16 max-w-[86vw] mx-auto mt-8'>
				<ConfigProvider
					theme={{
						components: {
							Tree: {
								directoryNodeSelectedBg: '#ddd6fe33',
								directoryNodeSelectedColor: '#8b5cf6'
							}
						}
					}}>
					<DirectoryTree showLine multiple onSelect={onSelect} treeData={docs} />
				</ConfigProvider>
			</div>
		</main>
	);
}
