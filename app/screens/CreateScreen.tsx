import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle,StyleSheet } from "react-native"
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useNavigation } from "@react-navigation/native"
import { Button, Text } from "app/components"
import { column } from "@nozbe/watermelondb/QueryDescription"

interface CreateScreen extends AppStackScreenProps<"Create"> {}

export const CreateScreen: FC<CreateScreen> = observer(function CreateScreen(
  _props, 
) {

    const navigation = useNavigation()
    
    const handleButtonPress = () => {
        navigation.goBack()
    }

    useHeader({
        title: "Создание",
    })

  return (
    <View>
        <Text>hello2</Text>
        <Button onPress={handleButtonPress}> Back</Button>
    </View>
  )
})
