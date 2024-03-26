import Article from '../../components/Article';
import { markdownToHtml } from '../../utils/markdownIt';

export default async function Page(props) {
	const title = props.params.title.map(item => decodeURI(item));
	const mdPath = path.join(process.cwd(), 'docs', `${path.join(...title)}.md`);

	let mdHtml;
	try {
		const mdSource = await fs.promises.readFile(mdPath, 'utf-8');
		mdHtml = markdownToHtml(mdSource).content;
	} catch (_) {}

	return <Article content={mdHtml} />;
}
