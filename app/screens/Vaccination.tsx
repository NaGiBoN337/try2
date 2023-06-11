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
import { column } from "@nozbe/watermelondb/QueryDescription"
import { SelectList } from "react-native-dropdown-select-list"
import BtnTime from "app/components/BtnTime"
import withObservables from "@nozbe/with-observables"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import SQLite, { SQLTransaction, SQLError, SQLResultSet } from "react-native-sqlite-2"
import { formatDate } from "app/Functions/Mainfunc"

const db = SQLite.openDatabase("mydatabase.db", "1.0", "", 1)

interface CreateVaccination extends AppStackScreenProps<"Vaccination"> {}

export const CreateVaccination: FC<CreateVaccination> = observer(function CreateVaccination({ route }) {

  const navigation = useNavigation()

  useHeader({
    title: "Vaccination",
  })

  const [selectedLabel, setSelectedLabel] = React.useState("")
  const [selectedTime, setSelectedTime] = React.useState("")
  const [valueCom, onChangeComment] = React.useState("")

  const [dateVac, setDateVac] = React.useState()
  const { idPet } = route.params
  const dataVac = [
    { key: "1", value: "Rabies Vaccine" },
    { key: "2", value: "Distemper Vaccine" },
    { key: "3", value: "Parvovirus Vaccine" },
    { key: "4", value: "Bordetella Vaccine" },
    { key: "5", value: "Leptospirosis Vaccine" },
    { key: "6", value: "Lyme Disease Vaccine" },
    { key: "7", value: "Canine Influenza Vaccine" },
    { key: "8", value: "Feline Leukemia Vaccine" },
    { key: "9", value: "Feline Calicivirus Vaccine" },
    { key: "10", value: "Feline Herpesvirus Vaccine" },
    { key: "11", value: "Canine Parainfluenza Vaccine" },
    { key: "12", value: "Canine Coronavirus Vaccine" },
    { key: "13", value: "Equine Influenza Vaccine" },
    { key: "14", value: "Equine West Nile Virus Vaccine" },
    { key: "15", value: "Avian Influenza Vaccine" },
    { key: "16", value: "Canine Parvovirus-Adenovirus Vaccine" },
    { key: "17", value: "Feline Panleukopenia Vaccine" },
    { key: "18", value: "Canine Bordetella Vaccine" },
    { key: "19", value: "Canine Distemper-Measles Vaccine" },
    { key: "20", value: "Feline Rabies Vaccine" },
    { key: "21", value: "Canine Leptospirosis Vaccine" },
    { key: "22", value: "Canine Lyme Disease Vaccine" },
    { key: "23", value: "Equine Tetanus Toxoid Vaccine" },
    { key: "24", value: "Avian Newcastle Disease Vaccine" },
    { key: "25", value: "Bovine Respiratory Syncytial Virus Vaccine" },
  ]
  const dataTimeVac = [
    { key: "1", value: "Три недели" },
    { key: "2", value: "Раз в год" },
    { key: "3", value: "Раз в пол года" },
  ]
  const insertVaccinationData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Vaccination (id_pet, date, comment, frequency, drug_name) VALUES (?, ?, ?, ?, ?);',
        [idPet, formatDate(dateVac), valueCom, selectedTime, selectedTime],
        (tx: SQLTransaction, result: SQLResultSet) => {
          console.log('Данные успешно вставлены в таблицу "Vaccination"');
        },
        (tx: SQLTransaction, error: SQLError) => {
          console.log('Ошибка при вставке данных в таблицу "Vaccination":', error);
        }
      );
    });
  };

  return (
    <ScrollView>
      <View style={styles.MainDiv}>
        <Image style={styles.UploadImg} source={require("../../assets/images/vaccine.png")}></Image>

        <View style={styles.ContainerDiv}>
          <Text style={styles.HeaderInput}>Навание препарата:</Text>
          <SelectList
            setSelected={(val) => setSelectedLabel(val)}
            data={dataVac}
            save="value"
            searchPlaceholder="поиск"
            placeholder="не выбрано"
          />
        </View>
        <View style={styles.ContainerDiv}>
          <Text style={styles.HeaderInput}>Повторяемость:</Text>
          <SelectList
            setSelected={(val) => setSelectedTime(val)}
            data={dataTimeVac}
            save="value"
            searchPlaceholder="поиск"
            placeholder={dataTimeVac[0].value}
          />
        </View>
        <View style={styles.ContainerDiv}>
          <Text style={styles.HeaderInput}>Дата:</Text>
          <BtnTime onChange={setDateVac} textBtn="Выбрать дату" selectedDate={dateVac}></BtnTime>
        </View>

        <View style={styles.ContainerDiv}>
          <Text style={styles.HeaderInput}>Коментарий:</Text>
          <TextInput
            editable
            multiline
            numberOfLines={3}
            style={styles.MyPadding}
            value={valueCom}
            maxLength={100}
            onChangeText={(val) => onChangeComment(val)}
          ></TextInput>
        </View>

        <View style={styles.ContainerDiv}>
          {/* <Button style={styles.TextBtn} title='Сохранить' fontSize={30} padding={15} color={'rgb(114, 217, 139)'}/> */}
          <Text style={styles.TextBtn} onPress={insertVaccinationData}> Сохранить</Text>
        </View>
      </View>
    </ScrollView>
  )
})
const styles = StyleSheet.create({
  MyPadding: {
    padding: 10,
    // //    width: '60%',
    //    border: 1,
    borderWidth: 1,
    paddingLeft: 20,
    fontSize: 20,
    borderRadius: 10,
  },
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
    marginBottom: "1%",
    fontSize: 20,
    // color: 'rgba(0, 0, 0, 0.459)',
    fontWeight: "500",
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
