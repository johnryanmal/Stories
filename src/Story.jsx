import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export function Story() {
	const params = useParams()
	const [ story, setStory ] = useState(null)

	const getStory = () => {
    axios.get(`http://localhost:3000/stories/${params.id}`)
    .then(res => {
      let story = res.data?.story
      //console.log('getStory', story)
      if (story) {
        setStory(story)
			}
		})
		.catch(err => {
			console.error(err)
		})
	}

	useEffect(getStory, [])

	return (
		<>
      { story && (
			<>
				<h1>{story.title}</h1>
				<p>{story.description}</p>

				<Link to={`/story/${story.id}/read`}>
					<button>Read</button>
				</Link>
				{ story.owned && (
					<Link to={`/story/${story.id}/edit`}>
						<button>Edit</button>
					</Link>
				)}
			</>
      ) || (
      <>
        <p>Story not found.</p>
      </>
      )}
    </>
	)
}