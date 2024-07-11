import axios from 'axios';
import { env } from './env.schema';

export const serverApi = axios.create({ baseURL: `http://${env.VITE_SERVER_HOST}:${env.VITE_SERVER_PORT}` });
