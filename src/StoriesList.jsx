import { StoryItem } from './StoryItem'

export function StoriesList(props) {
	const stories = props.stories ?? []

	return (
		<>
			{ stories.length > 0 && stories.map((story) => (
				<StoryItem story={story} key={story.id} />
			)) || (
				<p>No stories found.</p>
			)}
		</>
	)
}