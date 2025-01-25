import {Text} from "react-native";

interface SearchPageProps {
    searchText: string,
}

export default function SearchPage(prop: SearchPageProps): JSX.Element {
return (<Text>{prop.searchText}</Text>)
}