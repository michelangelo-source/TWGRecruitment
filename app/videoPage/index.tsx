import {Text} from 'react-native'
import {useLocalSearchParams} from "expo-router";


export default function VideoPage() {
    const {videoId} = useLocalSearchParams();
    return<Text>{videoId}</Text>
}