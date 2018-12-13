// uncomment below 

// (function() {
//   var childProcess = require("child_process");
//   var oldSpawn = childProcess.spawn;
//   function mySpawn() {
//       console.log('spawn called');
//       console.log(arguments);
//       var result = oldSpawn.apply(this, arguments);
//       return result;
//   }
//   childProcess.spawn = mySpawn;
// })();

module.exports = {
  description: 'Scaffold a feathers+nuxt project',
  prompts() { 
    return [
      /* About project */
      {
        name: 'name',
        message: 'What is the name of the new project?',
        default: this.outFolder
      },
      {
        name: 'description',
        message: 'How would you describe the new project?',
        default: `feathers nuxt fullstack`
      },

      /* Database type */
      {
        name: 'database',
        message: 'What type of database will you be using',
        type: 'list',
        choices: [
          { name: 'Memory Storage', value: 'memory', short: 'memory' },
          { name: 'File Storage', value: 'file', short: 'file' },
          { name: 'SQL (Relational) Database', value: 'sql', short: 'sql' },
          { name: 'NoSQL (Document) Database', value: 'nosql', short: 'nosql' }
        ],
        default: 'sql'
      },

      /* Document DB */
      {
        name: 'nosql_dialect',
        message: 'What dialect of Document database will you be using',
        when: function({database}) { return database == 'nosql' },
        type: 'list',
        choices: [
          { name: 'MongoDB', value: 'mongodb', short: 'mongodb' },
          // { name: 'CouchDB', value: 'couchdb', short: 'couchdb' },
          // { name: 'Cassandra', value: 'cassandra', short: 'cassandra' }
        ],
        default: 'mongodb'
      },
      {
        name: 'nosql_host',
        message: 'Document Database host',
        when: function({database}) { return database == 'nosql' },
        default: '127.0.0.1'
      },
      {
        name: 'nosql_port',
        message: 'Document Database port',
        when: function({database}) { return database == 'nosql' },
        default: '27017'
      },
      {
        name: 'nosql_database',
        message: 'Document Database name',
        when: function({database}) { return database == 'nosql' }
      },


      /* Relational DB */
      {
        name: 'sequelize_dialect',
        message: 'What dialect of SQL database will you be using',
        when: function({database}) { return database == 'sql' },
        type: 'list',
        choices: [
          { name: 'SQLite', value: 'sqlite', short: 'sqlite' },
          { name: 'MySQL', value: 'mysql', short: 'mysql' },
          { name: 'MSSQL', value: 'mssql', short: 'mssql' },
          { name: 'PostgreSQL', value: 'postgresql', short: 'postgresql' }
        ],
        default: 'mysql'
      },
      {
        name: 'sequelize_host',
        message: 'SQL Database host',
        when: function({database}) { return database == 'sql' },
        default: '127.0.0.1'
      },
      {
        name: 'sequelize_port',
        message: 'SQL Database port',
        when: function({database}) { return database == 'sql' },
        default: '3306'
      },
      {
        name: 'sequelize_database',
        message: 'SQL Database name',
        when: function({database}) { return database == 'sql' }
      },
      {
        name: 'sequelize_username',
        message: 'SQL Database username',
        when: function({database}) { return database == 'sql' }
      },
      {
        name: 'sequelize_password',
        message: 'SQL Database password',
        when: function({database}) { return database == 'sql' }
      },

      /* Cache DB */
      {
        name: 'cache',
        type: 'confirm',
        message: 'Cache API responses with redis?',
        default: false
      },
      {
        name: 'resque',
        type: 'confirm',
        message: 'Queue background jobs with redis?',
        default: false
      },
      {
        name: 'redis_host',
        message: 'Redis server host address',
        when: function({cache, resque}) { return !!(cache || resque) },
        default: '127.0.0.1'
      },
      {
        name: 'redis_port',
        message: 'Redis server host port',
        when: function({cache, resque}) { return !!(cache || resque) },
        default: '6379'
      },
      {
        name: 'redis_database',
        message: 'Redis database to use',
        when: function({cache, resque}) { return !!(cache || resque) },
        default: '0'
      },
      {
        name: 'redis_password',
        message: 'Password for Redis database',
        when: function({cache, resque}) { return !!(cache || resque) },
        default: ''
      },

      /* SMTP Mailer */
      {
        name: 'smtp',
        type: 'confirm',
        message: 'Set up SMPT credentials for sending emails?',
        default: false
      }, 
      {
        name: 'smtp_host',
        message: 'SMTP server host address',
        when: function({smtp}) { return !!(smtp) },
        default: '127.0.0.1'
      },
      {
        name: 'smtp_port',
        message: 'SMTP server host port',
        when: function({smtp}) { return !!(smtp) },
        default: '6379'
      },
      {
        name: 'smtp_username',
        message: 'Email address of SMTP user',
        when: function({smtp}) { return !!(smtp) },
        default: 'no-reply@example.com'
      },
      {
        name: 'smtp_password',
        message: 'Password for SMTP User',
        when: function({smtp}) { return !!(smtp) },
        default: '5trong3r'
      },

      /* API Documentation */
      {
        name: 'documentation',
        type: 'confirm',
        message: 'Include swagger for API endpoint documentation?',
        default: true
      },

      /* Version Control */
      {
        name: 'username',
        message: 'What is your GitHub username?',
        default: this.gitUser.name,
        store: true
      },
      {
        name: 'email',
        message: 'What is your GitHub email?',
        default: this.gitUser.email,
        store: true
      },
      {
        name: 'website',
        message: 'The URL of your website?',
        default: `github.com/${this.gitUser.name}`,
        store: true
      }
    ]
  },

  actions() {
    return [
      {
        type: 'add',
        files: '**',
        filters: {
          'src/server/jobs/*': 'resque',
          'src/server/db/sequelize-orm.ls': "database == 'sql'",
          'src/server/db/mongoose-orm.ls': "database == 'nosql'"
        }
      },
      {
        type: 'move',
        patterns: {
          'gitignore': '.gitignore',
          'src/server/db/*-orm.ls': 'src/server/db/orm.ls'
        }
      }
    ]
  },

  async completed() {
    this.gitInit()
    await this.npmInstall()
    this.showProjectTips()
  }

}