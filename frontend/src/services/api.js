import axios from "axios";

// 🔁 Use Render backend in production, localhost in development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";

const api = axios.create({
  baseURL: API_URL,
});

// Helper to validate landmarks
const validateLandmarks = (landmarks, numLandmarks = 21) => {
  if (!landmarks || !Array.isArray(landmarks)) return false;
  return landmarks.length === numLandmarks * 3;
};

// ================= API FUNCTIONS =================

export const captureHandSign = async (userId, landmarks, label) => {
  if (!userId || !label || !validateLandmarks(landmarks)) {
    console.warn(
      "captureHandSign skipped: Missing userId, label, or invalid landmarks",
      { userId, label, landmarks }
    );
    return { status: "error", msg: "Invalid capture data" };
  }

  try {
    const res = await api.post("/capture", { user_id: userId, landmarks, label });
    return res.data;
  } catch (err) {
    console.error("captureHandSign error:", err.response?.data || err.message);
    return { status: "error", msg: "API request failed" };
  }
};

export const trainHandSignModel = async (userId) => {
  if (!userId) {
    console.warn("trainHandSignModel skipped: Missing userId");
    return { status: "error", msg: "Missing userId" };
  }

  try {
    const res = await api.post("/train", { user_id: userId });
    return res.data;
  } catch (err) {
    console.error("trainHandSignModel error:", err.response?.data || err.message);
    return { status: "error", msg: "API request failed" };
  }
};

export const predictHandSign = async (userId, landmarks) => {
  if (!userId || !validateLandmarks(landmarks)) {
    console.warn(
      "predictHandSign skipped: Missing userId or invalid landmarks",
      { userId, landmarks }
    );
    return { status: "error", msg: "Invalid prediction data" };
  }

  try {
    const res = await api.post("/predict", { user_id: userId, landmarks });
    return res.data;
  } catch (err) {
    console.error("predictHandSign error:", err.response?.data || err.message);
    return { status: "error", msg: "API request failed" };
  }
};
