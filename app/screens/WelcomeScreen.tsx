import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Button, Text } from "app/components"
import { Image, ImageStyle, TextStyle, View, ViewStyle,StyleSheet,TouchableOpacity,ScrollView } from "react-native"
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useNavigation } from "@react-navigation/native"
import { Petprofile } from "app/components/Petprofil"
import React, { useEffect, useState } from 'react';
import SQLite, { SQLTransaction, SQLError, SQLResultSet } from 'react-native-sqlite-2';
import calculateAge from "app/Functions/CalcDate"

const db = SQLite.openDatabase('mydatabase.db', '1.0', '', 1);


interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> { }

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
    _props,
) {

    const [petsData, setPetsData] = useState([]);
      
    const navigation = useNavigation<any>()

    const handleButtonCreate = () => {
        console.log('переход');
        navigation.navigate("Create")
    }
    const handleButtonProfile = (idPet) => {
        navigation.navigate("Profil",{idPet})
    }
    useHeader({
        title: "PetsProfile",
       
    })
    useEffect(() => {
        checkAndCreateDatabase();
        fetchData();
      }, []);
    
      const checkAndCreateDatabase = () => {
        db.transaction((tx: SQLTransaction) => {
          tx.executeSql(
            'SELECT name FROM sqlite_master WHERE type="table" AND name="pets";',
            [],
            (tx: SQLTransaction, result: SQLResultSet) => {
              if (result.rows.length === 0) {
                createTable();
              }
            },
            (tx: SQLTransaction, error: SQLError) => {
              console.log('Ошибка при проверке базы данных:', error);
            }
          );
        });
      };
    
      const createTable = () => {
        db.transaction((tx: SQLTransaction) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS pets (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, gender TEXT, dateBirth TEXT, imgbase TEXT);',
            [],
            (tx: SQLTransaction, result: SQLResultSet) => {
              console.log('Таблица создана успешно!');
            },
            (tx: SQLTransaction, error: SQLError) => {
              console.log('Ошибка при создании таблицы:', error);
            }
          );
        });
      };



      const fetchData = () => {
        db.transaction((tx: SQLTransaction) => {
          tx.executeSql(
            'SELECT * FROM pets;',
            [],
            (tx: SQLTransaction, result: SQLResultSet) => {
              const pets = [];
              for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows.item(i);
                pets.push(row);
              }
              console.log(pets);
              setPetsData(pets);
            },
            (tx: SQLTransaction, error: SQLError) => {
              console.log('Ошибка при выборке данных:', error);
            }
          );
        });
      };

    return (
        <ScrollView>


         {petsData.map((pet) => (
            <TouchableOpacity onPress={() => handleButtonProfile(pet.id)} key={pet.id}>
                <Petprofile 
                post ={{
                    name : pet.name,
                    age : calculateAge(pet.dateBirth),
                    'gender' : pet.gender === 'male' ? require('../../assets/images/man.png') : require('../../assets/images/woman.png'),
                    'frofileImg': require('../../assets/images/321.jpg'),
                }}
                ></Petprofile>
            </TouchableOpacity>
      ))}

        <TouchableOpacity onPress={handleButtonProfile}>
            <Petprofile 
            post ={{
                name : "elizabet",
                age : "7",
                'gender' : require('../../assets/images/woman.png'),
                'frofileImg': require('../../assets/images/123.jpg'),
            }}
            ></Petprofile>
        </TouchableOpacity>

            <Button style={styles.Textbtn} onPress={handleButtonCreate}> Создать</Button>
            <Button onPress={fetchData} >select</Button>
        </ScrollView>
    )
})

const styles = StyleSheet.create({
    Textbtn:{
        textAlign:'center',
        fontSize: 30,
        borderRadius: 10,
        padding: 15,
        backgroundColor: 'rgb(114, 217, 139)',
        border: 1,
    }
})





