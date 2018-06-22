module.exports = {

  up: function (db, _) {
    return db.createTable('account_group_roles', {

      id: {
        type: _.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
        }
      },
      accountGroupId: {
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
      roleId: {
        type: _.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'roles',
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
    return db.dropTable('account_group_roles');
  }

};