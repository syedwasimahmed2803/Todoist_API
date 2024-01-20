module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    content: {
      type: Sequelize.STRING,
    },
    attachment: {
      type: Sequelize.JSONB,
    },
    task_id: {
      type: Sequelize.STRING,
    },
    project_id: {
      type: Sequelize.STRING,
    },
    posted_at: {
      type: Sequelize.STRING,
    },
  });

  return Comment;
};
