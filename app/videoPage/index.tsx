import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import {loadingStateType} from "@/components/mianPageComponent/api/filmsByName";
import {getFilmInfoById, videoInfoType} from "@/app/videoPage/api/filmInfo";
import {Image} from "expo-image";
import VideoPlayerComponent from "@/components/videoPlayer/videoPlayer";


export default function VideoPage() {
    const [activeMode, setActiveMode] = useState<"Details" | "Notes">("Details");
    const [loadingState, setLoadingState] = useState<loadingStateType>("Loading...");
    const [videoData, setVideosData] = useState<videoInfoType>();
    const {videoId} = useLocalSearchParams();
    useEffect(() => {
        getFilmInfoById(videoId as string, setLoadingState).then(response => {
            setVideosData(response);
        })
    }, []);
    return (
        <View style={styles.container}>
            {loadingState === "Loaded" && videoData ?
                <>
                    <VideoPlayerComponent></VideoPlayerComponent>
                    <View style={styles.movieTitleView}>
                        <Text style={styles.movieTitle}>{videoData.items[0].snippet.title}</Text>
                    </View>
                    <View style={styles.channelBar}>
                        <View style={styles.personIconView}>
                            <Image
                                style={styles.personIcon}
                                source={require('@/assets/images/person-icon.svg')}
                                placeholder={"blur hash"}
                                contentFit={'contain'}
                                tintColor={"white"}
                            />
                        </View>
                        <Text style={styles.channelNameText}>{videoData.items[0].snippet.channelTitle}</Text>
                    </View>
                    <View style={styles.smallMenuBar}>
                        <TouchableOpacity onPress={() => {
                            setActiveMode("Details")
                        }}
                                          style={activeMode === "Details" ? styles.smallMenuElementActive : styles.smallMenuElementNonActive}><Text
                            style={styles.smallMenuElementText}>Details</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setActiveMode("Notes")
                        }}
                                          style={activeMode === "Notes" ? styles.smallMenuElementActive : styles.smallMenuElementNonActive}><Text
                            style={styles.smallMenuElementText}>Notes</Text></TouchableOpacity>
                    </View>
                    {activeMode === "Details" ?
                        <View style={styles.detailsView}>
                            <View><Text style={styles.titles}>Description</Text></View>
                            <ScrollView style={styles.descriptionView}><Text
                                style={styles.descriptionText}>{videoData.items[0].snippet.description}</Text></ScrollView>
                            <View><Text style={styles.titles}>Statistics</Text></View>
                            <View style={{flexDirection: "row", width: "100%"}}>
                                <View style={{alignItems: "flex-start", flex: 0.5}}>
                                    <View style={styles.statisticsView}>
                                        <View style={{width: "20%", alignItems: "center", justifyContent: "center"}}>
                                            <Image
                                                style={styles.statisticsIcon}
                                                source={require('@/assets/images/views-icon.svg')}
                                                tintColor={"white"}
                                            />
                                        </View>
                                        <View style={{width: "80%", alignItems: "center", justifyContent: "center"}}>
                                            <Text
                                                style={styles.statisticsText}>{videoData.items[0].statistics.viewCount + " "}views</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{alignItems: "flex-end", flex: 0.5}}>
                                    <View style={styles.statisticsView}>
                                        <View style={{width: "20%", alignItems: "center", justifyContent: "center"}}>
                                            <Image
                                                style={styles.statisticsIcon}
                                                source={require('@/assets/images/likes-icon.svg')}
                                                tintColor={"white"}
                                            />
                                        </View>
                                        <View style={{width: "80%", alignItems: "center", justifyContent: "center"}}>
                                            <Text
                                                style={styles.statisticsText}>{videoData.items[0].statistics.likeCount + " "}likes</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        :
                        <Text>NOTES IN PROGRESS</Text>}
                </>
                : <Text>{loadingState}</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    movieTitleView: {
        margin: 10,
    },
    movieTitle: {
        fontFamily: "Poppins",
        fontSize: 18,
    },
    channelBar: {
        flexDirection: "row",
        alignItems: "center",
    },
    personIconView: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#2B2D42",
        width: 48,
        height: 48,
        borderRadius: 48,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    personIcon: {
        width: 24,
        height: 24
    },
    channelNameText: {
        fontFamily: "Poppins-Bold",
        fontSize: 14,
        color: "#2B2D42",
    },
    smallMenuBar: {
        flexDirection: "row",
        margin: 10,
        display: "flex",
    },
    smallMenuElementActive: {
        flex: 0.5,
        display: "flex",
        borderBottomWidth: 2,
        borderBottomColor: "#2B2D42",
        alignItems: "center",
    },
    smallMenuElementNonActive: {
        flex: 0.5,
        borderBottomWidth: 2,
        borderBottomColor: "#C8C8C8",
        alignItems: "center",
    },
    smallMenuElementText: {
        fontFamily: "Poppins",
        fontSize: 12,
    },
    detailsView: {
        marginHorizontal: 15,
    },
    titles: {
        fontFamily: "Poppins-Bold",
        fontSize: 12,
    },
    descriptionView: {
        marginVertical: 10,
        height: 200,
    },

    descriptionText: {
        fontFamily: "Poppins",
        fontSize: 12,
        color: "#2B2D42"
    },
    statisticsView: {
        flexDirection: "row",
        height: 32,
        width: "80%",
        backgroundColor: "#2B2D42",
        borderRadius: 8,
        alignItems: "center"
    },
    statisticsIcon: {
        height: 20,
        width: 20,
        marginLeft: 5,
    },
    statisticsText: {
        fontFamily: "Poppins-Bold",
        fontSize: 12,
        color: "white"
    },
});