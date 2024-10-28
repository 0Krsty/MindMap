import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.API_BASE_URL;

async function uploadMindMap(mindMapData) {
  try {
    const response = await axios.post(`${BASE_URL}/mindmaps`, mindMapData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    processAxiosError(error, 'uploading mind map');
    throw error;
  }
}

async function fetchMindMap(mindMapId) {
  try {
    const response = await axios.get(`${BASE_URL}/mindmaps/${mindMapId}`);
    return response.data;
  } catch (error) {
    processAxiosError(error, 'fetching mind map');
    throw error;
  }
}

async function initiateCollaboration(mindMapId) {
  try {
    const response = await axios.post(`${BASE_URL}/collaborate/start`, { mindMapId }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    processAxiosError(error, 'initiating collaboration');
    throw error;
  }
}

async function endCollaboration(sessionId) {
  try {
    const response = await axios.post(`${BASE_URL}/collaborate/stop`, { sessionId }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    processAxiosError(error, 'ending collaboration');
    throw error;
  }
}

function processAxiosError(error, processName) {
    if (error.response) {
        console.error(`Error during ${processName}: Server responded with status code ${error.response.status}`);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
    } else if (error.request) {
        console.error(`Error during ${processName}: No response received`);
        console.error('Request details:', error.request);
    } else {
        console.error(`Error during ${processName}: Request setup failed`, error.message);
    }
    console.error('Error configuration:', error.config);
}

function logErrorDetails(error) {
  console.error('Detailed error information:', JSON.stringify(error, null, 2));
}

async function performAxiosRequest(method, url, data = {}, config = {}) {
  try {
    return await axios[method](url, data, config);
  } catch (error) {
    logErrorDetails(error); 
    throw error; 
  }
}

async function uploadMindMapEnhanced(mindMapData) {
  try {
    const response = await performAxiosRequest('post', `${BASE_URL}/mindmaps`, mindMapData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    processAxiosError(error, 'uploading enhanced mind map');
    throw error;
  }
}

export { uploadMindMap as saveMindMap, fetchMindMap as loadMindMap, initiateCollaboration as startCollaboration, endCollaboration as stopCollaboration, uploadMindMapEnhanced as saveMindMapEnhanced };