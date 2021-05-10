import mongoose from 'mongoose'

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return
  return mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(console.log('connect to mongo'))
    .catch((e) => {
      console.log(e)
    })
}

export default async function dbMiddleware(req, res, next) {
  try {
    if (!global.mongoose) {
      global.mongoose = dbConnect()
    }
  } catch (e) {
    console.log(e)
  }
  return next()
}
