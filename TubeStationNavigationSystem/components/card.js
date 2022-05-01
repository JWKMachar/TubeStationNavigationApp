import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Card(props){
    console.log(props.data);
    return(
        <View style={styles.card}>
            <View style={styles.cardcontent}>
                <Text>{props.data.station}</Text>
                <Text>{props.data.line}</Text>
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