module.exports = {

  up: function (db, _) {
    return db.createTable('user_accounts', {

      id: {
        type: _.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
        }
      },
      username: {
        type: _.STRING,
        allowNull: false,
        validate: {
        }
      },
      password: {
        type: _.STRING,
        allowNull: false,
        validate: {
        }
      },
      statusId: {
        type: _.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'account_statuses',
          key: 'id'
        },
        validate: {
        }
      },
      userId: {
        type: _.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },
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
    return db.dropTable('user_accounts');
  }

};