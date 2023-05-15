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

const styles = StyleSheet.create({
    box:{
        elevation: 10,
        shadowColor: "#000000",
        shadowOffset: {width: -15, height: 10},
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    MainDiv:{
        flexDirection: "column",
        marginLeft:"5%",
        marginRight:"5%",
    },
    Header:{
        marginTop:"5%",
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    ImgHeader:{
        height: 100,
        width: 100,
        borderRadius:20,
    },
    ImgNote:{

    },
})


// const ImgNote = styled.Image`
//     height: 65px;
//     width: 65px;
//     /* border-radius: 20px; */
// `;
// const Headerinput = styled.Text`
//     margin-bottom: 1%;
//     font-size: 20px;
//     color: rgba(0, 0, 0, 0.459);
//     font-weight: 500;
// `;
// const HeaderDivText = styled.View`
//     justify-content: center;
// `;
// const NameT = styled.Text`
//     font-size: 20px;
//     font-weight: 500;
// `;


// const ContainerDiv = styled.View`
//     margin-top:5%;
//     flex-direction: row;
//     justify-content: space-between;
// `;

// const ContainerBtn = styled.View`
//     width: 150px;
//     padding: 25px;
//     padding-top: 15px;
//     background-color: rgb(197, 209, 146);
//     border-radius: 30px;
//     align-items: center;
// `;
// const Textbtn = styled.Text`
//     margin-top:5%;
//     text-align: center;
//     font-size: 30px;
//     border-radius: 10px;
//     padding: 15px;
//     background-color: rgb(114, 217, 139);
//     border: 1px;
// `;
