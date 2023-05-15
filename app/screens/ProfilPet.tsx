import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useNavigation } from "@react-navigation/native"
import { Button, Text } from "app/components"

interface ProfilPet extends AppStackScreenProps<"Profil"> {}

export const ProfilPet: FC<ProfilPet> = observer(function ProfilPet(
  _props, 
) {

    const navigation = useNavigation()
    
    const handleButtonPress = () => {
        navigation.goBack()
    }

    useHeader({
        title: "Профиль",
    })

  return (
    <View>
        <Text>Profil</Text>
        <Button onPress={handleButtonPress}> Back</Button>
    </View>
  )
})

