module.exports = {
  up(db, _) {
    return db.createTable('roles', {

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

  down(db, _) {
    return db.dropTable('roles');
  },

  async seed(app, assert) {

    let permissions = [];
    const actions = ['manage', 'find', 'get', 'create', 'update', 'patch', 'remove'];
    
    for (i$ = 0, len$ = (ref$ = Object.keys(app.services)).length; i$ < len$; ++i$) {
      resource = ref$[i$];
      for (j$ = 0, len1$ = actions.length; j$ < len1$; ++j$) {
        action = actions[j$];
        permissions.push({
          code: action.toUpperCase() + "_" + resource.toUpperCase(),
          description: action + " " + resource
        });
      }
    }

    return await assert('roles', permissions)
  }

};