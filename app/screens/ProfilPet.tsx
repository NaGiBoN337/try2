import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle,StyleSheet } from "react-native"
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
        <View style = {styles.MainDiv}>
                    <View style = {styles.Header}>
                        <View style={styles.HeaderDivText}>
                            <Text style={styles.NameT}>Elizabet</Text>
                            <Text>Африканский бульдог, 7 лет</Text>
                        </View>
                        {/* <Image style = {styles.ImgHeader}></Image> */}
                    </View>

                  
            </View>
            {/* <Button onPress={handleButtonProfile}> profile</Button> */}
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
        height: 65,
        width: 65,
        // borderRadius:20,
    },
    Headerinput:{
        marginBottom:"1%",
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.459)',
        fontWeight: "500",
    },
    HeaderDivText:{
        justifyContent:'center',
    },
    NameT:{
        fontSize: 20,
        fontWeight: "500",
    },
    ContainerDiv:{
        marginTop: "5%",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ContainerBtn:{
        width: 150,
        padding: 25,
        paddingTop: 15,
        backgroundColor: 'rgb(197, 209, 146)',
        borderRadius: 30,
        alignItems: 'center',
    },
    Texbtn:{
        marginTop:'5%',
        textAlign: 'center',
        fontSize: 30,
        borderRadius: 10,
        padding: 15,
        backgroundColor: 'rgb(114, 217, 139)',
        border:1 ,
    },
})
