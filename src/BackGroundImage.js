import { View, Text, StyleSheet ,Dimensions} from 'react-native'
import React from 'react'
const {height}=Dimensions.get("screen")

export default function BackGroundImage() {
  return (
    <View style={styles.container}>
         <View style={styles.upperStyle}/>
         <View style={styles.lowerStyle}/>
    </View>
  )
}
const styles=StyleSheet.create(({
    container:{
        // flex:1,
        // zIndex:-1
    },
    upperStyle:{
      height:height/3,
     backgroundColor:"#dc143c"
    },
    lowerStyle:{
        height:height-height/3,
        backgroundColor:"#ffebcd",

    }
}))