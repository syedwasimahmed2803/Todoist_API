module.exports = (sequelize, Sequelize) => {
  const Label = sequelize.define("label", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING,
    },
    order: {
      type: Sequelize.INTEGER,
    },
    is_favorite: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Label;
};
