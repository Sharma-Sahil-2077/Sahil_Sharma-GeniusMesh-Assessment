const Task = require("../model/Task");

const getTasks = async (req, res) => {

  try {

    const { status } = req.query;
    let filter = {};
    if (status) 
        filter.status = status;

    const tasks = await Task.find(filter);
    res.json(tasks);

  } catch (err) 
  {
    res.status(500).json({ error: "Failed to get tasks" });
  }

};

module.exports = getTasks;
