import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image";
import React, {useEffect, useState} from "react";
import {
    Films,
    getMoreFilmsByNameWithFilters,
    loadingStateType,
    VideoFilters
} from "@/components/mianPageComponent/api/filmsByName";
import {handleDate} from "@/components/functions/handleDate";
import ChangeFilterForm from "@/components/mianPageComponent/searchPage/changeFilterForm";
import {Link} from "expo-router";

export type DisplayToUserFilters = "Most popular" | "Upload date: latest" | "Upload date: oldest"

interface SearchPageProps {
    searchText: string,
    setSearchText: (text: string) => void
}

export default function SearchPage(props: SearchPageProps): JSX.Element {
    const [usageFilter, setUsageFilter] = useState<DisplayToUserFilters>("Most popular");
    const [changeFilter, setChangeFilter] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<VideoFilters>("viewCount");
    const [films, setFilms] = useState<Films>();
    const [loadingState, setLoadingState] = useState<loadingStateType>("Loading...");
    const handleSearch = (text: string) => {
        props.setSearchText(text);
    }
    useEffect(() => {
        switch (usageFilter) {
            case "Most popular": {
                setFilterText("viewCount")
                break;
            }
            case "Upload date: latest": {
                setFilterText("date")
                break;
            }
            case "Upload date: oldest": {
                setFilterText("relevance")
                break
            }
        }
    }, [usageFilter]);
    useEffect(() => {
        try {
            setLoadingState("Loading...");
            getMoreFilmsByNameWithFilters(props.searchText, setLoadingState, filterText).then((response) => {
                if (filterText === "relevance") {
                    response.items.sort((a, b) => {
                        return new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime();
                    })
                    setFilms(response);
                } else {
                    setFilms(response);
                }
            })
        } catch (e) {
            console.log(e)
        }
    }, [props.searchText, filterText]);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <View style={styles.submitIconView}>
                        <Image
                            style={styles.submitIcon}
                            source={require('@/assets/images/search-icon.svg')}
                            placeholder={"blur hash"}
                            contentFit={'contain'}
                            contentPosition={"left"}
                        />
                    </View>

                    <TextInput placeholder={"React Native"}
                               defaultValue={props.searchText}
                               onSubmitEditing={({nativeEvent: {text}}) => handleSearch(text)}/>
                </View>
            </View>
            {films && loadingState === "Loaded" &&
                <View>
                    <View>
                        <Text style={styles.resultsText}>{films.pageInfo.totalResults} results found for:<Text
                            style={{fontFamily: "Poppins-Bold"}}> "{props.searchText}"</Text></Text>

                    </View>
                    <TouchableOpacity style={styles.sortedByView}>
                        <Text style={styles.sortedByText} onPress={() => {
                            setChangeFilter(true)
                        }}>sorted by:

                            <Text style={styles.sortedByTextBold}> "{usageFilter}"</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            }
            <ScrollView>
                {films && loadingState === "Loaded" ? films.items.map((el, index) => (
                    <Link key={index} style={styles.element} href={{
                        pathname: "/videoPage",
                        params: {videoId: el.id.videoId}
                    }}>
                        <View style={styles.element}>
                            <Image
                                style={styles.movieThumbnail}
                                source={el.snippet.thumbnails.medium.url}
                                placeholder={el.snippet.title}
                                contentFit={'fill'}
                                contentPosition={"center"}
                            />
                            <View style={styles.chanelNameView}>
                                <Text style={styles.chanelNameText}>{el.snippet.channelTitle}</Text>
                            </View>
                            <Text style={styles.movieTitle}>{el.snippet.title}</Text>
                            <View style={styles.movieDateView}>
                                <Text style={styles.movieDateText}>{handleDate(el.snippet.publishedAt)}</Text>
                            </View>

                        </View>
                    </Link>
                )) : <Text style={{fontFamily: "Poppins"}}>{loadingState}</Text>}
            </ScrollView>
            {changeFilter && <ChangeFilterForm usageFilter={usageFilter} setUsageFilter={setUsageFilter}
                                               setChangeFilter={setChangeFilter}/>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        height: 44,
        width: "100%",
        marginVertical: 5,
        paddingHorizontal: 20,
    },
    searchBar: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        alignContent: "flex-start",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 16,
    },
    submitIconView: {
        height: "100%",
        width: 32,
    },
    submitIcon: {
        height: "100%",
    },
    sortedByView: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingHorizontal: 20,
    },
    sortedByText: {
        fontFamily: "Poppins",
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 24,
    },
    sortedByTextBold: {
        fontFamily: "Poppins-Bold",
    },

    resultsText: {
        fontFamily: "Poppins",
        fontWeight: "400",
        fontSize: 10,
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    element: {
        marginVertical: 10,
        marginLeft: 20,
        width: 345
    },
    movieThumbnail: {
        height: 200,
        borderRadius: 16,
        marginBottom: 5
    },
    chanelNameView: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginVertical: 10
    },
    chanelNameText: {
        paddingTop: 5,
        fontFamily: "Poppins-Bold",
        fontSize: 12,
        lineHeight: 12,
    },
    movieTitle: {
        paddingVertical: 5,
        fontFamily: "Poppins",
        fontWeight: "500",
        fontSize: 12,
        lineHeight: 12,
        marginBottom: 10
    },
    movieDateView: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    movieDateText: {
        fontFamily: "Poppins",
        fontWeight: "400",
        fontSize: 10,
        lineHeight: 14,
    }
})