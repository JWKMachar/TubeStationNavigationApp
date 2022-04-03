import React, { useState, useEffect } from 'react';

import { ScrollView, StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native';

import SearchableDropdown from 'react-native-searchable-dropdown';

import Card from '../components/card';

//Item array for the dropdown
const items = [
    { id: 0, name: 'Algate East' },
    { id: 1, name: 'Tower Hill' },
    { id: 2, name: 'Monument' },
    { id: 3, name: 'Cannon Street' },
    { id: 4, name: 'Blackfriars' },
    { id: 5, name: 'Temple' },
    { id: 6, name: 'Embankment' },
    { id: 7, name: 'Westminster' },
    { id: 8, name: "St. James's Park" },
    { id: 9, name: 'Victoria' },
    { id: 10, name: 'South Kensington' },
    { id: 11, name: "Earl's Court" },
];


const App = () => {

  //temp testing stations for scrollview output
  const [station, setStation] = useState([
    {Name:"Paddington",               Key:1},
    {Name:"Edgeware Road",            Key:2},
    {Name:"Baker Street",             Key:3},
    {Name:"Great Portland Street",    Key:4},
    {Name:"King's Cross St. Pancras", Key:5},
    {Name:"Mooregate",                Key:6}, 
    {Name:"Angel",                    Key:7}, 
  ])

  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 0, marginTop: 10, marginBottom: 20 }}>
        </Text>
        <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          //On text change listner on the searchable input
          onItemSelect={(item) => alert(JSON.stringify(item))}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 0 }}
          textInputStyle={{
            fontSize: 20,
            padding: 7.5,
            borderWidth: 2.5,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderColor: '#F6F6F6',
            backgroundColor: '#ACACAC',
          }}
          itemStyle={{
            padding: 2.5,
            marginTop: 0,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 0,
          }}
          itemTextStyle={{
            color: '#222',
          }}
          itemsContainerStyle={{
            maxHeight: '60%',
          }}
          items={items}
          //defaultIndex={2}
          placeholder="Start Station"
          resetValue={false}
          underlineColorAndroid="transparent"
        />
        <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          //On text change listner on the searchable input
          onItemSelect={(item) => alert(JSON.stringify(item))}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 0 }}
          //suggestion container style
          textInputStyle={{
            fontSize: 20,
            padding: 7.5,
            borderWidth: 2.5,
            borderColor: '#F6F6F6',
            backgroundColor: '#ACACAC',
          }}
          itemStyle={{
            padding: 2.5,
            marginTop: 0,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 0,
          }}
          itemTextStyle={{
            color: '#222',
          }}
          itemsContainerStyle={{
            maxHeight: '60%',
          }}
          items={items}
          //defaultIndex={1}
          placeholder="End Station"
          resetValue={false}
          underlineColorAndroid="transparent"
        />

        <Pressable style={styles.button} onPress= {() => alert("Search Function Not Implemented Yet")}>
            <Text style={styles.buttonText}>Search</Text>
        </Pressable>

        <ScrollView>
          {station.map((e) => {
            return(
              <View key={e.Key}>
                <Card><Text>{e.Name}</Text></Card>
              </View>
            )
          })}
        </ScrollView>
        
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4C4C4',
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
  buttonText:{
    padding: 5, 
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  }
});
