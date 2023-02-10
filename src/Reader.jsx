import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

export function Reader() {
	const params = useParams()
  const [ story, setStory ] = useState(null)
	const [ currentNode, setCurrentNode ] = useState(null)
	const [ currentEdges, setCurrentEdges ] = useState([])

	let nodeMap = {} // node.id -> node
	let edgeMap = {} // node.id -> [edge]

	const route = (node) => {
		let edges = edgeMap[node.id] ?? []

		switch(node.type) {
			case 'start':
				return edges[0]?.target
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
		let nextNode = nodeMap[edge.id]

		return walk(nextNode)
	}

	const onNode = (node) => {
		let edges = edgeMap[node.id] ?? []

		setCurrentNode(node)
		setCurrentEdges(edges)
	}
	
	const onOption = (option) => {
		console.log('option', option)
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

				nodeMap = {}
				for (const node of nodes) {
					nodeMap[node.id] = node
				}
				
				edgeMap = {}
				for (const edge of edges) {
					if (edgeMap[edge.source]) {
						edgeMap[edge.source].push(edge)
					} else {
						edgeMap[edge.source] = [edge]
					}
				}

				let startNode = nodes.find((node) => node.type === 'start')
				let firstNode = walk(startNode)
				onNode(firstNode)
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
			<p>story: {story?.title}</p>
			<p>node: {currentNode?.type}</p>
			{ story && currentNode?.type === 'text' && (
			<>
				<h2>{currentNode.title}</h2>
				<p>{currentNode.text}</p>
				{/* <p>{JSON.stringify(story)}</p> */}
				<p>{JSON.stringify(currentNode)}</p>
				<p>{JSON.stringify(currentEdges)}</p>
				{ currentEdges
				.filter((edge) => edge.type === 'option')
				.map((option, index) => (
					<div key={index}>
						<button onClick={() => onOption(option)}>{option.handleText}</button>
					</div>
				))}
			</>
			) || (
				<p>[Unable to continue story.]</p>
			)}
			
		</div>
	)
}