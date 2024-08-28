import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/header';
import * as Animatable from 'react-native-animatable';




export default function Menu() {

    return(
        <View style={styles.container}>
            <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
                <Header/>   

            </Animatable.View>
            

        </View>
    );

}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        backgroundColor: '#3b5998', // Cor de fundo do header
    },
    containerHeader: {
        marginTop: '10%',
        marginBottom: '2%',
        paddingStart: '2%',
        alignItems: 'center',
    },

})