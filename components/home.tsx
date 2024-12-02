"use client"
import { useForm } from "react-hook-form"

import { useSearchMovie } from "@/hooks/searchMovie"
import Image from "next/image"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import default_imag from "@/public/movie_icon.png"
import Link from "next/link"
import { toast } from "sonner"

type SearchTerm = {
    searchQuery: string
}

type searchItems = {
    Title: string
    Year: string
    Type: string
    Poster: string
    imdbID: string
}

export default function HomeView() {

    const { register, handleSubmit, formState: { errors } } = useForm<SearchTerm>({
        defaultValues: {
            searchQuery: ''
        }
    })

    const searchMovie = useSearchMovie()

    const onSubmit = async (data: SearchTerm) => {
        searchMovie.mutateAsync(data.searchQuery)
    }


    if (searchMovie.data?.Response === "False") {
         toast.error("No movie found")
    }

    return (
        <div className="bg-[#d1d4ff] min-h-screen  overflow-y-auto">
            
            <div className="flex flex-col gap-16 justify-center items-center mt-5 mb-16">
                <div className="">
                    <h1 className="text-2xl text-black font-semibold text-center">Search for Movies</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 px-5">
                    
                    <div className="flex gap-2 items-center justify-center">
                        <input 
                            type="search" 
                            {...register("searchQuery", {
                                maxLength: {
                                    value: 60,
                                    message: "Maximum search query is 60 characters"
                                }
                            })}
                            placeholder="Search for movies"
                            className="sm:w-[30rem] w-full rounded-xl outline-none border-2 border-violet-600/75 px-3 py-3 text-black text-base font-medium"
                        />
                        {errors.searchQuery?.message && <p className="text-sm font-medium text-red-700"></p>}
                        <div className="">
                            <button type="submit" className="bg-[#222222] w-24 py-3 rounded-xl text-[#b3b3b3] text-base font-semibold hover:bg-opacity-90">Search</button>
                        </div>
                    </div>
                </form>

                <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-start sm:justify-center lg:grid-cols-4 md:grid-cols-3 flex flex-col gap-4">
                    {searchMovie.data?.Search?.map((data: searchItems) => (
                    <Link key={data.imdbID} href={`detail/${data.imdbID}`}>
                        <Card  className="w-[220px] h-full">
                            {data.Poster.includes('N/A') ? (
                                <Image 
                                    src={default_imag}
                                    alt={data.Title}
                                    className="object-fill"
                                />
                            ): (
                                <div className="relative w-full aspect-square">
                                    <Image 
                                        src={data.Poster}
                                        alt={data.Title}
                                        fill
                                        className="object-fill rounded-t-md"
                                    />
                                </div>
                            )}  

                            <CardHeader className="text-black">
                                <CardTitle className="text-base font-semibold">{data.Title}</CardTitle>
                                <CardDescription className="text-sm font-medium">{data.Type} | {data.Year}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    ))}
                </div>

            </div>
            
        </div>
    )
    
};
