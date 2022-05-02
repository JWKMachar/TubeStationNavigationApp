import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Card2(props){
    console.log(props.data);
    return(
        <View style={styles.card}>
            <View style={styles.cardcontent}>
                <Text>{props.data}</Text>
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