module.exports = {
    up: function (db, _) {
        return db.createTable('users', {

            id: {
                type: _.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                validate: {
                }
            },
            surname: {
                type: _.STRING,
                allowNull: false,
                validate: {
                }
            },
            otherNames: {
                type: _.STRING,
                allowNull: false,
                validate: {
                }
            },
            phone: {
                type: _.STRING,
                allowNull: false,
                validate: {
                }
            },
            email: {
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
        // return db.dropAllTables();
        return db.dropTable('users');
    }
};