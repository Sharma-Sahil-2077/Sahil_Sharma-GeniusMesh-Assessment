const Task = require("../model/Task");

const deleteTask = async (req, res) => {

  try {

    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });

  } 
  catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }

};

module.exports = deleteTask;
