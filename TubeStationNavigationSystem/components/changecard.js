import React from 'react';
import { StyleSheet, View } from 'react-native';


export default function ChangeCard(props){
    return(
        <View style={styles.card}>
            <View style={styles.cardcontent}>
                {props.children}
            </View>
        </View>
    )
} 

const styles=StyleSheet.create({
    card:{
        marginHorizontal:5,
        marginVertical:20,  
        backgroundColor:'#4290f5',
    },
    cardcontent:{
    }
});