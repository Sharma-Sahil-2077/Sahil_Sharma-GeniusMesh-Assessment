const Task = require("../model/Task");

const updateTask = async (req, res) => {

  try {

    const { title, description, status } = req.body; 
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: "No matching Task found" });
    res.json(task);

  } catch (err) {
    res.status(500).json({ error: "Task update failed" });
  }
};

module.exports = updateTask;