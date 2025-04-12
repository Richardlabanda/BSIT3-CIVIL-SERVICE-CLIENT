// uikit-api.ts

import axios from 'axios';

// Utility function to get user data from local storage
export const lsGetUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

// Utility function to fetch random exercises based on group_refid
export const fetchRandomExcercises = async (params: { group_refid: string; limit: number }) => {
  try {
    const response = await axios.get(`/api/fetchRandomExercises`, {
      params: {
        group_refid: params.group_refid,
        limit: params.limit
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching random exercises:', error);
    return [];
  }
};

// Utility function to query an endpoint (GET request)
export const queryURL = async (options: { url: string; params?: object }) => {
  try {
    const response = await axios.get(options.url, {
      params: options.params
    });
    return response.data;
  } catch (error) {
    console.error(`Error querying URL: ${options.url}`, error);
    return null;
  }
};

// Example of a utility function for logging
export const printDevLog = (message: string, data: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, data);
  }
};

// Example of a function to generate random numbers (for resetting the exam, as in your code)
export const randomNumbers = () => {
  return Math.floor(Math.random() * 1000); // Simple random number generator for reset
};

// Add any other utility functions as needed

