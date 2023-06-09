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
  ScrollView,
} from "react-native"
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useNavigation } from "@react-navigation/native"
import { Button, Text } from "app/components"
import { useEffect, useState } from "react"
import { formatDate } from "app/Functions/Mainfunc"
import SQLite, { SQLTransaction, SQLError, SQLResultSet } from "react-native-sqlite-2"
import calculateAge from "app/Functions/CalcDate"



const db = SQLite.openDatabase("mydatabase.db", "1.0", "", 1)

interface ProfilPet extends AppStackScreenProps<"Profil"> {}

export const ProfilPet: FC<ProfilPet> = observer(function ProfilPet({ route }) {
  const [petsData, setPetsData] = useState([])
  useEffect(() => {
    fetchData();
  }, []);
  
  const navigation = useNavigation()

  const handleButtonPress = () => {
    navigation.goBack()
  }
  const handleVaccination = () => {
    navigation.navigate("Vaccination")
  }
  const handleCalc = () => {
    navigation.navigate("Calc")
  }
  useHeader({
    title: "Профиль",
  })
  const { idPet } = route.params


  const fetchData = async () => {
    try {
      const pet = await new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM pets WHERE id = ?;',
            [idPet],
            (tx: SQLTransaction, resultSet: SQLResultSet) => {
              if (resultSet.rows.length > 0) {
                const pet = resultSet.rows.item(0);
                resolve(pet);
              } else {
                resolve(null);
              }
            },
            (tx: SQLTransaction, error: SQLError) => {
              reject(error);
            }
          );
        });
      });
  
      console.log(pet);
      console.log(pet.dateBirth);
      setPetsData(pet ? [pet] : []);
    } catch (error) {
      console.log('Ошибка при выборке данных:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.MainDiv}>
        <View style={styles.Header}>
          <View style={styles.HeaderDivText}>
            <Text style={styles.NameT}>{petsData[0]?.name}</Text>
            <Text>{petsData[0]?.type}, {calculateAge(petsData[0]?.dateBirth)}</Text>
          </View>
          <Image style={styles.ImgHeader} source={require("../../assets/images/123.jpg")}></Image>
        </View>
        <View style={styles.ContainerDiv}>
          <Text style={styles.Headerinput}>Выберите запись:</Text>
        </View>

        <View style={styles.ContainerDiv}>
          <TouchableOpacity onPress={handleVaccination}>
            <View style={[styles.box, styles.ContainerBtn]}>
              <Image
                style={styles.ImgNote}
                source={require("../../assets/images/vaccine.png")}
              ></Image>
              <Text>Вакцинация</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={[styles.box, styles.ContainerBtn]}>
              <Image style={styles.ImgNote} source={require("../../assets/images/lab.png")}></Image>
              <Text>Анализы</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.ContainerDiv}>
          <View style={[styles.box, styles.ContainerBtn]}>
            <Image
              style={styles.ImgNote}
              source={require("../../assets/images/x-rayy.png")}
            ></Image>
            <Text>Узи/рентген</Text>
          </View>

          <View style={[styles.box, styles.ContainerBtn]}>
            <Image
              style={styles.ImgNote}
              source={require("../../assets/images/cleaning.png")}
            ></Image>
            <Text>Проф. меры</Text>
          </View>
        </View>

        <View style={styles.ContainerDiv}>
          <View style={[styles.box, styles.ContainerBtn]}>
            <Image
              style={styles.ImgNote}
              source={require("../../assets/images/veterinarian.png")}
            ></Image>
            <Text>Посейщение врача</Text>
          </View>
          <TouchableOpacity onPress={handleCalc}>
            <View style={[styles.box, styles.ContainerBtn]}>
              <Image style={styles.ImgNote} source={require("../../assets/images/bmi.png")}></Image>
              <Text>Учет веса</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Button onPress={handleButtonPress}> Back</Button>
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  box: {
    elevation: 10,
    shadowColor: "#000000",
    shadowOffset: { width: -15, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  MainDiv: {
    flexDirection: "column",
    marginLeft: "5%",
    marginRight: "5%",
  },
  Header: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ImgHeader: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  ImgNote: {
    height: 65,
    width: 65,
    // borderRadius:20,
  },
  Headerinput: {
    marginBottom: "1%",
    fontSize: 20,
    color: "rgba(0, 0, 0, 0.459)",
    fontWeight: "500",
  },
  HeaderDivText: {
    justifyContent: "center",
  },
  NameT: {
    fontSize: 23,
    fontWeight: "600",
  },
  ContainerDiv: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ContainerBtn: {
    width: 150,
    padding: 25,
    paddingTop: 15,
    backgroundColor: "rgb(197, 209, 146)",
    borderRadius: 30,
    alignItems: "center",
  },
  Texbtn: {
    marginTop: "5%",
    textAlign: "center",
    fontSize: 30,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "rgb(114, 217, 139)",
    border: 1,
  },
})
