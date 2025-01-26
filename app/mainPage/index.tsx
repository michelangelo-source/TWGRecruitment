import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image";
import ListPage from "@/components/mianPageComponent/listsPage/listPage";
import SearchPage from "@/components/mianPageComponent/searchPage/searchPage";

export type mode = "lists" | "search"
export default function MainPage() {
    const [mode, setMode] = useState<mode>("lists");
    const [searchText,setSearchText] = useState<string>("");
    return (
        <View style={styles.container}>
            <View style={styles.content}>

            {mode === "lists" ? <ListPage setMode={setMode} setSearchText={setSearchText}/> : <SearchPage setSearchText={setSearchText} searchText={searchText}/>}

            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerBtn} onPress={() => {
                    if(mode === "search") {
                        setSearchText(" ")
                        setMode("lists")
                    }
                }}>
                        <Image
                            style={styles.footerIcon}
                            source={require('@/assets/images/home-icon.svg')}
                            placeholder={"blur hash"}
                            contentFit={'contain'}
                            contentPosition={"center"}
                            tintColor={mode === "lists" ? "#2B2D42" : "white"}
                        />
                        <Text style={mode === "lists" ? styles.activeFooterText : styles.nonActiveFooterText}>

                            Home
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerBtn} onPress={() => {
                    if(mode === "lists") {
                        setSearchText("React Native")
                        setMode("search")
                    }
                }}>

                        <Image
                            style={styles.footerIcon}
                            source={require('@/assets/images/search-icon.svg')}
                            placeholder={"blur hash"}
                            contentFit={'contain'}
                            contentPosition={"center"}
                            tintColor={mode === "search" ? "#2B2D42" : "white"}
                        />

                        <Text style={mode === "search" ? styles.activeFooterText : styles.nonActiveFooterText}>
                            Search
                        </Text>

                </TouchableOpacity>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "100%",
        height: "100%",
    },
    content:{
        height:"91.67%"
    },
    footer: {
        backgroundColor: "#8D99AE",
        width: "100%",
        height: 72,
        flexDirection: "row",

    },
    footerIcon: {
        height: 32,
    },
    footerBtn: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        height: "100%",
    },
    activeFooterText: {
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        color: "#2B2D42",
        textAlign:"center"
    },
    nonActiveFooterText: {
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        color: "white",
        textAlign:"center"
    }
})