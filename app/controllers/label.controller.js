const db = require("../models");
const Label = db.label;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.iLike]: `%${id}%` } } : null;

  Label.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving labels.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Label.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find label with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving label with id=" + id,
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

  const label = {
    id: req.body.id,
    name: req.body.name ? req.body.name : null,
    color: req.body.color ? req.body.color : null,
    order: req.body.order ? req.body.order : 0,
    is_favorite: req.body.is_favorite ? req.body.is_favorite : false,
  };

  Label.create(label)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the label.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Label.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "label was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update label with id=${id}. Maybe label was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating label with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Label.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "label was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete label with id=${id}. Maybe label was not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting label with id=" + id,
      });
    });
};
