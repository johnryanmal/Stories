import config from './config'

import { useState, useEffect } from 'react'
import axios from 'axios'

import { StoriesList } from './StoriesList'

export function Stories() {
	const [ stories, setStories ] = useState([])

  const getStories = () => {
    axios.get(`${config.api}/stories`)
    .then(res => {
      let stories = res.data?.stories
      //console.log('stories', stories)
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
			<h1>All Stories</h1>
      <StoriesList stories={stories} />
		</>
	)
}