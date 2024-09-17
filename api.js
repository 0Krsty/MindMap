import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const API_BASE_URL = process.env.API_BASE_URL;
async function saveMindMap(mindMapData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/mindmaps`, mindMapData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving mind map:', error);
    throw error;
  }
}
async function loadMindMap(mindMapId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/mindmaps/${mindMapId}`);
    return response.data;
  } catch (error) {
    console.error('Error loading mind map:', error);
    throw error;
  }
}
async function startCollaboration(mindMapId) {
  try {
    const response = await axios.post(`${API_BASE_URL}/collaborate/start`, { mindMapId }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error starting collaboration:', error);
    throw error;
  }
}
async function stopCollaboration(sessionId) {
  try {
    const response = await axios.post(`${API_BASE_URL}/collaborate/stop`, { sessionId }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error stopping collaboration:', error);
    throw error;
  }
}
export { saveMindMap, loadMindMap, startCollaboration, stopCollaboration };