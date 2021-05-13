import mongoose, { Schema } from 'mongoose'
import { object, string } from 'yup'
const MODEL_NAME = 'Fav'

const schema = new Schema({
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
})

export const validationSchema = object({
  listId: string().required(),
  userEmail: string().required().email(),
})

export default mongoose.models[MODEL_NAME] || 
mongoose.model(MODEL_NAME, schema, 'favs')
