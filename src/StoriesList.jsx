import { StoryItem } from './StoryItem'

export function StoriesList(props) {
	const stories = props.stories ?? []

	return (
		<>
			{stories.map((story) => (
				<StoryItem story={story} key={story.id} />
			))}
		</>
	)
}