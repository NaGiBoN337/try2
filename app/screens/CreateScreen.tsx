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
import { column } from "@nozbe/watermelondb/QueryDescription"
import { SelectList } from "react-native-dropdown-select-list"
import BtnTime from "app/components/BtnTime"
import withObservables from "@nozbe/with-observables"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import SQLite, { SQLTransaction, SQLError, SQLResultSet } from "react-native-sqlite-2"
import PetsList from "app/arrayinfo/typePets"
import { formatDate } from "app/Functions/Mainfunc"
const db = SQLite.openDatabase("mydatabase.db", "1.0", "", 1)

interface CreateScreen extends AppStackScreenProps<"Create"> {}

const CreateScreen: FC<CreateScreen> = observer(function CreateScreen(_props) {
  //   const chooseAndSaveImage = () => {
  //       const options: ImageLibraryOptions = {
  //         mediaType: 'photo',
  //       };

  //       ImagePicker.launchImageLibrary(options, async (response: ImagePickerResponse) => {
  //         if (response.didCancel) {
  //           console.log('Отменено пользователем');
  //         } else if (response.errorCode) {
  //           console.log('Ошибка:', response.errorCode);
  //         } else {
  //           const imageData = await readFile(response.assets[0].base64, 'base64');

  //           console.log('Код изображения:', imageData);
  //         }
  //       });
  //     };

  const navigation = useNavigation()

  const handleButtonPress = async () => {
    try {
      await insertData();
      navigation.goBack();
    } catch (error) {
      console.log('Ошибка при вставке данных:', error);
    }
  };

  const [selected, setSelected] = React.useState("")
  const [name, onChangeName] = React.useState("")
  const [dateBirth, setDateBirth] = React.useState()

  
  const [selectedGender, setSelectedGender] = React.useState("male")

  const handleGenderPress = (gender) => {
    console.log(gender)
    setSelectedGender(gender)
  }

  useHeader({
    title: "Создание нового профиля",
  })

  const insertData = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          "INSERT INTO pets (name, type, gender, dateBirth, imgbase) VALUES (?, ?, ?, ?, ?);",
          [name, selected, selectedGender, formatDate(dateBirth), "base64 image data"],
          (tx: SQLTransaction, result: SQLResultSet) => {
            console.log("Данные успешно вставлены!");
            resolve(result);
          },
          (tx: SQLTransaction, error: SQLError) => {
            console.log("Ошибка при вставке данных:", error);
            reject(error);
          }
        );
      });
    });
  };
 
  return (
    <ScrollView>
      <TouchableWithoutFeedback>
        <Image
          style={styles.UploadImg}
          source={require("../../assets/images/selectgen2.png")}
        ></Image>
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
