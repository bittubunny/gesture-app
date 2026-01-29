import axios from "axios";

// ✅ Use environment variable VITE_API_URL or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

export const captureHandSign = (userId, landmarks, label) => {
  return api.post("/capture", { user_id: userId, landmarks, label });
};

export const trainHandSignModel = (userId) => {
  return api.post("/train", { user_id: userId });
};

export const predictHandSign = (userId, landmarks) => {
  return api.post("/predict", { user_id: userId, landmarks });
};
