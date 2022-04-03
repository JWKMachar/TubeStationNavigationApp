import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card(props){
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
        marginHorizontal:4,
        marginVertical:12,
            
    },
    cardcontent:{
        
    }
});