import React, { useState, useEffect } from 'react';
import MindMapConnection from './MindMapConnection'; // Assuming this is the path to your component
import axios from 'axios';

const MindMapContainer = () => {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        // Check if nodes are in local storage or some cache mechanism
        const cachedNodes = localStorage.getItem('nodes');
        if (cachedNodes) {
            setNodes(JSON.parse(cachedNodes));
        } else {
            fetchNodesData();
        }
    }, []);

    const fetchNodesData = async () => {
        try {
            // Example API call
            const response = await axios.get('https://yourapi.com/nodes');
            setNodes(response.data);
            // Cache the nodes data in local storage or preferred cache
            localStorage.setItem('nodes', JSON.stringify(response.data));
        } catch (error) {
            console.error("Error fetching nodes data:", error);
        }
    };

    return <MindMapConnection nodes={nodes} />;
};
export default MindMapContainer;