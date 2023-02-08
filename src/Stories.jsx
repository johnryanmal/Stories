import { useState, useEffect } from 'react'
import axios from 'axios'

export function Stories() {
	const [ stories, setStories ] = useState({})

  const getStories = () => {
    axios.get("http://localhost:3000/stories")
    .then(res => {
      let stories = res.data?.stories
      console.log('stories', stories)
      if (stories) {
        setStories(stories)
      }
    }).catch(err => {
      console.error(err)
    })
  }

  useEffect(getStories, [])

	return (
		<div>
			<h1>Stories Index</h1>
			<p>{JSON.stringify(stories)}</p>
		</div>
	)
}