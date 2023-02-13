import { Link } from 'react-router-dom'

function PublicStory(props) {
	const story = props.story ?? {}

	return (
		<div>
			<h2>{story.title}</h2>
			<Link to={`/story/${story.id}/read`}>
				<button>Read</button>
			</Link>
		</div>
	)
}

function PrivateStory(props) {
	const story = props.story ?? {}
	
	return (
		<div>
			<h2>{story.title}</h2>
			<Link to={`/story/${story.id}/read`}>
				<button>Read</button>
			</Link>
			<Link to={`/story/${story.id}`}>
				<button>Edit</button>
			</Link>
		</div>
	)
}

export function StoryItem(props) {
	const story = props.story ?? {}

	return (
		<div>
			{ story.owned && (
				<PrivateStory story={story} />
			) || (
				<PublicStory story={story} />
			)}
		</div>
	)
}