"use client"

import MovieDetails from "@/components/movieDetails"
import { useMoviewDetail } from "@/hooks/movieDetail"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Page({params}:{params: {id: string}}) {

    const router = useRouter()

    const movieDetail = useMoviewDetail(params.id)

    if (movieDetail.isPending) { <div className="text-center text-base font-medium text-black">Loading</div> }

   

    return (
        <div className="bg-[#d1d4ff] min-h-screen  overflow-y-auto p-3">
            <button 
                onClick={() => router.back()}
                className="text-base py-2 px-2 rounded-md font-medium flex gap-1 bg-[#222222] text-[#b3b3b3] my-2 mx-5"
            >
                <span><ArrowLeft className="text-[#b3b3b3] font-semibold"/></span>{' '}
                Go back
            </button>
            <div className="flex justify-center mt-6">
                <div className="flex justify-center items-center w-[50%] ">
                    {movieDetail.isLoading ? (
                        <p className="text-base font-medium">Loading...</p>
                    ): (
                    movieDetail.data  ? (
                        
                    <div className="sm:flex sm:flex-row w-full sm:justify-around flex flex-col gap-5 ">
                        <div className="">
                            {movieDetail.data?.Poster.includes('N/A') ? (
                                'No Movie Poster'
                            ): (
                                <div className="r">
                                    <Image 
                                        src={movieDetail.data?.Poster}
                                        alt={movieDetail.data?.Title}
                                        width={300}
                                        height={300}
                                        className="object-fill rounded-md "
                                    />
                                </div>
                            )}

                        </div>
                        <div className="jflex justify-start items-start">
                            <h1 className="text-2xl font-semibold text-left text-[#222]">{movieDetail.data?.Title}</h1>
                            <div className="flex flex-col items-start justify-start gap-2">
                                {movieDetail.data?.Released && (
                                    <MovieDetails termKey='Released' termValue={movieDetail.data?.Released} />
                                )}
                                {movieDetail.data?.Year && (
                                    <MovieDetails termKey='Year' termValue={movieDetail.data?.Year} />
                                )}
                                {movieDetail.data?.Genre && (
                                    <MovieDetails termKey='Genre' termValue={movieDetail.data?.Genre} />
                                )}
                                {movieDetail.data?.Actors && (
                                    <MovieDetails termKey='Actors' termValue={movieDetail.data?.Actors} />
                                )}
                                {movieDetail.data?.Plot && (
                                    <MovieDetails termKey='Plot' termValue={movieDetail.data?.Plot} />
                                )}
                                {movieDetail.data?.Country && (
                                    <MovieDetails termKey='Country' termValue={movieDetail.data?.Country} />
                                )}
                                {movieDetail.data?.Language && (
                                    <MovieDetails termKey='Language' termValue={movieDetail.data?.Language} />
                                )}
                                {movieDetail.data?.Awards && (
                                    <MovieDetails termKey='Awards' termValue={movieDetail.data?.Awards} />
                                )}
                            </div>
                        </div>
                    </div>
                    ): (
                        <div className="">No movie detail</div>
                    ))}
                </div>
            </div>

        </div>
    )
    
};
