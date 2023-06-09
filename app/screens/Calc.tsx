import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import {
  Image,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Text, 
} from "react-native"
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useNavigation } from "@react-navigation/native"
import { LineChart } from 'react-native-chart-kit';

interface CreateCalc extends AppStackScreenProps<"Calc"> {}
export const CreateCalc: FC<CreateCalc> = observer(function CreateCalc(_props) {
    
    const dataForGraf = {
        labels: ['05.06', '06.06', '07.06', '09.06', '09.07', '21.07', '22.07'],
        datasets: [
          {
            data: [70, 72, 71, 73, 75, 74, 76], 
          },
        ],
      };
      const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      };
  const navigation = useNavigation()

 
  useHeader({
    title: "Калькулятор",
  })
  const [weight, setWeight] = React.useState();
 
  return (
      <ScrollView>
         {/* <Image style={styles.Graphic} source={require('../../assets/images/Grafic.png')}></Image> */}
         <LineChart
            data={dataForGraf}
            width={400}
            height={300}
            chartConfig={chartConfig}
            bezier
        />
         <View style={styles.HeaderView}>
              <Text style={styles.TextTitle}>Новая запись:</Text>
              <View style={styles.NewViewlist}>
                  <TextInput 
                  onChangeText={setWeight}
                  value={weight}
                  style={styles.TextInputs}
                  keyboardType="numeric"
                  placeholder='21 кг'
                  ></TextInput>
                  <Text style={styles.BtnAdd}>Добавить</Text>
              </View>
         </View>
         <View style={styles.HeaderViewAll}>
              <Text style={styles.TextTitle}>Все записи:</Text>

              <TouchableOpacity>
                  <Text style={styles.TExtNote}>{'->'} 03.06.2023
                      <Text> Вес: 25 кг</Text>
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                  <Text style={styles.TExtNote}>{'->'} 02.06.2023
                      <Text> Вес: 25.2 кг</Text>
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                  <Text style={styles.TExtNote}>{'->'} 28.05.2023
                      <Text> Вес: 25.4 кг</Text>
                  </Text>
              </TouchableOpacity>

         </View>
      </ScrollView>
  );
 
})

const styles = StyleSheet.create({
    TExtNote:{
        marginTop: 10,
        fontSize: 20,
        borderBottomWidth:0.5,
        marginRight: '10%',
    },
    BtnAdd:{
        height: 50,
        marginLeft: 15,
        borderWidth: 1,
        padding:5,
        fontSize: 20,
        borderRadius: 10,
        backgroundColor: 'rgb(114, 217, 139)',
    },
    NewViewlist:{
        flexDirection:'row',
    },
    TextTitle:{
        marginBottom: "1%",
        fontSize: 20,
        // color: 'rgba(0, 0, 0, 0.459)',
        fontWeight: "500",
    },
    HeaderViewAll:{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: '5%',
    },
    HeaderView:{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: '5%',
        borderBottomWidth: 1,
    },
    Graphic:{
        width: "100%",
        height: 300,
    }, 
    TextInputs:{
        height: 50,
        width: '25%',
     //    border: 1,
        borderWidth: 1,
        padding:5,
        paddingLeft: 20,
        fontSize: 20,
        borderRadius: 10,
     },
})

