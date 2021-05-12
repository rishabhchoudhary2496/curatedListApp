import createHandler from '../../../middlewares'
import List, { validationSchema } from '../../../models/List'
import validate from '../../../utils/genericUtils'

const handler = createHandler()

handler.get(async (req, res) => {
  const { id } = req.query
  const list = await List.findOne({ _id: id })
  res.status(200).json({ list })
})

export default validate(validationSchema, handler)
