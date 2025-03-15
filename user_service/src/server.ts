import 'dotenv/config'
import app from './expressApp'

const PORT = process.env.APP_PORT

app.listen(PORT, () => {
    console.log('user service has started on port: ', PORT)
})