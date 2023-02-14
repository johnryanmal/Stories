import axios from 'axios'

export function NewStory() {

	const handleSubmit = async (event) => {
		event.preventDefault()
		const formData = new FormData(event.target)
		const storyParams = Object.fromEntries(formData.entries())
		return axios.post("http://localhost:3000/stories", storyParams)
		.then(res => {
			const story = res.data?.story
			//console.log(res.data)
			//console.log('new story', story)
			if (story) {
				window.location.href = `/story/${story.id}`
			}
		})
		.catch(err => {
			console.error(err)
		})
	}

	return (
		<>
			<h1>New Story</h1>
			<form onSubmit={handleSubmit}>
				<div>Title: <input type="text" name="title" /></div>
				<div>Description: <textarea name="description" /></div>
				<div>Public: <input type="checkbox" name="public" /></div>
				<button type="submit">Create Story</button>
			</form>
		</>
	)
}