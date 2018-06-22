module.exports = {

  up: function (db, _) {
    return db.createTable('user_account_groups', {

      id: {
        type: _.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
        }
      },
      accountId: {
        type: _.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'user_accounts',
          key: 'id'
        },
        validate: {
        }
      },
      groupId: {
        type: _.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'account_groups',
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
    return db.dropTable('user_account_groups');
  }

};