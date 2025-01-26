import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {mode} from "@/app/mainPage";
import React, {useEffect, useState} from "react";
import {Films, getFilmsByName, loadingStateType,} from "@/components/mianPageComponent/api/filmsByName";
import {Image} from "expo-image";
import {handleDate} from "@/components/functions/handleDate";


interface mainListProps {
    title: string;
    setSearchText: (title: string) => void
    setMode: (search: mode) => void
}


export default function MainList(props: mainListProps) {
    const[loadingState, setLoadingState] = useState<loadingStateType>("Loading...");
    const [films, setFilms] = useState<Films>();
    useEffect(() => {
        try {
            getFilmsByName(props.title,setLoadingState).then((response) => {
                setFilms(response);
            })
        } catch (e) {
            console.log(e)
        }
    }, []);
    return (<View style={styles.container}>
        <View style={styles.titleBar}>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>{props.title}</Text>
            </View>
            <View style={styles.showMoreView}>
                <TouchableOpacity onPress={() => {
                    props.setSearchText(props.title)
                    props.setMode("search")
                }}>
                    <Text style={styles.showMoreText}>Show more</Text>
                </TouchableOpacity>
            </View>


        </View>

        <ScrollView horizontal={true}>
            {films && loadingState==="Loaded"  ?films.items.map((el,index) => (

                <View style={styles.element} key={index}>
                    <Image
                        style={styles.movieThumbnail}
                        source={el.snippet.thumbnails.medium.url}
                        placeholder={el.snippet.title}
                        contentFit={'fill'}
                        contentPosition={"center"}

                    />
                    <Text style={styles.movieTitle}>{el.snippet.title}</Text>
                    <View style={styles.movieDateView}>
                        <Text style={styles.movieDateText}>{handleDate(el.snippet.publishedAt)}</Text>
                    </View>

                </View>


            )):<Text style={{fontFamily:"Poppins"}}>{loadingState}</Text>}

        </ScrollView>
    </View>)
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: "black"
    },
    titleBar: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    titleView: {
        display: "flex",
        flex: 0.5,
        alignItems: "flex-start",
    },
    titleText: {
        fontFamily: "Poppins",
        fontWeight: "600",
        fontSize: 18,
        lineHeight: 24,
    },
    showMoreView: {
        display: "flex",
        flex: 0.5,
        alignItems: "flex-end",
    },
    showMoreText: {
        fontFamily: "Poppins",
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 24,
        textDecorationLine: "underline",
    },
    element: {
        marginVertical:10,
        marginLeft: 20,
    },
    movieThumbnail: {
        height: 112,
        width: 180,
        borderRadius: 16,
        marginBottom: 10
    },
    movieTitle: {
        paddingVertical: 5,
        width: 180,
        fontFamily: "Poppins",
        fontWeight: "500",
        fontSize: 12,
        lineHeight: 12,
    },
    movieDateView: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    movieDateText:{
        fontFamily: "Poppins",
        fontWeight: "400",
        fontSize: 10,
        lineHeight: 14,
    }
})