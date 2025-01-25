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
export type VideoFilters="viewCount"|"date"//|"rating"|"relevance"|"title"|"videoCount "
export const getFilmsByName = async (searchedText: string): Promise<Films> => {
    const Api_Key = process.env.EXPO_PUBLIC_API_KEY;
    const origin = process.env.EXPO_PUBLIC_ORIGIN;
    if (!Api_Key || !origin) {
        throw new Error('no API_key or origin');
    }
    try {
        const response = await fetch(origin + "?key=" + Api_Key + "&q=" + searchedText + "&type=video&part=snippet")
        return await response.json();
    } catch (err) {
        throw err;
    }
}
export const getMoreFilmsByNameWithFilters = async (searchedText: string,filter?:VideoFilters): Promise<Films> => {
    const Api_Key = process.env.EXPO_PUBLIC_API_KEY;
    const origin = process.env.EXPO_PUBLIC_ORIGIN;
    if (!Api_Key || !origin) {
        throw new Error('no API_key or origin');
    }
    try {
        if(!filter) {
            filter="viewCount"
        }

        const response = await fetch(origin + "?key=" + Api_Key + "&q=" + searchedText + "&type=video&part=snippet&order="+filter+"&maxResults=50")
        if(!response.ok) {
            throw new Error("sth went wrong")

        }
        return await response.json();
    } catch (err) {
        throw err;
    }
}