import Task from "../Model/taskModel.js";
import weatherAPi from "../utils/weatherApi.js";

export const createTask = async (req, res) => {
  try {
    const { title, location } = req.body;
    const taskExist = await Task.findOne({ title });
    if (taskExist) {
      res.status(400).json({
        success: false,
        message: "task already Exist",
      });
    }

    // Integrating weatherApi
    const weather = await weatherAPi(location);
    req.body.climateDescription = weather.climateDescription;
    req.body.temperature = weather.temperature;

    const task = await Task.create(req.body);
    if (task) {
      res.status(200).json({
        success: true,
        task,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const pageSize = 2;
    const page = Number(req.query.pageNumber || 1);
    let keyword = {};
    if (req.query.keyword) {
      keyword.title = { $regex: req.query.keyword, $options: "i" };
    }

    // Check if a keyword for description search is provided
    if (req.query.descriptionKeyword) {
      keyword.description = {
        $regex: req.query.descriptionKeyword,
        $options: "i",
      };
    }
    const count = await Task.countDocuments({ ...keyword });
    const sort = req.query.sort || "-updatedAt";
    const task = await Task.find({ ...keyword })
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.status(200).json({
      success: true,
      task,
      totalPages: Math.ceil(count / pageSize),
      //   climateDescription: climateDescription,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { location } = req.body;
    const task = await Task.findById(req.params.id);
    // Integrating weatherApi
    const weather = await weatherAPi(location);
    req.body.climateDescription = weather.climateDescription;
    req.body.temperature = weather.temperature;
    if (task) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.status = req.body.status || task.status;
      task.location = req.body.location || task.location;
      task.climateDescription =
        req.body.climateDescription || task.climateDescription;
      task.temperature = req.body.temperature || task.temperature;
    }

    const updateTask = await task.save();
    res.status(200).json({
      success: true,
      updateTask,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const users = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
