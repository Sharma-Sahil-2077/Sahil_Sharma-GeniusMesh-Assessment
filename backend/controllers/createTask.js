const Task = require("../model/Task");

const createTask = async (req, res) => {
     
  try {
    console.log(req.body);
    const { title, description, status } = req.body;
    console.log({'title :': title, 'decription :': description, 'status :': status});
    if (!title) {
      return res.status(400).json({ error: "Title required" });
    }

    const task = new Task({ title, description, status });
    const savedTask = await task.save();
    res.status(201).json(savedTask);

  } catch (err) {
    res.status(500).json({ error: "Task was not created."  });
  }

};

module.exports = createTask;
