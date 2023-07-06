const errorMsg = document.querySelector('.error')
const loader = document.querySelector('.loader')
document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const { username, password } = Object.fromEntries(formData.entries())

  const post = await fetch('http://localhost:4000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })

  if (!post.ok) return errorMsg.classList.toggle('hidden', false)
  errorMsg.classList.toggle('hidden', true)

  const res = await post.json()
  if (res.redirect) window.location.href = res.redirect
})
