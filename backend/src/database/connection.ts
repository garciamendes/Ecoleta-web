// Node
import path from 'path'

// Third party
import knex from 'knex'

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true,
})

export default connection