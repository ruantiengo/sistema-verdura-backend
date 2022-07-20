import { Express, json } from 'express'
import bodyParser from 'body-parser'
export default (app: Express) => {
  app.use(json())
  app.use(bodyParser.json())
}
