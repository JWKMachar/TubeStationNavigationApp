import React, { useState, useEffect } from 'react';

import { ScrollView, StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colours from '../Colours';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StationInformationScreen from '../components/StationInformationScreen';

const Stack = createNativeStackNavigator();

const Wrapper = () => {

    const [data, setData] = React.useState({});

    const updateData = (start) => setData({ start })

    return (
        <Stack.Navigator initialRouteName="Information">
            <Stack.Screen name="Information"            component={(props) => <Information    {...props} setData={updateData} />} />
            <Stack.Screen name="Station Information"    component={(props) => <StationInformationScreen    {...props} data={data} />} />
        </Stack.Navigator>
    )
}

const Information = (props) => 
{

    const [stations, setStations] = React.useState();

    React.useEffect(() => {
        (async() => {
            //const raw = await fetch("http://0.0.0.0:8081/stations");
            //const raw = await fetch("http://127.0.0.1:4040/stations");
            const raw = await fetch("http://3d55-62-254-10-235.ngrok.io/stations");
            setStations(await raw.json());
        })()
    },[])

    const [selectStation, setSelectStation] = React.useState();

    const select = () => {
        props.setData(selectStation);
        props.navigation.navigate("Station Information");
    }
    

    if(!stations) return null;
    
    return (
        <SafeAreaView style={styles.container}>
            <Picker
                selectedValue={selectStation}
                onValueChange={(itemValue, itemIndex) =>
                    {
                        setSelectStation(stations[itemIndex])
                    }
                }>
                {stations.map(x => (
                    <Picker.Item label={x} value={x}/>
                ))}
            </Picker>
            <Pressable style={styles.button} onPress={() => select()}>
                <Text style={styles.buttonText}>Station Information</Text>
            </Pressable>
            <Text>{stations.data}</Text>
        </SafeAreaView>
    );
};

export default Wrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.background,
        padding: 10,
    },
    titleText: {
        padding: 8,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headingText: {
        padding: 8,
    },
    button: {
        borderColor: '#F6F6F6',
        backgroundColor: '#8FC98D',
        borderWidth: 2.5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    buttonText: {
        padding: 5,
        color: 'black',
        fontSize: 20,
        textAlign: 'center'
    }
});
