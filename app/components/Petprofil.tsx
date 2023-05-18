import { View } from "react-native";
import { Image, ImageStyle, TextStyle, ViewStyle,StyleSheet,TouchableOpacity } from "react-native"





export const Petprofile = (props) =>{
    return(
        <View></View>    
   
    );
}
const styles = StyleSheet.create({
    Profil:{
        flexDirection:'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor:'rgba(12, 12, 12, 0.1)',
        borderStyle:'solid',
    },
    Myimage:{
        width: 100,
        height: 100,
        borderRadius: 20,
        marginRight: 12,
    },
    Genderimg:{
        width: 30,
        height: 30,
        borderRadius: 20,
    },
    Name:{
        fontSize: 30,
    },
    Profdetails:{
        justifyContent: 'center',
    },
    Age:{
        fontSize:20,
    },
})


