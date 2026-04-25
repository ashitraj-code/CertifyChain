// Fallback to localhost if environment variable is not defined
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default API_BASE;
