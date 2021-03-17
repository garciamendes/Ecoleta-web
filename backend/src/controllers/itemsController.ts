// Third party
import { Request, Response } from 'express'

// Local
import knex from '../database/connection'

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex('items').select('*')

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image: `http://localhost:3333/uploads/${item.image}`,
      }
    })

    return res.json(serializedItems)
  }
}

export default ItemsController