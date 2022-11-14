import express from 'express'
import * as messageController from '../Controller/msgController'

const messageRoute = express.Router()

messageRoute.post('/createMsg', messageController.createMsgs)

messageRoute.post('/getAllMsgs', messageController.getAllMsgs)

export default messageRoute