import React, { useState, useEffect } from 'react';

import { ScrollView, StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colours from '../Colours';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResultsScreen from '../components/ResultsScreen';
import StationsScreen from '../components/StationsScreen';

const Stack = createNativeStackNavigator();

const Wrapper = () => {

    const [data, setData] = React.useState({});

    const updateData = (start, end) => setData({ start, end })

    return (
        <Stack.Navigator initialRouteName="Search">
            <Stack.Screen name="Search"     component={(props) => <SearchScreen     {...props} setData={updateData} />} />
            <Stack.Screen name="MapView"    component={(props) => <ResultsScreen    {...props} data={data} />} />
            <Stack.Screen name="ListView"   component={(props) => <StationsScreen   {...props} data={data} />} />
        </Stack.Navigator>
    )
}

const SearchScreen = (props) => {

    const [stations, setStations] = React.useState();

    React.useEffect(() => {
        (async() => {
            //const raw = await fetch("http://0.0.0.0:8081/stations");
            //const raw = await fetch("http://127.0.0.1:4040/stations");
            const raw = await fetch("http://c8bd-62-254-10-235.ngrok.io/stations");
            setStations(await raw.json());
        })()
    },[])

    const [selectedStartStation, setSelectedStartStation] = React.useState();
    const [selectedEndStation, setSelectedEndStation] = React.useState();

    const MapView = () => {
        props.setData(selectedStartStation, selectedEndStation);
        props.navigation.navigate("MapView");
    }
    const ListView = () => {
        props.setData(selectedStartStation, selectedEndStation);
        props.navigation.navigate("ListView");
    }

    if(!stations) return null;

    return (
        <SafeAreaView style={styles.container}>
            <Picker
                selectedValue={selectedStartStation}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedStartStation(stations[itemIndex])
                }>
                {stations.map(x => (
                    <Picker.Item label={x} value={x} />
                ))}
            </Picker>
            <Picker
                selectedValue={selectedEndStation}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedEndStation(stations[itemIndex])
                }>
                {stations.map(x => (
                    <Picker.Item label={x} value={x} />
                ))}
            </Picker>
            <Pressable style={styles.button} onPress={() => MapView()}>
                <Text style={styles.buttonText}>Map View</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => ListView()}>
                <Text style={styles.buttonText}>List View</Text>
            </Pressable>
        
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
