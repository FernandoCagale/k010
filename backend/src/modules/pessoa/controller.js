import _ from 'lodash';
import model from './model';
import * as Email from '../../core/nodemailer';

export const lista = async (request, reply) => {
  try {
    const pessoas = await model.findAsync({});

    reply(pessoas);
  } catch (err) {
    return reply.badImplementation(err);
  }
};

export const ler = async (request, reply) => {
  try {
    const id = request.params.id;

    const pessoa = await model.findOneAsync({_id: id});
    if (!pessoa) {
      return reply.notFound();
    }
    reply(pessoa);
  } catch (err) {
    return reply.badImplementation(err);
  }
};

export const criar = async (request, reply) => {
  try {
    const payload = request.payload;

    const pessoa = await model.createAsync(payload);
    return reply(pessoa);
  } catch (err) {
    return reply.badImplementation(err);
  }
};

export const atualizar = async (request, reply) => {
  try {
    const id = request.params.id;
    const payload = request.payload;

    const pessoa = await model.findOneAndUpdateAsync({_id: id}, payload, { new: true });
    if (!pessoa) {
      return reply.notFound();
    }
    return reply(pessoa);
  } catch (err) {
    return reply.badImplementation(err);
  }
};

export const deletar = async (request, reply) => {
  try {
    const id = request.params.id;

    await model.removeAsync({_id: id});

    return reply();
  } catch (err) {
    return reply.badImplementation(err);
  }
};

export const sortear = async (request, reply) => {
  try {
    await limparAmigos();

    const pessoas = await model.findAsync({});
    
    await sortearAmigo(pessoas);

    return reply({ok: 'ok'});
  } catch (err) {
    return reply.badImplementation(err);
  }
};

function aleatorio (value) {
  const x = Math.floor(Math.random() * (value + 1));
  if (x === value)
    return aleatorio(value);
  return x;
}

async function sortearAmigo(pessoas) {
  const sorteados = _.cloneDeep(pessoas);

  for (let i = sorteados.length - 1; i > 0; i--) {
    const j = aleatorio(i);
    const temp = sorteados[i];
    sorteados[i] = sorteados[j];
    sorteados[j] = temp;
  }

  await atualiarAmigo(pessoas, sorteados);
}

async function atualiarAmigo(pessoas, sorteados) {
  for (let i = pessoas.length - 1; i >= 0; i--) {
    await model.updateAsync({_id: pessoas[i]._id}, { $set: { amigo: sorteados[i].nome }});
    const pessoa = pessoas[i];
    pessoa.amigo = sorteados[i].nome;
    await Email.sender(pessoa);
  }
}

async function limparAmigos() {
  await model.updateAsync({}, {amigo: ''}, {multi: true});
}