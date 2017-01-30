import Promise from 'bluebird';
import mongoose from 'mongoose';

let Schema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  amigo: {
    type: String,
    required: false
  }
});

const PessoaModel = mongoose.model('Pessoa', Schema);

module.exports = Promise.promisifyAll(PessoaModel);
