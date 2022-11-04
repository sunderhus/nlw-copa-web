import { api } from "@/lib/axios"
import {AxiosError} from 'axios'
import { ServiceResponse } from "./interfaces"


export const createPoolService = async (poolTitle:string):Promise<ServiceResponse> =>{

    try{
        const result = await api.post<ServiceResponse>('/pools',{title:poolTitle})

        return {
            code:result.data.code
        }
    }catch(error){
        const axiosError = error as AxiosError;
        switch (axiosError.status) {
            case 404:
                throw new Error('Bad request');
            default:
                throw new Error('Something went wrong, try again.');
        }
    }
}