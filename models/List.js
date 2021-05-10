import mongoose, { Schema } from 'mongoose'
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
  },
  { timestamps: true }
)

export const validationSchema = object({
  title: string().required().min(3).max(200),
  description: string().required().min(3).max(5000),
  content: string().required().min(5).max(100000),
})

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, 'lists')