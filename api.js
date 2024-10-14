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
    handleAxiosError(error, 'saving mind map');
    throw error;
  }
}

async function loadMindMap(mindMapId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/mindmaps/${mindMapId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'loading mind map');
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
    handleAxiosError(error, 'starting collaboration');
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
    handleAxiosError(error, 'stopping collaboration');
    throw error;
  }
}

function handleAxiosError(error, processName) {
    if (error.response) {
        console.error(`Error ${processName}: Server responded with status code ${error.response.status}`);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
    } else if (error.request) {
        console.error(`Error ${processName}: No response received`);
        console.error('Request:', error.request);
    } else {
        console.error(`Error ${processName}: Request setup failed`, error.message);
    }
    console.error('Error config:', error.config);
}

function logDetailedError(error) {
  console.error('Detailed error info:', JSON.stringify(error, null, 2));
}

async function axiosCallWrapper(method, url, data = {}, config = {}) {
  try {
    return await axios[method](url, data, config);
  } catch (error) {
    logDetailedError(error); 
    throw error; 
  }
}

async function saveMindMapEnhanced(mindMapData) {
  try {
    const response = await axiosCallWrapper('post', `${API_BASE_URL}/mindmaps`, mindMapData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'saving mind map');
    throw error;
  }
}

export { saveMindMap, loadMindMap, startCollaboration, stopCollaboration, saveMindMapEnhanced };