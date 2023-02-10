import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

export function Reader() {
	const params = useParams()
  const [ story, setStory ] = useState(null)
	const [ nodeMap, setNodeMap ] = useState({}) // node.id -> node
	const [ edgeMap, setEdgeMap ] = useState({}) // node.id -> [edge]
	const [ currentNode, setCurrentNode ] = useState(null)
	const [ currentEdges, setCurrentEdges ] = useState([])

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

	const onNode = (node) => {
		if (node) {
			let edges = edgeMap[node.id] ?? []
			setCurrentNode(node)
			setCurrentEdges(edges)
		}
	}
	
	const onOption = (option) => {
		console.log('option', option)
		let nextNode = nodeMap[option.target]
		onNode(walk(nextNode))
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

				let _nodeMap = {}
				for (const node of nodes) {
					_nodeMap[node.id] = node
				}
				setNodeMap(_nodeMap)
				
				let _edgeMap = {}
				for (const edge of edges) {
					if (_edgeMap[edge.source]) {
						_edgeMap[edge.source].push(edge)
					} else {
						_edgeMap[edge.source] = [edge]
					}
				}
				setEdgeMap(_edgeMap)
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  useEffect(getStory, [])

	const getCurrentNode = () => {
		console.log('getCurrentNode', nodeMap)
		let startNode = Object.values(nodeMap).find((node) => node.type === 'start') 
		onNode(walk(startNode))
	}

	useEffect(getCurrentNode, [nodeMap, edgeMap])

	return (
		<div>
			<h1>Reader</h1>
			{/* <p>story: {story?.title}</p>
			<p>node: {currentNode?.type}</p> */}
			{ story && currentNode?.type === 'text' && (
			<>
				<h2>{currentNode.title}</h2>
				<p>{currentNode.text}</p>
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