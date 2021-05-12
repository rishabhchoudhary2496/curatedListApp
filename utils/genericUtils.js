import { object, number } from 'yup'

export default function validate(schema, handler) {
  return async (req, res) => {
    if (['POST', 'PUT'].includes(req.method)) {
      try {
        // const newSchema =
        //   req.method === 'POST'
        //     ? schema
        //     : schema.concat(object({ id: number().required().positive() }))
        req.body = await schema.validate(req.body, {
          stripeUnknown: true,
        })
      } catch (error) {
        return res.status(400).json({ error: error.message })
      }
    }
    await handler(req, res)
  }
}

export function jsonParse(obj) {
  return JSON.parse(JSON.stringify(obj))
}
