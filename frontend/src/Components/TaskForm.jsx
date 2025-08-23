import { useState } from "react";

export default function TaskForm({ onCreate,setAdd }) {
  const [form, setForm] = useState({ title: "", description: "", status: "To Do" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    await onCreate(form);
    setForm({ title: "", description: "", status: "To Do" });
    setAdd(0);
    setError(""); 
  };

  return (
    <div className="absolute h-full w-full z-20 backdrop-blur-lg">
    <div className="h-[80%] w-[100%] border-slate-200 flex  items-center justify-center ">
      <div className="flex-col  ">
      <div className="justify-end h-10 flex ">

      <button className="bg-slate-700 h-10 w-16  text-white hover:cursor-pointer mx-2 px-3 py-1 rounded-md" onClick={()=>setAdd(0)}>X</button>

      </div>
      <form onSubmit={handleSubmit} className="m-2  h-[55%]  bg-slate-200 rounded-sm p-4 mb-4">
        
        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
          className="w-full bg-white  p-2 rounded-sm"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full bg-white h-40  p-2 rounded mt-2"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full bg-white p-2 rounded mt-2"
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
          Add Task
        </button>
      </form>
</div>
    </div></div>
  );
}
