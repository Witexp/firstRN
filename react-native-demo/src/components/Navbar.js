import React, { Component } from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'
import {THEME} from'../theme'
import { AppTextBold } from './ui/AppTextBold'

export const Navbar = ({ title }) => {
    return(
        <View style = {{...styles.navbar, ...Platform.select({
            ios: styles.navbarIos,
            android: styles.navbarAndroid
        })}}>
            <AppTextBold style = {styles.text}>{ title }</AppTextBold>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar:{
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    navbarIos:{
        borderBottomColor: THEME.MAIN_COLOR,
        borderWidth: 1
    },
    navbarAndroid:{
        backgroundColor: THEME.MAIN_COLOR,
    },
    text: {
        color: Platform.OS === 'ios' ? THEME.MAIN_COLOR : 'white',
        fontSize: 20,
    }
   
})