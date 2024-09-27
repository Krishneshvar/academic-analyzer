import axios from "axios"

const API = axios.create({
    baseURL: "https://localhost:3000"
})

export default async function executeCode(code) {
    const response = await API.post("/execute", {
        "language": "py",
        "version": "3.10.0",
        "files": [
            {
                "content": code
            }
        ],
    });
    return response.data;
}
