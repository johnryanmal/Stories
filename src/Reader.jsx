import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
			case 'router':
				return edges[0]?.target
			case 'random':
			{
				let weights = edges.map(edge => edge.handleText ? parseInt(edge.handleText) : 0)
				let total = weights.reduce((a, b) => a + b)
				let pick = 0
				let select = Math.floor((Math.random() * total)) + 1
				for (const [ index, weight ] of weights.entries()) {
					select -= weight
					if (select <= 0) {
						pick = index
						break
					}
				}
				return edges[pick]?.target
			}
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
		//console.log('option', option)
		let nextNode = nodeMap[option.target]
		onNode(walk(nextNode))
	}

  const getStory = () => {
    axios.get(`http://localhost:3000/stories/${params.id}`)
    .then(res => {
      let story = res.data?.story
      //console.log('getStory', story)
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
		//console.log('getCurrentNode', nodeMap)
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
				<ReactMarkdown children={currentNode.text} remarkPlugins={[remarkGfm]} />
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