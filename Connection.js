import React, { useState, useEffect } from 'react';
import MindMapConnection from './MindMapConnection'; // Assuming this is the path to your component
import axios from 'axios';

const MindMapContainer = () => {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        // Function to check and fetch nodes
        const initNodes = async () => {
            // Attempt to retrieve from local storage first
            const cachedNodes = localStorage.getItem('nodes');
            if (cachedNodes) {
                setNodes(JSON.parse(cachedNodes));
            } else {
                await fetchNodesData();
            }
        };

        // Initialize nodes on component mount
        initNodes();
    }, []);

    const fetchNodesData = async () => {
        try {
            const response = await axios.get('https://yourapi.com/nodes');
            const nodesData = response.data;
            setNodes(nodesData);
            localStorage.setItem('nodes', JSON.stringify(nodesData));
        } catch (error) {
            console.error("Error fetching nodes data:", error);
        }
    };

    return <MindMapConnection nodes={nodes} />;
};

export default MindMapContainer;