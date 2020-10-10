import { db } from 'src/lib/db'

export const handler = async (req, _context) => {
  const logging = process.env.LOG_FUNCTIONS === 'true'

  const body = JSON.parse(req.body)

  const eventType = body.event
  const user = body.user
  const name = user.user_metadata.full_name
  const email = user.email
  const uuid = user.id

  console.info(`🚀 New user: ${email}`)

  let roles = ['user']

  if (eventType === 'signup') {
    try {
      const newUser = await db.user.create({
        data: { uuid, name, email },
      })
      logging && console.log('😀 saved user: ', { newUser })

      const userRole = await db.userRole.create({
        data: {
          name: roles[0],
          user: {
            connect: { uuid },
          },
        },
      })
      logging && console.log('🎫 saved user role: ', { userRole })
      logging && console.log('✅ done')
    } catch (error) {
      console.error(`🤬: ${error}`)
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ app_metadata: { roles: roles } }),
    }
  } else {
    return {
      statusCode: 200,
    }
  }
}
