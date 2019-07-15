require('dotenv-safe').config({allowEmptyValues: true})
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const servidor = express()
const receitasController = require('./receitasController')
const params = require('params')
const parametrosPermitidos = require('./parametrosPermitidos')
const PORT = process.env.PORT || 3038
// const jwt = require('jsonwebtoken')
const logger = (request, response, next) => {
  console.log(`${new Date().toISOString()} Request type: ${request.method} to ${request.originalUrl}`)

  response.on('finish', () => {
    console.log(`${response.statusCode} ${response.statusMessage};`)
  })

  next()
}

servidor.use(cors())
servidor.use(bodyParser.json())
servidor.use(logger)

servidor.get('/', (request, response) => {
  response.send('Olá, mundo!')
})

// Rotas receitas

servidor.get('/receitas', async (request, response) => {
    receitasController.getAll()
    .then(receitas => response.send(receitas))
})

servidor.get('/receitas/:id', (request, response) => {
  receitasController.getById(request.params.id)
    .then(receitas => {
      if(!receitas){
        response.sendStatus(404)
      } else {
        response.send(receitas)
      }
    })
    .catch(error => {
      if(error.name === "CastError"){
        response.sendStatus(400)
      } else {
        response.sendStatus(500)
      }
    })
})

servidor.post('/receitas', (request, response) => {
  receitasController.add(request.body)
    .then(receitas => {
      const _id = receitas._id
      response.send(_id)
    })
    .catch(error => {
      if(error.name === "ValidationError"){
        response.sendStatus(400)
      } else {
        console.log(error)
        response.sendStatus(500)
      }
    })
})

servidor.delete('/receitas/:id', (request, response) => {
  receitasController.remove(request.params.id)
  .then(receitas => {
      if(!receitas){
          response.sendStatus(404)
      }else {
          response.sendStatus(204)
      }
  })
  .catch(error => {
      if(error.name === "CastError") {
          response.sendStatus(400)
      } else {
          response.sendStatus(500)
      }
  })
})
  servidor.listen(PORT)
  console.info(`Rodando na porta ${PORT}`)