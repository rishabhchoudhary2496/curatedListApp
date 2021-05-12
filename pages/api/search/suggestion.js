import createHandler from '../../../middlewares/'
import List, { validationSchema } from '../../../models/List'
import validate from '../../../utils/genericUtils'
const handler = createHandler()

handler.get(async (req, res) => {
  console.log('req', req.query)
  //   if (!req.query.q)
  //     return res
  //       .status(400)
  //       .json({ success: false, message: 'not valid query string' })
  const { q } = req.query
  console.log('query', q)
  const suggestion = await List.find({
    title: { $regex: q, $options: 'i' },
  }).limit(5)
  return res.status(200).json({ suggestion: suggestion })
})

export default validate(validationSchema, handler)
