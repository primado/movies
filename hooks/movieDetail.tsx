"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_Key } from "./apiKey";


export const useMoviewDetail = (id: string) => {

    return useQuery({
        queryKey: ['movieDetail', id],
        queryFn: async ({ queryKey }) => {
            const [, movieId] = queryKey;
            const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_Key}&i=${movieId}`)
            return response.data
        },
        enabled: !!id,
        refetchOnWindowFocus: false,
        staleTime: 86400000,
        refetchInterval: 86400000

    })

  
}