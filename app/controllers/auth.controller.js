import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'

dotenv.config()

export const users = [
  {
    username: 'asd',
    email: 'asd.123proyt@gmail.com',
    password: 'asd'
  }
]

async function login (req, res) {
  console.log({ 'Login data': req.body })
  const { username, password } = req.body
  if (!username || !password)
    return res.status(400).send({ status: 400, message: 'Missing fields' })

  const userExists = users.find(user => user.username === username)
  if (!userExists)
    return res.status(400).send({ status: 400, message: 'Login error' })

  if (await bcryptjs.compare(password, userExists.password))
    return res.status(400).send({ status: 400, message: 'Login error' })

  const token = jsonwebtoken.sign(
    { user: userExists.username },
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_EXPIRATION_DATE }
  )

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    path: '/'
  }

  res.cookie('jwt', token, cookieOptions)

  return res
    .status(200)
    .send({ status: 'ok', message: 'Login success', redirect: '/admin' })
}

const createHash = async string => {
  const salt = await bcryptjs.genSalt(5)
  return await bcryptjs.hash(string, salt)
}

async function register (req, res) {
  console.log({ 'Register data': req.body })
  const { username, password, email } = req.body
  if (!username || !password || !email)
    return res.status(400).send({ status: 400, message: 'Missing fields' })

  const userExists = users.find(user => user.username === username)
  if (userExists)
    return res.status(400).send({ status: 400, message: 'User already exists' })

  const hashPassword = await createHash(password)

  const newUser = { username, password: hashPassword, email }

  users.push(newUser)

  return res
    .status(201)
    .send({ status: 'ok', message: `User ${username} created`, redirect: '/' })
}

export const auth = {
  login,
  register
}
