import React, { useState, useEffect } from 'react';

import { ScrollView, StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colours from '../Colours';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResultsScreen from '../components/ResultsScreen';

const Stack = createNativeStackNavigator();

const Wrapper = () => {

    const [data, setData] = React.useState({});

    const updateData = (start, end) => setData({ start, end })

    return (
        <Stack.Navigator initialRouteName="Search">
            <Stack.Screen name="Search" component={(props) => <SearchScreen {...props} setData={updateData} />} />
            <Stack.Screen name="Route" component={(props) => <ResultsScreen {...props} data={data} />} />
        </Stack.Navigator>
    )
}

const SearchScreen = (props) => {

    const [stations, setStations] = React.useState();

    React.useEffect(() => {
        (async() => {
            const raw = await fetch("http://localhost:8081/stations");
            setStations(await raw.json());
        })()
    },[])

    const [selectedStartStation, setSelectedStartStation] = React.useState();
    const [selectedEndStation, setSelectedEndStation] = React.useState();

    const search = () => {
        props.setData(selectedStartStation, selectedEndStation);
        props.navigation.navigate("Route");
    }

    if(!stations) return null;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 0, marginTop: 10, marginBottom: 20 }}>
                Start Station
            </Text>
            <Picker
                selectedValue={selectedStartStation}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedStartStation(stations[itemIndex])
                }>
                {stations.map(x => (
                    <Picker.Item label={x} value={x} />
                ))}
            </Picker>
            <Text style={{ fontSize: 0, marginTop: 10, marginBottom: 20 }}>
                End Station
            </Text>
            <Picker
                selectedValue={selectedEndStation}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedEndStation(stations[itemIndex])
                }>
                {stations.map(x => (
                    <Picker.Item label={x} value={x} />
                ))}
            </Picker>
            <Pressable style={styles.button} onPress={() => search()}>
                <Text style={styles.buttonText}>Search</Text>
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
