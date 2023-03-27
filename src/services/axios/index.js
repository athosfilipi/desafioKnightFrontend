import axios from "axios";

const isSSL = false

const protocol = isSSL ? 'https' : 'http';

const instance = axios.create({
  baseURL: `${protocol}://127.0.0.1:3333/api/v1/`,
  timeout: 30000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export default instance;

const findAllKnights = async () => {
  const { data } = await instance.get('/knights');
  return data;
}

const findAllHeroes = async () => {
  const { data } = await instance.get('/knights', { params: { filter: 'heroes' } });
  return data;
}

const findCharacterById = async (id) => {
  const { data } = await instance.get(`/knights/${id}`);
  return data;
};

const createCharacter = async (knight) => {
  const { data } = await instance.post(`/knights/`, knight);
  return data;
};
const killCharacterById = async (id) => {
  const { data } = await instance.delete(`/knights/${id}`);
  return data;
};
const changeNicknameById = async (id, nickname) => {
  const { data } = await instance.patch(`/knights/${id}`, { nickname });
  return data;
};

export const axiosRoutes = {
  knights: {
    findCharacterById,
    findAllKnights,
    findAllHeroes,
    killCharacterById,
    createCharacter,
    changeNicknameById
  }
} 