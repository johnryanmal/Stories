import React, { useState, useEffect } from "react";
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

export function Graph(props) {
  const [ nodes, setNodes ] = useState(props.nodes ?? [])
  const [ edges, setEdges ] = useState(props.edges ?? [])
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

  // const onSelectNode = node => {
  //   console.log('onselectnode')
  //   const selected = state.selected;
  //   console.log("select node", node);
  //   console.log(state);
  //   if (node && (!selected || selected.id !== node.id)) {
  //     setState({
  //       selected: node
  //     });
  //   } else if (!node && selected) {
  //     setState({
  //       selected: null
  //     });
  //   }
  // };

  // onSelectEdge = () => {
  //   console.log('onselectedge')
  //   console.log("select edge");
  // };

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

  const getNodeIndex = (searchNode) => {
    console.log("getNodeIndex")
    //return state.graph.nodes.findIndex(node => node.id === searchNode.id);
  }

  // Helper to find the index of a given edge
  const getEdgeIndex = (searchEdge) => {
    console.log("getEdgeIndex")
    // return state.graph.edges.findIndex(edge => {
    //   return (
    //     edge.source === searchEdge.source && edge.target === searchEdge.target
    //   );
    // });
  }

  const updateSelectedNodeTitle = e => {
    // const graph = state.graph;
    // const selected = state.selected;

    // const title = e.target.value;
    // selected.title = title;

    // const i = getNodeIndex(selected);
    // graph.nodes[i].title = title;

    // setState({
    //   graph,
    //   selected
    // });
  };

  const updateSelectedNodeType = e => {
    // const graph = state.graph;
    // const selected = state.selected;

    // const type = e.target.value;

    // if (type in TYPES) {
    //   selected.type = type;

    //   const i = getNodeIndex(selected);
    //   graph.nodes[i].type = type;

    //   setState({
    //     graph,
    //     selected
    //   });
    // }
  };

  // const getStory = () => {
  //   axios.get("http://localhost:3000/stories/1")
  //   .then(res => {
  //     let story = res.data?.story
  //     if (story) {
  //       setGraph(story.graph)
  //     }
  //   }).catch(err => {
  //     console.error(err)
  //   })
  // }

  // useEffect(getStory, [])

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
      {selected && (
        <div>
          <h4>Update a node</h4>
          <input
            type="text"
            value={selected.title}
            onChange={updateSelectedNodeTitle}
          />
        </div>
      )}
    </div>
  );
}
