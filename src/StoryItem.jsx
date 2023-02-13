import { Link } from 'react-router-dom'

export function StoryItem(props) {
	const story = props.story ?? {}

	return (
		<div>
			<h2>{story.title}</h2>
			<Link to={`/story/${story.id}`}>
				{ story.owned && (
					<button>Open</button>
				) || (
					<button>Show</button>
				)}
			</Link>
		</div>
	)
}