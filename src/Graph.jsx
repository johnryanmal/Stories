import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { GraphView } from "react-digraph";

const nodeTypes = {
  text: {
    // required to show empty nodes
    typeText: "Text",
    shapeId: "#text", // relates to the type property of a node
    shape: (
      <symbol viewBox="0 0 100 100" id="text" key="0">
        <circle cx="50" cy="50" r="45" />
      </symbol>
    )
  },
  button: {
    // required to show empty nodes
    typeText: "Button",
    shapeId: "#button", // relates to the type property of a node
    shape: (
      <symbol viewBox="0 0 100 100" id="button" key="0">
        <circle cx="50" cy="50" r="45" />
      </symbol>
    )
  },
  chat: {
    // required to show empty nodes
    typeText: "Chat",
    shapeId: "#chat", // relates to the type property of a node
    shape: (
      <symbol viewBox="0 0 100 100" id="chat" key="0">
        <circle cx="50" cy="50" r="45" />
      </symbol>
    )
  }
};

const nodeSubtypes = {};

const edgeTypes = {
  emptyEdge: {
    // required to show empty edges
    shapeId: "#emptyEdge",
    // edge type could be "wait" or "delay" and
    // the target node's wait time could be displayed in the edge (in the arrow)
    shape: <span id="emptyEdge" />
    /*shape: (
      <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
        <circle cx="25" cy="25" r="8" fill="currentColor">
          {" "}
        </circle>
      </symbol>
    )*/
  }
};

export function Graph() {
  const params = useParams()
  const [ nodes, setNodes ] = useState([])
  const [ edges, setEdges ] = useState([])
  const [ selected, setSelected ] = useState({})

  const onCreateNode = (x, y) => {
    let node = {
      id: uuid(),
      title: "Title",
      x,
      y,
      type: "text"
    };
    console.log("create", node);
    setNodes([...nodes, node])
  };

  const onCreateEdge = (source, target) => {
    if (source.id !== target.id) {
      const edge = {
        id: `${source.id}_${target.id}`,
        source: source.id,
        target: target.id,
        type: "emptyEdge"
      };
      console.log("create edge", edge)
      setEdges([...edges, edge])
    }
  };

  const onSelect = (selected) => {
    console.log('select', selected)
    setSelected(selected)
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
  };

  const onSwapEdge = () => {
    console.log("swap edge");
  };

  const url = `http://localhost:3000/stories/${params.id}`

  const getStory = () => {
    axios.get(url)
    .then(res => {
      let graph = res.data?.story?.graph
      console.log('getStory', graph)
      if (graph) {
        setNodes(graph.nodes ?? [])
        setEdges(graph.edges ?? [])
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

  return (
    <div>
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
      <button onClick={updateStory}>Save</button>
    </div>
  );
}
