module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    name: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.STRING,
    },
    hiring_date: {
      type: Sequelize.DATEONLY,
    },
    departure_date: {
      type: Sequelize.DATEONLY,
    },
  });

  return Users;
};
