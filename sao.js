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
    // database: {
    //   message: 'What type of database will data be saved to?',
    //   type: list,
    //   choices: [
    //     { name: 'In memory storage;', value: 'inmemory', short: 'inmemory' }
    //     { name: 'SQL (Relational) Database; PostgreSQL, MySQL, MariaDB, SQLite, MSSQL', value: 'sql', short: 'sql' }
    //     { name: 'NoSQL (Document) Database; MongoDB', value: 'nosql', short: 'nosql' }
    //   ]
    // },
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