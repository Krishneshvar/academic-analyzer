import axios from "axios";

// API instance pointing to your server's base URL
const API = axios.create({
  baseURL: "https://localhost:3000",  // Make sure this is the correct server URL
});

// Function to execute the code and send the dataset
export default async function executeCode(code, dataset) {
  const formData = new FormData();

  // Append the code and dataset to FormData
  formData.append("code", code);
  formData.append("dataset", dataset);

  try {
    const response = await API.post("/execute", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // To handle file uploads
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error executing code:", error);
    throw error;
  }
}
