import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { StoriesList } from './StoriesList'

export function UserStories() {
	const [ stories, setStories ] = useState([])

  const getStories = () => {
    axios.get("http://localhost:3000/stories/user")
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
		<>
			<h1>Stories Index</h1>
      <StoriesList stories={stories} />
		</>
	)
}