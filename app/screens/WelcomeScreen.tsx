import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Button, Text } from "app/components"
import { Image, ImageStyle, TextStyle, View, ViewStyle,StyleSheet } from "react-native"
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useNavigation } from "@react-navigation/native"


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
            <Button onPress={handleButtonProfile}> profile</Button>
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


// const Textbtn = styled.Text`
//     text-align: center;
//     font-size: 30px;
//     border-radius: 10px;
//     padding: 15px;
//     background-color: rgb(114, 217, 139);
//     border: 1px;
// `;


