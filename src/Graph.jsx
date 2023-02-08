import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { GraphView } from "react-digraph";

const nodeTypes = {
  text: {
    typeText: "Text",
    shapeId: "#text",
    shape: (
      <symbol viewBox="0 0 100 100" id="text" key="0">
        <circle cx="50" cy="50" r="45" />
      </symbol>
    )
  }
};

const nodeSubtypes = {};

const edgeTypes = {
  emptyEdge: {
    shapeId: "#option",
    shape: <span />
  }
};

export function Graph() {
  const params = useParams()
  const [ story, setStory ] = useState(null)
  const [ nodes, setNodes ] = useState([])
  const [ edges, setEdges ] = useState([])
  const [ selected, setSelected ] = useState({})
  const [ selectedNode, setSelectedNode ] = useState(null)
  const [ selectedEdge, setSelectedEdge ] = useState(null)

  const onCreateNode = (x, y) => {
    let node = {
      id: uuid(),
      x,
      y,
      type: "text",
      title: "Untitled",
      text: ""
    }
    console.log("create", node)
    setNodes([...nodes, node])
  };

  const onCreateEdge = (source, target) => {
    if (source.id !== target.id) {
      const edge = {
        id: `${source.id}_${target.id}`,
        source: source.id,
        target: target.id,
        type: "option",
        handleText: ""
      };
      console.log("create edge", edge)
      setEdges([...edges, edge])
    }
  };

  const onSelect = (selected) => {
    console.log('select', selected)

    const nodeCount = selected.nodes?.size || 0
    const edgeCount = selected.edges?.size || 0

    let selectedNode = null
    let selectedEdge = null

    if (nodeCount === 1 && edgeCount === 0) {
      selectedNode = selected.nodes.values().next().value
    } else if (nodeCount === 0 && edgeCount === 1) {
      selectedEdge = selected.edges.values().next().value
    }

    setSelected(selected)
    setSelectedNode(selectedNode)
    setSelectedEdge(selectedEdge)
  }
  
  const canDeleteSelected = (selected) => true

  const onDeleteSelected = (selected) => {
    console.log('delete', selected)
    setNodes(nodes.filter(node => !selected.nodes?.has(node.id)))
    setEdges(edges.filter(edge => !selected.edges?.has(edge.id)))
  }

  const onUpdateNode = (newNode) => {
    console.log("update node", newNode);

    setNodes(nodes.map((node) => {
      if (node.id === newNode.id) {
        return newNode
      } else {
        return node
      }
    }))
  }

  const onUpdateEdge = (newEdge) => {
    console.log("update edge", newEdge);

    setEdges(edges.map((edge) => {
      if (edge.id === newEdge.id) {
        return newEdge
      } else {
        return edge
      }
    }))
  }

  const onSwapEdge = () => {
    console.log("swap edge");
  }

  const onSaveNode = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const nodeParams = Object.fromEntries(formData.entries())
    const newNode = {...selectedNode, ...nodeParams}
    onUpdateNode(newNode)
  }

  const onSaveEdge = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const edgeParams = Object.fromEntries(formData.entries())
    const newEdge = {...selectedEdge, ...edgeParams}
    onUpdateEdge(newEdge)
  }

  const url = `http://localhost:3000/stories/${params.id}`

  const getStory = () => {
    axios.get(url)
    .then(res => {
      let story = res.data?.story
      console.log('getStory', story)
      if (story) {
        setStory(story)
        setNodes(story.graph?.nodes ?? [])
        setEdges(story.graph?.edges ?? [])
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  useEffect(getStory, [])

  const updateStory = () => {
    const graph = { nodes, edges }
    const updateParams = {
      graph
    }
    console.log('updateParams', updateParams)
    axios.patch(url, updateParams)
    .then(res => {
      console.log('updateStory', res)
    })
    .catch(err => {
      console.error(err)
    })
  }

  const deleteStory = () => {
    if (confirm(`Are you sure you want to delete "${story.title}"?`)) {
      axios.delete(url)
      .then(res => {
        window.location.href = '/stories/user'
      })
      .catch(err => {
        console.error(err)
      })
    }
  }

  return (
    <>
      { story && (
      <>
        <div>
          <p>Shift+click creates a new node</p>
          <p>Shift+click a node and drag to another node creates an edge</p>
          <p>Click a node and pressing delete deletes the node and its edges</p>
          <p>Node text and type can be changed after selecting a node by clicking it</p>
        </div>
        <div id="graph">
          <GraphView
            nodeKey="id"
            edgeKey="id"
            nodes={nodes}
            edges={edges}
            selected={selected}
            nodeTypes={nodeTypes}
            nodeSubtypes={nodeSubtypes}
            edgeTypes={edgeTypes}

            onCreateNode={onCreateNode}
            onCreateEdge={onCreateEdge}
            onSelect={onSelect}
            canDeleteSelected={canDeleteSelected}
            onDeleteSelected={onDeleteSelected}
            onUpdateNode={onUpdateNode}
            onSwapEdge={onSwapEdge}
          />
        </div>
        { selectedNode && (
        <>
          <h2>Node</h2>
          {/* <p>{JSON.stringify(selectedNode)} </p> */}
          <form onSubmit={onSaveNode}>
            <div>Title: <input type="text" name="title" defaultValue={selectedNode.title ?? ''} /></div>
            <div>Text: <textarea name="text" defaultValue={selectedNode.text ?? ''} /></div>
            <button type="submit">Save Node</button>
          </form>
        </>
        ) || selectedEdge && (
        <>
          <h2>Edge</h2>
          {/* <p>{JSON.stringify(selectedEdge)} </p> */}
          <form onSubmit={onSaveEdge}>
            <div>Text: <input type="text" name="handleText" defaultValue={selectedEdge.handleText ?? ''} /></div>
            <button type="submit">Save Edge</button>
          </form>
        </>
        ) || (
          <p>Nothing selected.</p>
        )}
        <hr />
        <button onClick={updateStory}>Save Story</button>
        <button onClick={deleteStory}>Delete Story</button>
      </>
      ) || (
      <>
        <p>Story not found.</p>
      </>
      )}
    </>
  );
}
