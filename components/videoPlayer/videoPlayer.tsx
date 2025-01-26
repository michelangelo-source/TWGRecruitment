import {Dimensions, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import Video, {VideoRef} from "react-native-video";
import {useRef, useState} from "react";
import {videoPlayerStyles} from "@/components/videoPlayer/styles";
import {Image} from "expo-image";

export default function VideoPlayerComponent() {
    const [isVideoMenuVisible, setIsVideoMenuVisible] = useState<boolean>(false)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [progressBar, setProgressBar] = useState<number>(0)
    const [pause, setPause] = useState<boolean>(false)
    const videoRef = useRef<VideoRef>(null);
    const background = require('../../assets/vidoes/broadchurch.mp4');
    const handleSeconds = (sec: number) => {
        if (sec < 10) {
            return ("0" + sec.toFixed())
        } else {
            return sec.toFixed()
        }
    }
    const onLoad = (duration: number) => {
        setDuration(duration)
    }
    const timeLine = (pixels: number) => {
        if (!videoRef.current) {
            return;
        }
        const windowWidth = Dimensions.get('window').width;
        videoRef.current.seek(duration * (pixels / windowWidth));
    }
    const animateBar = (currentTime: number) => {
        setCurrentTime(currentTime)
        setProgressBar(
            Dimensions.get('window').width * currentTime / duration
        );
    }
    return( <TouchableWithoutFeedback onPress={() => {
        setIsVideoMenuVisible(!isVideoMenuVisible)
    }}>
        <View>
            {isVideoMenuVisible &&
                <View style={videoPlayerStyles.menuVideo}>
                    <View style={videoPlayerStyles.topPartMenu}></View>

                    <View style={videoPlayerStyles.centerPartMenu}>
                        <TouchableOpacity onPress={()=>{
                            timeLine(0)
                        }} style={videoPlayerStyles.backwardsIconView}>
                            <Image
                                style={videoPlayerStyles.centerIcons}
                                source={require('@/assets/images/backward-icon.svg')}
                                placeholder={"blur hash"}
                                contentFit={'contain'}
                                tintColor={"white"}

                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            setPause(!pause)
                        }} style={videoPlayerStyles.playPauseView}>
                            <Image
                                style={videoPlayerStyles.centerIcons}
                                source={pause? require('@/assets/images/play-icon.svg'):require('@/assets/images/pause-icon.svg')}
                                placeholder={"blur hash"}
                                contentFit={'contain'}
                                tintColor={"white"}

                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            timeLine(Dimensions.get('window').width)
                        }} style={videoPlayerStyles.backwardsIconView}>
                            <Image
                                style={videoPlayerStyles.centerIcons}
                                source={require('@/assets/images/forward-icon.svg')}
                                placeholder={"blur hash"}
                                contentFit={'contain'}
                                tintColor={"white"}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={videoPlayerStyles.bottomPartMenu}>
                        <Text style={videoPlayerStyles.timerText}>{(currentTime / 60).toFixed()}:{handleSeconds((currentTime % 60))} / {(duration / 60).toFixed()}:{(duration % 60).toFixed()}</Text>
                        <TouchableOpacity onPress={()=>{
                            videoRef.current ? videoRef.current.presentFullscreenPlayer():null
                        }} >
                            <Image
                                style={videoPlayerStyles.fullScreenIcon}
                                source={require('@/assets/images/fullscreen-icon.svg')}
                                placeholder={"blur hash"}
                                contentFit={'contain'}
                                tintColor={"white"}
                            />
                        </TouchableOpacity>
                    </View>

                </View>}
            <View style={videoPlayerStyles.backgroundVideo}>
                <Video
                    source={background}
                    ref={videoRef}
                    style={videoPlayerStyles.backgroundVideo}
                    resizeMode={"contain"}
                    onLoad={(data) => {
                        onLoad(data.duration)
                    }}
                    onProgress={(data) => {
                        animateBar(data.currentTime)
                    }}
                    paused={pause}
                />
                <TouchableWithoutFeedback onPress={(event) => {
                    const {pageX} = event.nativeEvent;
                    timeLine(pageX)
                }}>
                    <View style={{
                        width: "100%",
                        height: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "black"
                    }}>
                        <View
                            style={{width: progressBar, height: 4, backgroundColor: "#C71F1F"}}></View>
                        <View style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: "#C71F1F"
                        }}></View>
                        <View style={{
                            width: Dimensions.get('window').width - progressBar,
                            height: 4,
                            backgroundColor: "gray"
                        }}></View>

                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    </TouchableWithoutFeedback>)
}



