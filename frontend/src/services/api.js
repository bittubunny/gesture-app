import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";

export const captureHandSign = async (userId, landmarks, label) => {
  if (!userId || !label || !landmarks || landmarks.length === 0) {
    throw new Error("Missing userId, label, or landmarks");
  }

  return axios.post(`${API_URL}/capture`, {
    user_id: userId,
    landmarks: landmarks,
    label: label,
  });
};

export const trainHandSignModel = async (userId) => {
  if (!userId) throw new Error("Missing userId");
  return axios.post(`${API_URL}/train`, { user_id: userId });
};

export const predictHandSign = async (userId, landmarks) => {
  if (!userId || !landmarks || landmarks.length === 0) {
    throw new Error("Missing userId or landmarks");
  }

  return axios.post(`${API_URL}/predict`, {
    user_id: userId,
    landmarks: landmarks,
  });
};
