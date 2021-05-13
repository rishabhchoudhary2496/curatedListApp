import createHandler from '../../../middlewares'
import Fav, { validationSchema } from '../../../models/Fav'
import List from '../../../models/List'
import validate from '../../../utils/genericUtils'
import mongoose from 'mongoose'

const handler = createHandler()

handler.post(async (req, res) => {
  let listId = mongoose.Types.ObjectId(req.body.listId)
  const list = await List.findOne({ _id: listId })
  if (!list)
    return res.status(400).json({ message: 'No List found for this id' })

  const AlreadyLiked = await Fav.findOne({
    listId: listId,
    userEmail: req.body.userEmail,
  })

  console.log('Already liked', AlreadyLiked)
  if (AlreadyLiked) return res.status(200).json({ message: 'List Already Fav' })

  const favList = await Fav.create(req.body)
  res.status(200).json({ fav: favList })
})

handler.get(async (req, res) => {
  let { listId, userEmail } = req.query
  const list = await List.findOne({ _id: listId })
  if (!list)
    return res.status(400).json({ message: 'No List found for this id' })

  const result = await Fav.findOne({
    listId: listId,
    userEmail: userEmail,
  })

  if (result) {
    res.status(200).json({ value: true })
  } else {
    res.status(200).json({ value: false })
  }
})

export default validate(validationSchema, handler)
