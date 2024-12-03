

type terms = {
    termKey: string,
    termValue: string
}

export default function MovieDetails({termKey, termValue}: terms) {

    return (
        <div className="flex flex-row gap-x-2  justify-center items-center">
            <span className="text-base font-semibold">{termKey}:</span>
            <p className="text-[#222] text-sm font-medium">{termValue}</p>
        </div>
    )
    
};
