import { IProduct } from "../interfaces/Product"; 
import axios from 'axios';

export const getProducts = ():Promise<IProduct[]> => {
    const url = process.env.REACT_APP_SERVER_URI || '';
    return axios.get(`${url}/products/get`).then((res) => {
        return res.data || []
    }).catch(err => {
        return [];
    });
}