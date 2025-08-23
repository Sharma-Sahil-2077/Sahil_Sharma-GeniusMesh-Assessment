import "./index.css";
import { useState} from "react";
import {createTask,getTasks} from "./Api/Task";
import TaskForm from "./Components/TaskForm";
import { useEffect } from "react";



function App() {

 
  const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState(0)
  const [color, setColor] = useState('bg-sky-100');

  useEffect(() => {

    const fetchTasks = async () => {

      try {
        const res = await getTasks()
        console.log(res.data)
        setTasks(res.data);

      } 
      catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);


  const handleCreate = async (task) => {

    const { data } = await createTask(task);
    setTasks([...tasks, data]);

  };


  return (

    <div className="flex-col h-screen w-screen justify-center bg-fuchsia-100 p-4">
<div className="flex w-full">
      <h1 className="text-2xl flex font-light text-slate-800 mb-4">Task Manager</h1>
</div>


       <div className="mt-6 flex-col w-[90%] mx-20 ">
        <div className="flex w-full justify-between m-2">
        <h2 className="text-3xl  font-medium text-slate-800 mb-2">Tasks</h2>
<button onClick={()=>setAdd(1)} className="bg-blue-400 text-white hover:cursor-pointer mx-2 p-2 rounded-md">+ Add New Task</button>
</div>
        <ul className="space-y-2">
           <div className="flex p-3 bg-white ">
                <span className="text-xl font-bold mx-2  min-w-[30%]">Title </span>
                <span className="text-xl font-bold text-gray-900 mx-2 min-w-[50%]">Description</span>
                <span className="text-xl font-bold text-gray-900 mx-2 min-w-[20%]">Status</span>
</div>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet</p>
          ) : (
         
             tasks.map((task) => {
              // Determine background color based on status
              let bgColor = "";
              switch (task.status) {
                case "To Do":
                  bgColor = "bg-red-100";
                  break;
                case "In Progress":
                  bgColor = "bg-yellow-100";
                  break;
                case "Done":
                  bgColor = "bg-green-100";
                  break;
                default:
                  bgColor = "bg-gray-100";
              }

              return (
                <li
                  key={task._id}
                  className={`group  ${bgColor} rounded p-3 flex relative items-center`}
                >
                  <span className="font-medium mx-2 min-w-[30%]">{task.title}</span>
                  <span className="text-md text-gray-900 mx-2 min-w-[50%]">{task.description}</span>
                  <span className="text-lg text-gray-900 mx-2 min-w-[20%]">{task.status}</span>

                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>

  );
}

export default App;
