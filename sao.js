// type Defaults: input - Possible values: input, confirm, list, rawlist, expand, checkbox, password, editor
module.exports = {
  prompts: {
    name: {
      message: 'What is the name of the new project?',
      default: ':folderName:'
    },
    description: {
      message: 'How would you descripe the new project?',
      default: `feathers nuxt fullstack`
    },

    database: {
      message: 'What type of database will you be using',
      type: 'list',
      choices: [
        { name: 'In memory storage;', value: 'memory', short: 'memory' },
        { name: 'SQL (Relational) Database', value: 'sql', short: 'sql' },
        { name: 'NoSQL (Document) Database', value: 'nosql', short: 'nosql' }
      ],
      default: 'memory'
    },    

    sequelize_dialect: {
      message: 'What dialect of SQL database will you be using',
      when: function(database) {
        database == 'sql'
      },
      type: 'list',
      choices: [
        { name: 'SQLite', value: 'sqlite', short: 'sqlite' },
        { name: 'MySQL', value: 'mysql', short: 'mysql' },
        { name: 'MSSQL', value: 'mssql', short: 'mssql' },
        { name: 'MSSQL', value: 'postgres', short: 'postgres' }
      ],
      default: 'memory'
    },
    sequelize_host: {
      message: 'SQL Database host',
      when: function(database) {
        return database == 'sql'
      },
      default: '127.0.0.1'
    },
    sequelize_port: {
      message: 'SQL Database port',
      when: function(database) {
        return database == 'sql'
      },
      default: '3306'
    },
    sequelize_database: {
      message: 'SQL Database name',
      when: function(database) {
        return database == 'sql'
      }
    },
    sequelize_username: {
      message: 'SQL Database username',
      when: function(database) {
        return database == 'sql'
      }
    },
    sequelize_password: {
      message: 'SQL Database password',
      when: function(database) {
        return database == 'sql'
      }
    },

    cache: {
      type: 'confirm',
      message: 'Cache API responses with redis?',
      default: true
    },
    resque: {
      type: 'confirm',
      message: 'Queue background jobs with redis?',
      default: true
    },

    redis_host: {
      message: 'Redis server host address',
      when: function({cache, resque}) {
        return !!(cache || resque)
      },
      default: '127.0.0.1'
    },
    redis_port: {
      message: 'Redis server host port',
      when: function({cache, resque}) {
        return !!(cache || resque)
      },
      default: '6379'
    },
    redis_database: {
      message: 'Redis database to use',
      when: function({cache, resque}) {
        return !!(cache || resque)
      },
      default: '0'
    },
    redis_password: {
      message: 'Password for Redis database',
      when: function({cache, resque}) {
        return !!(cache || resque)
      },
      default: ''
    },


    username: {
      message: 'What is your GitHub username?',
      default: ':gitUser:',
      store: true
    },
    email: {
      message: 'What is your GitHub email?',
      default: ':gitEmail:',
      store: true
    },
    website: {
      message: 'The URL of your website?',
      default({username}) {
        return `github.com/${username}`
      },
      store: true
    }

  },
  move: {
    'gitignore': '.gitignore'
  },
  showTip: true,
  gitInit: true,
  installDependencies: true
}