import { View } from "react-native";
import { Image,Text, ImageStyle, TextStyle, ViewStyle,StyleSheet,TouchableOpacity } from "react-native"





export const Petprofile = (props) =>{
    return(
        <View style = {styles.Profil}>
                <Image style={styles.Myimage} source={props.post.frofileImg}></Image>
                <View style={styles.Profdetails}>
                    <Text style={styles.Name}> {props.post.name}</Text>
                    <Text style={styles.Age}>Age: {props.post.age}</Text>
                    <Image style={styles.Genderimg} source={props.post.gender}></Image>
                </View>
        </View>    
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


