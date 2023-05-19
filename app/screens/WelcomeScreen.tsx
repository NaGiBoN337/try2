import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Button, Text } from "app/components"
import { Image, ImageStyle, TextStyle, View, ViewStyle,StyleSheet,TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useNavigation } from "@react-navigation/native"
import { Petprofile } from "app/components/Petprofil"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> { }

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
    _props,
) {
    const navigation = useNavigation<any>()

    const handleButtonPress = () => {
        navigation.navigate("Create")
    }
    const handleButtonProfile = () => {
        navigation.navigate("Profil")
    }
    useHeader({
        title: "welcome",
       
    })

    return (
        <View>
            <TouchableOpacity onPress={()=> navigation.navigate('Меню')}>
            <Petprofile 
            post ={{
                name : "elizabet",
                age : "7",
                'gender' : require('../../assets/images/woman.png'),
                'frofileImg': require('../../assets/images/123.jpg'),
            }}
            ></Petprofile>
        </TouchableOpacity>
        <TouchableOpacity >
            <Petprofile 
            post ={{
                name : "patrik",
                age : "3",
                'gender' : require('../../assets/images/man.png'),
                'frofileImg': require('../../assets/images/321.jpg'),
            }}
            ></Petprofile>
        </TouchableOpacity>
            {/* <Button onPress={handleButtonProfile}> profile</Button> */}
        </View>
    )
})

const styles = StyleSheet.create({
    Textbtn:{
        textAlign:'center',
        fontSize: 30,
        borderRadius: 10,
        padding: 15,
        backgroundColor: 'rgb(114, 217, 139)',
        border: 1,
    }
})





