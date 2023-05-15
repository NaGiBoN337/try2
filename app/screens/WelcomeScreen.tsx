import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Button, Text } from "app/components"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
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
            <Text>hello2</Text>
            <Button onPress={handleButtonPress}> create</Button>
            <Button onPress={handleButtonProfile}> profile</Button>
        </View>
    )
})

