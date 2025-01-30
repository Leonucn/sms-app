import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/storages';

export const listStorages = () => axios.get(REST_API_BASE_URL);

export const createStorage = (storage) => axios.post(REST_API_BASE_URL, storage);

export const getStorage = (storageId) => axios.get(REST_API_BASE_URL + '/' + storageId);

export const updateStorage = (storageId, storage) => axios.put(REST_API_BASE_URL + '/' + storageId, storage);

export const deleteStorage = (storageId) => axios.delete(REST_API_BASE_URL + '/' + storageId);

export const getStorageByNameOrCategory = (storageName, storageCategory) => axios.get(REST_API_BASE_URL + '/?name=' + storageName + '&category=' + storageCategory);