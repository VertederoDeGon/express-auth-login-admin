import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
import { users } from '../controllers/auth.controller.js'
dotenv.config()

const checkCookie = header => {
  try {
    const cookieJWT = header.cookie
      .split('; ')
      .find(cokie => cokie.startsWith('jwt='))
      .slice(4)

    const decoded = jsonwebtoken.verify(cookieJWT, process.env.JWT_KEY)
    const userExists = users.find(user => user.username === decoded.user)

    return userExists ? true : false
  } catch {
    return false
  }
}
export function publicMiddleware (req, res, next) {
  const isLoggedIn = checkCookie(req.headers)
  return isLoggedIn ? res.redirect('/admin') : next()
}

export function adminMiddleware (req, nes, next) {
  const isLoggedIn = checkCookie(req.headers)
  return isLoggedIn ? next() : res.redirect('/')
}
