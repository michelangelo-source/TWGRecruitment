import {StyleSheet, Text, View} from "react-native";
import {Image} from 'expo-image';
import {Link} from "expo-router";
import {Linking} from 'react-native';

export default function Login() {
    return (
        <View style={styles.container}>
            <View style={styles.part}>
                <View style={{paddingHorizontal: 50, width: '100%', height: '100%'}}>
                    <Image
                        style={styles.imageLogo}
                        source={require('@/assets/images/logo.svg')}
                        placeholder={"blur hash"}
                        contentFit={'contain'}
                    />
                </View>
            </View>
            <View style={styles.part}>
                <Image
                    style={styles.imageIcon}
                    source={require('@/assets/images/app-icon.svg')}
                    placeholder={"blur hash"}
                    contentFit={'contain'}

                />
            </View>
            <View style={styles.part}>
                <View style={{paddingHorizontal: 40, width: '100%', marginBottom: 30}}>
                    <Text style={styles.welcomeText}>Welcome to the best YouTube-based learning application.</Text>
                    <Link href={'/mainPage'}>
                        <View style={styles.loginBtn}>
                            <Text style={styles.logInText}>
                                Log in as guest
                            </Text>
                        </View>
                    </Link>
                </View>

                <View style={{paddingHorizontal: 50, width: '100%'}}>
                    <Text style={styles.policyText}>By continuing you agree with
                        {"\n"}
                        <Text style={styles.link} onPress={() => {
                            Linking.openURL('http:://google.com')
                        }}>Terms and Conditions</Text> and <Text style={styles.link} onPress={() => {
                            Linking.openURL('http:://google.com')
                        }}>Privacy Policy</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#8D99AE",
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    part: {
        height: "33%",
        width: "100%",
        alignItems: "center",
    },
    imageLogo: {
        flex: 1,
        width: "100%",
    },
    imageIcon: {

        flex: 1,
        width: 128,
    },
    loginBtn: {
        display: "flex",
        flex: 1,
        backgroundColor: "#2B2D42",
        borderRadius: 12,
        height: 48,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,

    },
    welcomeText: {
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 22,
        lineHeight: 24,
        color: "white",
        marginBottom: 30
    },
    logInText: {
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        color: "white",
    },
    policyText: {
        textAlign: "center",
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 16,
        color: "white",
    },
    link: {
        color: "#2B2D42",
        textDecorationLine: "underline",
    }

})
