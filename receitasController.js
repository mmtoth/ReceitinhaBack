require('dotenv-safe').load()
const { connect } = require('./receitasApiRepository')
const receitasModel = require('./receitasSchema')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

connect()

const getAll = () => {
  return receitasModel.find((error, receitas) => {
    return receitas
  })
}

const getById =()=>{
  return receitasModel.findById(id)

}
const add = (receitas) => {
  const novaReceita = new receitasModel(receitas)
  return novaReceita.save()
}

const remove = (id) =>{
  return receitasModel.findByIdAndDelete(id)
}

module.exports = {
  getAll,
  getById,
  add,
  remove
}