import {StyleSheet,Text, View} from 'react-native'
import {useLocalSearchParams} from "expo-router";
import {useEffect, useRef, useState} from "react";
import {loadingStateType} from "@/components/mianPageComponent/api/filmsByName";
import {getFilmInfoById, videoInfoType} from "@/app/videoPage/api/filmInfo";
import Video, {VideoRef} from "react-native-video";


export default function VideoPage() {
    const [loadingState, setLoadingState] = useState<loadingStateType>("Loading...");
    const [videoData, setVideosData] = useState<videoInfoType>();
    const {videoId} = useLocalSearchParams();
    useEffect(() => {
        getFilmInfoById(videoId as string, setLoadingState).then(response => {
        setVideosData(response);
        })
    }, []);
    const videoRef = useRef<VideoRef>(null);
    const background = require('../../assets/vidoes/broadchurch.mp4');
    return (
        <View style={styles.container}>
            {loadingState === "Loaded" && videoData ?
                <>
                <View style={styles.backgroundVideo}>
                    <Video
                        source={background}
                        ref={videoRef}
                        style={styles.backgroundVideo}
                        resizeMode={"contain"}
                    />
                </View>
                    <View>
                        <Text>{videoData.items[0].snippet.title}</Text>
                    </View>
                    <View>
                        <Text>{videoData.items[0].snippet.channelTitle}</Text>
                    </View>
</>
                : <Text>{loadingState}</Text>}
        </View>
    )
}
let styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
    },
    backgroundVideo: {
        width: "100%",
        height:"33.33%"
    },
});