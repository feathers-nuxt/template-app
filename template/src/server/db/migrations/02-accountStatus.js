module.exports = {

  up: function (db, _) {
    return db.createTable('account_statuses', {

      id: {
        type: _.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
        }
      },
      code: {
        type: _.STRING,
        allowNull: false,
        validate: {
        }
      },
      description: {
        type: _.STRING,
        allowNull: false,
        validate: {
        }
      },

      // Timestamps
      createdAt: _.DATE,
      updatedAt: _.DATE,
      deletedAt: _.DATE

    });
  },

  down: function (db, _) {
    return db.dropTable('account_statuses');
  }

};