export const mailRegex =
  /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z0-9_.-]{2,4})$/

export const FB_APP_ID = '1896807707303093'

export const GOOGLE_CLIENT_ID = '935189477066-l06empobt4uecgt5m7jrqib8rpsumk3q'

export const uuidRegex =
  /^([0-9A-Fa-f]){8}-([0-9A-Fa-f]){4}-([0-9A-Fa-f]){4}-([0-9A-Fa-f]){4}-([0-9A-Fa-f]){12}$/

export const domainProd = 'https://api.lisha-app.com'

export const domainDev = 'http://192.168.0.30:3001'

// export const domain = domainProd

export const domain =
  process.env.NODE_ENV === 'development' ? domainDev : domainProd
