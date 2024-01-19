module.exports = (sequelize, Sequelize) => {
  const project = sequelize.define("project", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    comment_count: {
      type: Sequelize.INTEGER,
    },
    order: {
      type: Sequelize.INTEGER,
    },
    color: {
      type: Sequelize.STRING,
    },
    is_shared: {
      type: Sequelize.BOOLEAN,
    },
    is_favorite: {
      type: Sequelize.BOOLEAN,
    },
    parent_id: {
      type: Sequelize.INTEGER,
    },
    is_inbox_project: {
      type: Sequelize.BOOLEAN,
    },
    is_team_inbox: {
      type: Sequelize.BOOLEAN,
    },
    view_style: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
  });

  return project;
};
