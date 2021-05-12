import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { object, string } from 'yup'

const MODEL_NAME = 'List'

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creatorEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

schema.plugin(mongoosePaginate)

export const validationSchema = object({
  title: string().required().min(3).max(200),
  description: string().required().min(3).max(5000),
  content: string().required().min(5).max(100000),
  creatorEmail: string().required().email(),
})

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, 'lists')
