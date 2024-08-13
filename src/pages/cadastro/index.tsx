import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native-animatable'
import * as Animatable from 'react-native-animatable';

export default function Cadastro() {
  return (
    <View style={styles.container}>
        <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
          <Text style={styles.message}>Cadastre-se</Text>
        </Animatable.View>
        <Animatable.View style={styles.containerForm}>

        </Animatable.View>
    </View>

  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#38a69d'
    },
    containerHeader:{
        marginTop:'14%',
        marginBottom:'8%',
        paddingStart:'5%'
    },
    message:{
        fontSize:28,
        fontWeight: 'bold',
        color:'#FFF'
    },
    containerForm:{
        backgroundColor:"#FFF",
        flex:1,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        paddingStart:'5%',
        paddingEnd:'5%'
    },
})