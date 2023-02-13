import { StoryItem } from './StoryItem'

export function StoriesList(props) {
	const stories = props.stories ?? []

	return (
		<>
			{stories.map((story, index) => (
				<StoryItem story={story} key={index} />
			))}
		</>
	)
}