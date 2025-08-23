import "./index.css";
import React , { useState ,Suspense,} from "react";
import { createTask, deleteTask, getTasks, updateTask } from "./Api/Task";
// import TaskForm from "./Components/TaskForm";
import { useEffect } from "react";


function App() {


  const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState(0)
  const [color, setColor] = useState('bg-sky-100');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", status: "" });
  const [confirmDelete, setConformDelete] = useState(0);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [batchDeleteMode, setBatchDeleteMode] = useState(false);

const TaskForm = React.lazy(() => import("./Components/TaskForm"));

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

  const handleEdit = (task) => {
    setConformDelete(0);

    setEditingTaskId(task._id);
    setEditForm({ title: task.title, description: task.description, status: task.status });
  }

  const handleupdate = async (taskId) => {
    try {
      const { data } = await updateTask(taskId, editForm);
      setTasks(tasks.map((t) => (t._id === taskId ? data : t)));
      setEditingTaskId(null);
    }
    catch (err) {
      console.error("Error updating task:", err);
    }
  }

  const handleCancel = () => {
    setEditingTaskId(null);
  };

  const handleDelete = async (taskId) => {
    try {

      if (confirmDelete === 1) {
        const result = await deleteTask(taskId)
        setEditingTaskId(null);
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        setConformDelete(0);
      };

    }
    catch (err) {
      console.error("Error Deleting tasks:", err);
    }

  };

  const toggleSelectTask = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const handleBatchDelete = async () => {
    
    try {

      await Promise.all(selectedTasks.map((id) => deleteTask(id)));


      setTasks((prev) => prev.filter((task) => !selectedTasks.includes(task._id)));


      setSelectedTasks([]);
    } catch (err) {
      console.error("Error deleting tasks:", err);
    }
  };

  return (


    <div className="flex-col h-screen w-screen overflow-x-hidden overflow-y-auto bg-stone-100 p-4">


      {/* Form */}
      {add === 1 && (
  <Suspense
    fallback={
      <div className="flex justify-center items-center text-3xl font-light h-full z-20 w-full backdrop-blur-xl">
        Loading form...
      </div>
    }
  >
    <TaskForm
      className="w-full h-full border-slate-400 absolute top-10 left-20"
      onCreate={handleCreate}
      setAdd={setAdd}
    />
  </Suspense>
)}


      <div className={`mt-1 flex-col w-[90%] mx-20  `}>
        <div className="flex w-full">

          <h1 className="text-[50px] flex font-light text-slate-800 mb-4">Task Manager</h1>
        </div>

        <div className={`${editingTaskId ? "blur-md pointer-events-none" : ""} flex w-full justify-between m-2`}>
          <h2 className="text-3xl  font-medium text-slate-800 mb-2">Tasks</h2>

          {/* Add New Task and Batch Delete Button  */}
          
          <div className="flex">

          {batchDeleteMode  &&( <button onClick={()=> setBatchDeleteMode(false)}
            className=" px-4 py-2 bg-red-500 h-10 text-white rounded cursor-pointer   " 
          >Cancel </button>)}

          <button onClick={()=> {
            if (batchDeleteMode) {handleBatchDelete();} 
            else {setBatchDeleteMode(true);}
          }}   

          className=" px-4 py-2 bg-red-500 h-10 text-white rounded ml-2 cursor-pointer " >
                {batchDeleteMode
    ? `Delete Selected (${selectedTasks.length})`
    : "Batch Delete"}
              </button>

          <button onClick={() => setAdd(1) && console.log('add')} 
          className="bg-blue-400 text-white hover:cursor-pointer mx-2 p-2 h-10 rounded-md">
            + Add New Task</button>
</div>
        </div>

        <ul className="space-y-2">
          <div className={`${editingTaskId ? "blur-md pointer-events-none" : ""} flex p-3 bg-white `}>
            <span className="text-xl font-bold mx-2  min-w-[30%]">Title </span>
            <span className="text-xl font-bold text-gray-900 mx-2 min-w-[60%]">Description</span>
            <span className="text-xl font-bold text-gray-900 mx-2 min-w-[10%]">Status</span>
          </div>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet</p>
          ) : (

            tasks.map((task) => {
              //  Determine background color based on status
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
                  className={`group  ${bgColor}  rounded p-3 flex relative items-center`}
                >
                  {/* Edit Task View  */}
                  {editingTaskId === task._id ? (
                    <>
                      <input
                        className="mx-2 border h-9 min-w-[30%]"
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.taget.value })}
                      />

                      <input
                        type="text"
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="border p-1 mx-2 min-w-[50%]"
                      />

                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                        className="border p-1 mx-2 min-w-[10%]"
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>

                      {/* Delete logic  */}
                      {confirmDelete !== 1 ? (
                        <div className="-mt-20 w-full">

                          {/* update Buttom */}
                          <button
                            onClick={() => handleupdate(task._id)}
                            className="-ml-40 px-3 py-1 bg-green-500 text-white rounded"
                          >
                            Update
                          </button>

                          {/* Cancel edit Buttom */}
                          <button
                            onClick={() => handleCancel()}
                            className="ml-2 px-3 py-1 bg-gray-500 text-white rounded"
                          >
                            Cancel
                          </button>

                          {/* Delete Task Button  */}
                          <button
                            onClick={() => setConformDelete(1)}
                            className="ml-2 px-3 py-1 bg-gray-500 text-white rounded"
                          >
                            Delete
                          </button>
                        </div>
                        
                      ) : (

                        // Conform Delete Button 
                        <div className="flex -ml-40 -mt-20">
                          <button
                            onClick={() => handleDelete(task._id)}
                            className=" px-3 py-1  bg-gray-500 text-white  rounded cursor-pointer"
                          >
                            Confirm Delete
                          </button>
                          <button
                            onClick={() => handleCancel()}
                            className=" ml-4 px-3 py-1 bg-gray-500 text-white rounded cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      )}

                    </>


                  ) : (

                    
                   <div className={`${editingTaskId ? "blur-md pointer-events-none" : ""} w-full flex `}>

                      {/* Default Task View  */}

                      {/* checkBox  */}

                      

                      <span className="font-medium mx-2 min-w-[30%]">{task.title}</span>
                      <span className="text-md text-gray-900 mx-2 min-w-[58%]">{task.description}</span>
                      <span className="text-lg text-gray-900 mx-2 min-w-[22%]">{task.status}</span>

                      {/* Edit button */}

                      
                      {!batchDeleteMode && (
                      <button
                        onClick={() => handleEdit(task)}
                        className="absolute cursor-pointer -right-16 px-3 py-1 bg-sky-500 text-white rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        Edit
                      </button>)}


                    </div>  
                  )}{batchDeleteMode && (<input
                        type="checkbox"
                        checked={selectedTasks.includes(task._id)}
                        onChange={() => toggleSelectTask(task._id)}
                        className="mr-3 cursor-pointer bg-slate-300"
                      />)}


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
