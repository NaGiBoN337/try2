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
} from "react-native"
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useNavigation } from "@react-navigation/native"
import { Button, Text } from "app/components"
import { SelectList } from "react-native-dropdown-select-list"
import BtnTime from "app/components/BtnTime"
import SQLite, { SQLTransaction, SQLError, SQLResultSet } from "react-native-sqlite-2"
import PetsList from "app/arrayinfo/typePets"
import { formatDate } from "app/Functions/Mainfunc"
import { OptionsCommon, launchImageLibrary } from "react-native-image-picker"

const db = SQLite.openDatabase("mydatabase.db", "1.0", "", 1)

interface CreateScreen extends AppStackScreenProps<"Create"> {}

const CreateScreen: FC<CreateScreen> = observer(function CreateScreen(_props) {
  const navigation = useNavigation()

  const handleButtonPress = async () => {
    try {
      await insertData()
      navigation.goBack()
    } catch (error) {
      console.log("Ошибка при вставке данных:", error)
    }
  }

  const [selected, setSelected] = React.useState("")
  const [name, onChangeName] = React.useState("")
  const [dateBirth, setDateBirth] = React.useState()
  const [selectedGender, setSelectedGender] = React.useState("male")
  const [imageData, setImageData] = React.useState("")

  const handleGenderPress = (gender) => {
    console.log(gender)
    setSelectedGender(gender)
  }
  const handleButtonPressl = () => {
    console.log(dateBirth)
  }
  useHeader({
    title: "Создание нового профиля",
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
  const insertData = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          "INSERT INTO pets (name, type, gender, dateBirth, imgbase) VALUES (?, ?, ?, ?, ?);",
          [name, selected, selectedGender, formatDate(dateBirth), imageData],
          (tx: SQLTransaction, result: SQLResultSet) => {
            console.log("Данные успешно вставлены!")
            resolve(result)
          },
          (tx: SQLTransaction, error: SQLError) => {
            console.log("Ошибка при вставке данных:", error)
            reject(error)
          },
        )
      })
    })
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={chooseImage}>
        {/* <Image
          style={styles.UploadImg}
          source={require("../../assets/images/selectgen2.png")}
        ></Image> */}
        {imageData ? (
          <Image style={styles.UploadImg} source={{ uri: `data:image/jpeg;base64,${imageData}` }} />
        ) : (
          <Image
            style={styles.UploadImg}
            source={require("../../assets/images/selectgen2.png")}
          ></Image>
        )}
      </TouchableWithoutFeedback>
      <View style={styles.MainDiv}>
        <View style={styles.ContainerDiv}>
          <Text style={styles.HeaderInput}>Кличка:</Text>
          <TextInput
            onChangeText={onChangeName}
            style={styles.TextInputs}
            maxLength={25}
            placeholder="Введите имя:"
          />
        </View>
        <View>
          <Text style={styles.HeaderInput}>Выберите вид:</Text>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={PetsList}
            save="value"
            searchPlaceholder="поиск"
            placeholder="не выбрано"
          />
        </View>
        <View style={styles.ContainerDiv}>
          <Text style={styles.HeaderInput}>Дата рождения:</Text>
          <BtnTime
            onChange={setDateBirth}
            textBtn="Выбрать дату рождения"
            selectedDate={dateBirth}
          ></BtnTime>
        </View>
        <View style={styles.ContainerDiv}>
          <Text style={styles.HeaderInput}>Гендер:</Text>
          <View style={styles.DivImg}>
            <TouchableOpacity
              style={[selectedGender === "male" ? styles.selectedButton : styles.unselectedButton]}
              onPress={() => handleGenderPress("male")}
            >
              <Image
                style={styles.ImgGender}
                source={require("../../assets/images/man.png")}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                selectedGender === "female" ? styles.selectedButton : styles.unselectedButton,
              ]}
              onPress={() => handleGenderPress("female")}
            >
              <Image
                style={styles.ImgGender}
                source={require("../../assets/images/woman.png")}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.ContainerDiv}>
          <Button style={styles.TextBtn} onPress={handleButtonPress}>
            {" "}
            Создать
          </Button>
          <Button style={styles.TextBtn} onPress={handleButtonPressl}>
            {" "}
            check
          </Button>
        </View>
      </View>
    </ScrollView>
  )
})

const styles = StyleSheet.create({
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
  DivImg: {
    borderColor: "rgba(118, 211, 12, 0.5)",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ContainerDiv: {
    marginTop: "5%",
  },
  MainDiv: {
    flexDirection: "column",
    marginLeft: "10%",
    marginRight: "10%",
  },
  ImgGender: {
    width: 85,
    height: 85,
    opacity: 0.5,
  },
  UploadImg: {
    borderRadius: 20,
    marginTop: "5%",
    width: 140,
    height: 140,
    alignSelf: "center",
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
    border: 1,
  },
  unselectedButton: {
    opacity: 0.5,
  },
  selectedButton: {
    opacity: 1,
  },
})

export default CreateScreen
