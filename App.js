


import { useEffect, useState, useRef } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text, SafeAreaView, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';

import ListScreen from './src/ListScreen';
import moment from 'moment';
import BackGroundImage from './src/BackGroundImage';
import CustomPopup from './src/CustomPopup';
const { height, width } = Dimensions.get("screen")
import DatePicker from 'react-native-date-picker'

function App() {
  const [data, setData] = useState([])
  const [input, setInput] = useState("")
  const [userName, setUserName] = useState("Shashi Ranjan")
  const [userImage, setUserImage] = useState("")
  const inputRef = useRef(null)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [selectDate, setSelectedData] = useState(undefined)


  const InputHanlder = (text) => {
    setInput(text)
  }

  useEffect(() => {
    const image = userName.split(" ")
    setUserImage(`${image[0][0].toUpperCase()} ${image[1][0].toUpperCase()} `)
  }, [])

  const clickHandler = () => {
    let createId = Math.floor(Math.random() * 1000)
    if (input === "" || !selectDate) {
      Alert.alert("Please Enter Task and Date")
    } else {
      let typeData = {
        text: input,
        id: createId,
        completed: false,
        cretedDate: date
      }
      setData([...data, typeData])
      setInput("")
      setDate(new Date())
      setSelectedData(undefined)
      inputRef.current.close()
    }
  }

  const inputHandler = () => {
    inputRef.current.show()
  }

  const openDateHandler = () => {
    setOpen(true)
  }

  const closePopup = () => {
    inputRef.current.close()
    setInput("")
    setDate(new Date())
    setSelectedData(undefined)
  }

  const renderPopupComponent = () => {
    return (
      <View style={styles.inputstyleBox}>
        <TouchableOpacity style={styles.closePopupStyle} onPress={closePopup}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <View style={styles.inputDate}>
          <TextInput
            value={input}
            placeholder='New task'
            onChangeText={InputHanlder}
            style={styles.inputHnalder}
          />
          <TouchableOpacity onPress={openDateHandler} style={styles.DateStyle}>
            <Text> {selectDate ? moment(selectDate).format('LL') : "select date"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={clickHandler}>
          <Text style={{ alignSelf: "center" }}>Add Task</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(selectedDate) => {
            setOpen(false)
            setDate(selectedDate)
            setSelectedData(selectedDate)

          }}
          onCancel={() => {
            setOpen(false)
          }}
        />
      </View>

    )
  }

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.useNamestyle}>
          <Text style={styles.text}>Hi,</Text>
          <Text style={styles.nameText}>{userName}</Text>
        </View>
        <View style={styles.profile}>
          <Text style={styles.styleUserName}>{userImage}</Text>
        </View>
      </View>
    )
  }

  const renderListOfItem = () => <ListScreen
    conatinerStyle={styles.listStyle}
    data={data}
    callBack={setData}
  />

  const rednerAddButton = () => {
    return (
      <TouchableOpacity onPress={inputHandler} style={styles.inputStyle}>
        <Text style={styles.inputText}>Add new SubTask</Text>
        <Text style={styles.addButton}>+</Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <BackGroundImage />
      <View style={styles.container}>
        {renderHeader()}
        {renderListOfItem()}
        {rednerAddButton()}
      </View>
      <CustomPopup
        inputRef={inputRef}
        component={renderPopupComponent}
      >
      </CustomPopup>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    marginTop: 60,
    marginHorizontal: 20
  },
  cancelText:{
    fontSize: 20, 
    fontWeight: '500',
  },
  closePopupStyle: {
    alignSelf: "flex-end",
    marginBottom: 20
  },
  listStyle: {
    height: height - height / 3
  },
  inputHnalder: {
    flex: 1,
    paddingLeft: 5,
    borderTopLeftRadius: 10,
    borderWidth: 1,
    height: 40,
    borderStyle: 'dashed'
  },
  DateStyle: {
    alignContent: "center",
    justifyContent: 'center',
    borderTopEndRadius: 8,
    borderWidth: 1,
    padding: 3,
    height: 40,
    borderStyle: 'dashed'
  },


  text: {
    fontSize: 20

  },
  button: {
    borderWidth: 1,
    borderColor: "red",
    borderStyle: "solid",
    padding: 10,
    marginTop: 30,
    width: width / 3
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  profile: {
    height: 80,
    width: 80,
    backgroundColor: "grey",
    borderRadius: 80 / 2,
    justifyContent: "center",
    alignItems: 'center'
  },
  styleUserName: {
    fontSize: 30
  },
  useNamestyle: {
    flexDirection: "row",
    width: "40%",
    justifyContent: 'space-between'
  },
  nameText: {
    fontSize: 20,
    fontWeight: "500"

  },
  inputStyle: {
    borderRadius: 12,
    borderWidth: 1,
    height: 50,
    borderStyle: "dashed",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20

  },
  inputText: {
    fontSize: 20
  },
  addButton: {
    fontSize: 40,
    color: 'red'
  },
  inputstyleBox: {
    justifyContent: "center",
    alignItems: 'center'
  },
  inputDate: {
    flexDirection: "row",
    width: width - width / 4
  }
});

export default App;
