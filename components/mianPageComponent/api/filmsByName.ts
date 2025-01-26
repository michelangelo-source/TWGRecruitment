export type Snippet = {
    snippet: {
        "publishedAt": Date,
        "title": string,
        "description": string,
        "thumbnails": {
            "default": {
                "url": string,
                "width": number,
                "height": number
            },
            "medium": {
                "url": string,
                "width": number,
                "height": number
            },
            "high": {
                "url": string,
                "width": number,
                "height": number
            }
        }
        channelTitle:string
    }
}
export type Films = {
    "pageInfo": {
        "totalResults": number,
    },
    items: Snippet[]
}
export type VideoFilters="viewCount"|"date"|"relevance"//|"rating"|"title"|"videoCount "
export type loadingStateType="Loading..."|"Loaded"|"Failed"
export const getFilmsByName = async (searchedText: string,setLoadingState:(state:loadingStateType)=>void): Promise<Films> => {
    const Api_Key = process.env.EXPO_PUBLIC_API_KEY;
    const origin = process.env.EXPO_PUBLIC_ORIGIN;
    if (!Api_Key || !origin) {
        setLoadingState("Failed")
        throw new Error('no API_key or origin');
    }
    try {
        const response = await fetch(origin + "?key=" +  Api_Key + "&q=" + searchedText + "&type=video&part=snippet")
        if(!response.ok) {
            setLoadingState("Failed")
        }
        setLoadingState("Loaded")
        return await response.json();
    } catch (err) {
        setLoadingState("Failed")
        throw err;
    }
}
export const getMoreFilmsByNameWithFilters = async (searchedText: string,setLoadingState:(state:loadingStateType)=>void,filter?:VideoFilters): Promise<Films> => {
    const Api_Key = process.env.EXPO_PUBLIC_API_KEY;
    const origin = process.env.EXPO_PUBLIC_ORIGIN;
    if (!Api_Key || !origin) {
        setLoadingState("Failed")
        throw new Error('no API_key or origin');
    }
    try {
        if(!filter) {
            filter="viewCount"
        }
        const response = await fetch(origin + "?key=" + Api_Key + "&q=" + searchedText + "&type=video&part=snippet&order="+filter+"&maxResults=50")
        if(!response.ok) {
            setLoadingState("Failed")

        }
        setLoadingState("Loaded")
        return await response.json();
    } catch (err) {
        setLoadingState("Failed")
        throw err;
    }
}