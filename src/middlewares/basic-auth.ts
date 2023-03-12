const basicAuth = require("express-basic-auth")
export const auth = basicAuth({
    users: { 'admin': 'qwerty' }
})