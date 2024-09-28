import { InferRequestType } from 'hono/client';
import { client } from '@pl-app/shared/client';

const { characters } = client.api;
export type Character = InferRequestType<typeof characters.$post>['json'];
const getAll = async function getAll() {
  const res = await characters.$get();
  return res.json();
};

const getById = async function getById(id: string) {
  const res = await characters[':id'].$get({ param: { id } });
  return res.json();
};

const create = async function create(params: Character) {
  const res = await characters.$post({ json: params });
  return res.json();
};

const update = async function update(id: string, params: Character) {
  const res = await characters[':id'].$put({ param: { id }, json: params });
  return res.json();
};

// prefixed with underscored because delete is a reserved word in javascript
const deleteHandler = async function _delete(id: string) {
  return characters[':id'].$delete({ param: { id } });
};
export const characterService = {
  getAll,
  getById,
  create,
  update,
  delete: deleteHandler,
};
