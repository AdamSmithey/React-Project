exports.list = (sequelize, Sequelize) => {
  const List = sequelize.define("list", {
    title: {
      type: Sequelize.STRING
    },
  });

  return List;
};

exports.category = (sequelize, Sequelize) => {
  const Category = sequelize.define('category', {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Category;
}

exports.contents = (sequelize, Sequelize) => {
  const Contents = sequelize.define('contents', {
    content: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    index: {
      type: Sequelize.INTEGER
    }
  })

  return Contents;
}
