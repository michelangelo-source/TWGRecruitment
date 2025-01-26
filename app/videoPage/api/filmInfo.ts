import {loadingStateType} from "@/components/mianPageComponent/api/filmsByName";

export type videoSnippet = {
    "snippet": {

        "title": "React Native Tutorial for Beginners - Build a React Native App",
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
            },
            "standard": {
                "url": string,
                "width": number,
                "height": number
            },
            "maxres": {
                "url": string,
                "width": number,
                "height": number
            }
        },
        "channelTitle": "Programming with Mosh",
    },
    "statistics": {
        "viewCount": number,
        "likeCount": number,
    }
}

export type videoInfoType={
    "items":videoSnippet[],
}


export const getFilmInfoById=async (videoId:string ,setLoadingState:(state:loadingStateType)=>void):Promise<videoInfoType>=>{
    const Api_Key = process.env.EXPO_PUBLIC_API_KEY;
    const origin = process.env.EXPO_PUBLIC_ORIGIN;
    if (!Api_Key || !origin) {
        setLoadingState("Failed")
        console.log("env nie dziala")
        throw new Error('no API_key or origin');
    }
    try {
        const response = await fetch(origin + "videos?key=" +  Api_Key + "&id=" + videoId + "&part=snippet,statistics")
        if(!response.ok) {
            console.log("zle zapytanie")
            setLoadingState("Failed")
        }
        setLoadingState("Loaded")
        return await response.json();
    } catch (err) {
        setLoadingState("Failed")
        throw err;
    }
}