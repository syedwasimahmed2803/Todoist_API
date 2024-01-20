const db = require("../models");
const Project = db.project;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.iLike]: `%${id}%` } } : null;

  Project.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Project.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
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

  const project = {
    id: req.body.id,
    name: req.body.name,
    comment_count: req.body.comment_count ? req.body.comment_count : 0,
    order: req.body.order,
    color: req.body.color,
    is_shared: req.body.is_shared,
    is_favorite: req.body.is_favorite,
    is_inbox_project: req.body.is_inbox_project,
    is_team_inbox: req.body.id_team_inbox,
    view_style: req.body.view_style,
    url: req.body.url,
    parent_id: req.body.parent_id,
  };

  Project.create(project)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Project.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Project was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Project with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Project.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Project was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Project with id=" + id,
      });
    });
};
