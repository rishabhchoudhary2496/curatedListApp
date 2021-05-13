import createHandler from '../../../middlewares'
import Fav, { validationSchema } from '../../../models/Fav'
import List from '../../../models/List'
import validate from '../../../utils/genericUtils'
import mongoose from 'mongoose'

const handler = createHandler()

handler.delete(async (req, res) => {
  let listId = req.query.listId
  console.log('list id', listId)
  let userEmail = req.query.userEmail
  console.log('userEmail', userEmail)
  listId = mongoose.Types.ObjectId(listId)

  const list = await List.findOne({ _id: listId })
  if (!list)
    return res.status(400).json({ message: 'No List found for this id' })
  const Liked = await Fav.findOne({
    listId: listId,
    userEmail: userEmail,
  })

  console.log('liked', Liked)

  if (Liked) {
    const result = await Fav.findByIdAndRemove(Liked._id)
    console.log('result', result)
    return res.status(200).json({ result: result })
  }
})

export default validate(validationSchema, handler)
