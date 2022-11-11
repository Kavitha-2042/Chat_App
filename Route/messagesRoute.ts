import express from 'express'
import * as messageController from '../Controller/msgController'

const messageRoute = express.Router()

messageRoute.post('/getmsg', messageController.addMsgs)

export default messageRoute