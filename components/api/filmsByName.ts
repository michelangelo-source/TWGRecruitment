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
    }
}
export type Films = {
    items: Snippet[]
}
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