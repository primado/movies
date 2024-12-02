"use client"
import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { API_Key } from "./apiKey";
import { toast } from "sonner";

export const useSearchMovie = () => {

    const searchMovie = useMutation({
        mutationKey: ['searchMovie'],
        mutationFn: async (s: string) => {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_Key}&s=${s}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return response.data
        },
        onError: (err) => {
            if(isAxiosError(err)) {
                const code = err.response?.status ?? null
                
                if (code === 400) {
                    toast.error('The movie cannot be found, please try again.')
                }
            }
        } 
    })

    return searchMovie

}