import axios from "axios";

const API = axios.create({

  baseURL: "http://localhost:3000/api/task", 
  
});

// Get tasks
export const getTasks = () => API.get("/");

// Create task
export const createTask = (task) => API.post("/", task);

// Update task
export const updateTask = (id, updates) => API.put(`/${id}`, updates);


// Delete task
export const deleteTask = (id) => API.delete(`/${id}`);
