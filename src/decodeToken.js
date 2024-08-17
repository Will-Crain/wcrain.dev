let decodeToken = (token) => {
  if (!token) return [false, {}]

  let base64Payload = token.split('.')[1]
  if (!base64Payload) return [false, {}]

  let base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/')
  let payload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
  if (!payload) return [false, {}]

  return [true, JSON.parse(payload)]
}

export default decodeToken