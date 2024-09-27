import axios from "axios"

const API = axios.create({
    baseURL: "http://localhost:3000"
})

export default async function getCode(code) {
    const response = await API.get("/execute", {
        "files": [
            {
                "content": code
            }
        ],
    });
}
