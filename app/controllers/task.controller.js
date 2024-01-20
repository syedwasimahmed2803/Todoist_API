const db = require("../models");
const Task = db.task;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Task.findAll({ where: { is_completed: false } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  const is_completed = req.query.is_completed;
  Task.findByPk(id)
    .then((data) => {
      if (!data.is_completed) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find an Active Task with an id of ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id,
      });
    });
};

exports.create = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const task = {
    id: req.body.id,
    Task_id: req.body.Task_id,
    section_id: req.body.section_id ? req.body.section_id : null,
    content: req.body.content,
    description: req.body.description,
    is_completed: req.body.is_completed ? req.body.is_completed : false,
    labels: req.body.labels ? req.body.labels : [],
    parent_id: req.body.parent_id ? req.body.parent_id : null,
    order: req.body.order ? req.body.order : null,
    priority: req.body.priority ? req.body.priority : null,
    due: req.body.due ? req.body.due : {},
    url: req.body.url ? req.body.url : null,
    comment_count: req.body.comment_count ? req.body.comment_count : 0,
    created_at: req.body.created_at ? req.body.created_at : 0,
    creator_id: req.body.creator_id ? req.body.creator_id : 0,
    assignee_id: req.body.assignee_id ? req.body.assignee_id : 0,
    assigner_id: req.body.assigner_id ? req.body.assigner_id : 0,
    duration: req.body.duration ? req.body.duration : {},
  };

  Task.create(task)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

exports.close = (req, res) => {
  const taskId = req.params.id;
  Task.findByPk(taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: `Cannot find Task with id=${taskId}`,
        });
      }

      const newStatus = !task.is_completed;

      return Task.update(
        { is_completed: newStatus },
        {
          where: {
            id: taskId,
          },
        }
      );
    })
    .then(() => {
      res.status(201).send({
        message: `Task status updated for ${taskId}`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error toggling Task status with id=${taskId}: ${err.message}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Task with id=" + id,
      });
    });
};
