const logoutBtn = document.querySelector('.logoutBtn')

logoutBtn.addEventListener('click', e => {
  e.preventDefault()

  document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  document.location.href = '/'
})
