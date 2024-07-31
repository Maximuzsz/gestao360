import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable'


export default function Login() {
    return (
      <View style={styles.container}>
        <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
          <Text style={styles.message}>Bem-Vindo(a)</Text>
        </Animatable.View>

        <Animatable.View animation='fadeInUp' style={styles.containerForm}>
          <Text style={styles.title}>Login</Text>
          <TextInput 
            placeholder='digite seu login'
            style={styles.input}
          />

          <Text style={styles.title}>Senha</Text>
          <TextInput 
            placeholder='digite sua senha'
            style={styles.input}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Acesssar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRegister}>
            <Text style={styles.buttonRegisterText}>Não Possui uma conta?</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    )
  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#38a69d'
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
  title:{
    fontSize:20,
    marginTop:28
  },
  input:{
    borderBottomWidth:1,
    height:40,
    marginBottom:12,
    fontSize:16
  },
  button:{
    backgroundColor:'#38a69d',
    width:'100%',
    borderRadius:4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent:'center',
    alignItems: 'center'
  },
  buttonText:{
    color:'#FFF',
    fontSize:18,
    fontWeight:'bold'
  },
  buttonRegister:{
    marginTop:14,
    alignSelf:'center',

  },
  buttonRegisterText:{
    color:'#a1a1a1'
  }
});