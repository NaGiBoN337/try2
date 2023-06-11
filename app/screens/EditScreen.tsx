import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import {
  TextInput,
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
import BtnTime from "app/components/BtnTime"
import { OptionsCommon, launchImageLibrary } from "react-native-image-picker"

const db = SQLite.openDatabase("mydatabase.db", "1.0", "", 1)

interface EditScr extends AppStackScreenProps<"Edit"> {}

export const EditScr: FC<EditScr> = observer(function EditScr({ route }) {
  const [petsData, setPetsData] = useState([])

  const [name, onChangeName] = React.useState("")
  const [breed, onChangebreed] = React.useState("")
  const [dateBirth, setDateBirth] = React.useState()
  const [imageData, setImageData] = React.useState("")

  const { idPet } = route.params

  const parseDate = (dateString: string): Date => {
    const parts = dateString.split(".")
    const day = parseInt(parts[0])
    const month = parseInt(parts[1]) - 1
    const year = parseInt(parts[2])
    return new Date(year, month, day)
  }
  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    if (petsData.length > 0) {
      onChangeName(petsData[0]?.name)
      onChangebreed(petsData[0]?.type)
      setDateBirth(parseDate(petsData[0]?.dateBirth))
      setImageData(petsData[0]?.imgbase)
    }
  }, [petsData])

  const navigation = useNavigation()

  const handleButtonPress = () => {
    navigation.goBack()
  }

  useHeader({
    title: "Профиль",
  })
  const chooseImage = () => {
    const options: OptionsCommon = {
      includeBase64: true,
      mediaType: "photo",
    }

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker")
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage)
      } else {
        // Выбор изображения успешен, здесь вы можете обработать выбранное изображение
        console.log("Base64: ", response.assets[0].base64)
        setImageData(response.assets[0].base64)
      }
    })
  }
  const fetchData = async () => {
    try {
      const pet = await new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM pets WHERE id = ?;",
            [idPet],
            (tx: SQLTransaction, resultSet: SQLResultSet) => {
              if (resultSet.rows.length > 0) {
                const pet = resultSet.rows.item(0)
                resolve(pet)
              } else {
                resolve(null)
              }
            },
            (tx: SQLTransaction, error: SQLError) => {
              reject(error)
            },
          )
        })
      })

      console.log(pet)
      console.log(pet.dateBirth)
      setPetsData(pet ? [pet] : [])
    } catch (error) {
      console.log("Ошибка при выборке данных:", error)
    }
  }
  const updatePetData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE pets SET name = ?, type = ?, dateBirth = ?, imgbase = ? WHERE id = ?;',
        [name, breed, formatDate(dateBirth), imageData, idPet],
        (tx, result) => {
          if (result.rowsAffected > 0) {
            console.log('Данные питомца успешно обновлены!');
          } else {
            console.log('Не удалось обновить данные питомца.');
          }
        },
        (tx: SQLTransaction, error: SQLError) => {
          console.log('Ошибка при обновлении данных питомца:', error);
        }
      );
    });
  };

  return (
    <View>
      <View style={styles.MainDiv}>
        {petsData.length > 0 ? (
          <TouchableOpacity onPress={chooseImage}>
            <Image
              style={styles.UploadImg}
              source={{ uri: `data:image/jpeg;base64,${imageData}` }}
            ></Image>
          </TouchableOpacity>
        ) : (
          <Image
            style={styles.UploadImg}
            source={require("../../assets/images/loading.png")}
          ></Image>
        )}

        {petsData.length > 0 ? (
          <View style={styles.ContainerDiv}>
            <Text style={styles.HeaderInput}>Имя:</Text>
            <TextInput
              style={styles.TextInputs}
              onChangeText={onChangeName}
              value={name}
            ></TextInput>
          </View>
        ) : (
          <View style={styles.ContainerDiv}>
            <Text style={styles.HeaderInput}>Имя:</Text>
            <TextInput style={styles.TextInputs} onChangeText={onChangeName}></TextInput>
          </View>
        )}

        <View style={styles.ContainerDiv}>
          <Text style={styles.HeaderInput}>Порода:</Text>
          <TextInput
            style={styles.TextInputs}
            onChangeText={onChangebreed}
            value={breed}
          ></TextInput>
        </View>

        <View style={styles.ContainerDiv}>
          <Text style={styles.HeaderInput}>Дата рождения:</Text>
          {dateBirth != null ? (
            <BtnTime
              onChange={setDateBirth}
              textBtn="Выбрать дату рождения"
              selectedDate={dateBirth}
            ></BtnTime>
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={styles.ContainerDiv}>
          {/* <Button style={styles.TextBtn} title='Сохранить' fontSize={30} padding={15} color={'rgb(114, 217, 139)'}/> */}
          <Text style={styles.TextBtn} onPress={updatePetData}>
            {" "}
            Сохранить
          </Text>
        </View>
      </View>
    </View>
  )
})
const styles = StyleSheet.create({
  UploadImg: {
    borderRadius: 30,
    marginTop: "5%",
    width: 140,
    height: 140,
    alignSelf: "center",
  },
  MainDiv: {
    flexDirection: "column",
    marginLeft: "10%",
    marginRight: "10%",
  },
  TextInputs: {
    height: 50,
    // //    width: '60%',
    //    border: 1,

    borderWidth: 1,
    padding: 5,
    paddingLeft: 20,
    fontSize: 20,
    borderRadius: 10,
  },
  ContainerDiv: {
    marginTop: "5%",
  },
  HeaderInput: {
    // marginBottom: "1%",
    fontSize: 20,
    // color: 'rgba(0, 0, 0, 0.459)',
    // fontWeight: 500,
  },
  TextBtn: {
    textAlign: "center",
    fontSize: 30,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "rgb(114, 217, 139)",
    borderWidth: 1,
  },
})
