import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

export function Reader() {
	const params = useParams()
  const [ story, setStory ] = useState(null)
	const [ currentNode, setCurrentNode ] = useState(null)

	const nodeMap = {} // node.id -> node
	const edgeMap = {} // node.id -> [edge]

	const route = (node) => {
		let edges = edgeMap[node] ?? []

		switch(node.type) {
			case 'start':
				return edges[0]
		}
	}

	const walk = (node) => {
		let prev
		let curr = node
		while (curr) {
			prev = curr
			curr = nodeMap[route(curr)]
		}

		return prev
	}

	const traverse = (node, edgeIndex) => {
		let edge = edgeMap[node][edgeIndex]
		let nextNode = nodeMap[edge]

		return walk(nextNode)
	}

  const getStory = () => {
    axios.get(`http://localhost:3000/stories/${params.id}`)
    .then(res => {
      let story = res.data?.story
      console.log('getStory', story)
      if (story) {
        setStory(story)

				const nodes = story.graph?.nodes ?? []
				const edges = story.graph?.edges ?? []

				for (const node of nodes) {
					nodeMap[node.id] = node
				}
				
				for (const edge of edges) {
					if (edgeMap[edge.source]) {
						edgeMap[edge.source].push(edge.target)
					} else {
						edgeMap[edge.source] = [edge.target]
					}
				}

				let startNode = nodes.find((node) => node.type === 'start')
				setCurrentNode(walk(startNode))
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
			{ story && currentNode && (
			<>
				<h2>{story.title}</h2>
				{/* <p>{JSON.stringify(story)}</p> */}
				<p>{currentNode.title} ({currentNode.type})</p>
				<p>{JSON.stringify(currentNode)}</p>
			</>
			) || (
				<p>[Unable to continue story.]</p>
			)}
			
		</div>
	)
}