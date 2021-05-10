import createHandler from '../../../middlewares'
import List, { validationSchema } from '../../../models/List'
import validate from '../../../utils/genericUtils'

const handler = createHandler()

handler.get(async (req, res) => {
  const list = await List.find()
  res.status(200).json({ list })
})

export default validate(validationSchema, handler)
