import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

export function Reader() {
	const params = useParams()
  const [ story, setStory ] = useState(null)

  const getStory = () => {
    axios.get(`http://localhost:3000/stories/${params.id}`)
    .then(res => {
      let story = res.data?.story
      console.log('getStory', story)
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
		<div>
			<h1>Reader</h1>
			<p>{JSON.stringify(story)}</p>
		</div>
	)
}