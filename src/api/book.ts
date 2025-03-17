import axios from 'axios';

import type { Book } from '../types/book';
import { CONFIG } from '../configs/config';

const API_URL = `${CONFIG.SERVER.API_URL}/v1/books`;

const fetchBooks = async (query = '', page = 1) => {
    const response = await axios.get<{ data: Book[]; total: number }>(API_URL, { params: { query, page } });
    return response.data;
};

const createBook = async (data: Omit<Book, 'id'>) => {
    return axios.post(API_URL, data);
};

const updateBookById = async (id: number, data: Partial<Omit<Book, 'id'>>) => {
    return axios.patch(`${API_URL}/${id}`, data);
};

const deleteBookById = async (id: number) => {
    return axios.delete(`${API_URL}/${id}`);
};

export {fetchBooks, createBook, deleteBookById, updateBookById};
