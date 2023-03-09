import { Link } from 'react-router-dom'

export function StoryItem(props) {
	const story = props.story ?? {}

	const truncate = (str, len) => {
		if (str.length > len) {
			return str.slice(0, -3) + '...'
		} else {
			return str
		}
	}

	return (
		<div>
			<h2>{story.title}</h2>
			{ story.description && (
				<p>
					{truncate(story.description)}
				</p>
			)}
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