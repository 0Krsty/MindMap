import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const MindMap = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);

  const addNode = () => {
    const newNode = { id: uuidv4(), text: 'New Node', position: { x: 100, y: 100 } };
    setNodes([...nodes, newNode]);
  };

  const updateNode = (id, newText) => {
    const updatedNodes = nodes.map(node => {
      if (node.id === id) {
        return { ...node, text: newText };
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  const addConnection = (startNodeId, endNodeId) => {
    const newConnection = { id: uuidv4(), startNodeId, endNodeId };
    setConnections([...connections, newConnection]);
  };

  const updateConnection = (connectionId, newStartNodeId, newEndNodeId) => {
    const updatedConnections = connections.map(connection => {
      if (connection.id === connectionId) {
        return { ...connection, startNodeId: newStartNodeId, endNodeId: newEndNodeId };
      }
      return connection;
    });
    setConnections(updatedConnections);
  };

  const deleteNode = (nodeId) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    setConnections(connections.filter(connection => connection.startNodeId !== nodeId && connection.endNodeId !== nodeId));
  };

  const deleteConnection = (connectionId) => {
    setConnections(connections.filter(connection => connection.id !== connectionId));
  };

  const [textColor, setTextColor] = useState('#000');

  const changeTextColor = (color) => {
    setTextColor(color);
  };

  return (
    <div>
      <button onClick={addNode}>Add Node</button>
      <input type="color" onChange={(e) => changeTextColor(e.target.value)} value={textColor} />
      <div>
        {nodes.map(node => (
          <div key={node.id} style={{ position: 'absolute', top: node.position.y, left: node.position.x, color: textColor }}>
            <input
              type="text"
              value={node.text}
              onChange={(e) => updateNode(node.id, e.target.value)}
            />
            <button onClick={() => deleteNode(node.id)}>Delete Node</button>
          </div>
        ))}
      </div>
      <div>
        {connections.map(connection => (
          <div key={connection.id}>
            Connection from {connection.startNodeId} to {connection.endNodeId}
            <button onClick={() => deleteConnection(connection.id)}>Delete Connection</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MindMap;