import * as Schema from './schema';

const schema = Schema.getSchema();

export function lista () {
  return {};
}

export function sortear () {
  return {};
}

export function ler () {
  return {
    params: {
      id: schema
        .id
        .required()
    }
  };
}

export function criar () {
  return {
    payload: {
      nome: schema
        .nome
        .required(),
      email: schema
        .email
        .required()
    }
  };
}

export function atualizar () {
  return {
    params: {
      id: schema
        .id
        .required()
    },
    payload: {
      nome: schema
        .nome
        .optional(),
      email: schema
        .email
        .optional()
    }
  };
}

export function deletar () {
  return {
    params: {
      id: schema
        .id
        .required()
    }
  };
}
