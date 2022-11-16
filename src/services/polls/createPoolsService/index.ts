import { api } from "@/lib/axios"
import {AxiosError} from 'axios'
import { ServiceResponse } from "./interfaces"


export const createPollService = async (pollTitle:string):Promise<ServiceResponse> =>{

    try{
        const result = await api.post<ServiceResponse>('/polls',{title:pollTitle})

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