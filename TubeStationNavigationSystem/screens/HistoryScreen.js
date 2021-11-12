import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

//import SearchableDropdown component
import SearchableDropdown from 'react-native-searchable-dropdown';
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

export default function(props) {
 
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.titleText}>
              Example of Searchable Dropdown / Picker in React Native
            </Text>
            <Text style={styles.headingText}>
              Searchable Dropdown from Static Array
            </Text>
            <SearchableDropdown
              onTextChange={(text) => console.log(text)}
              //On text change listner on the searchable input
              onItemSelect={(item) => console.log(item.name)}
              //onItemSelect called after the selection from the dropdown
              containerStyle={{ padding: 5 }}
              //suggestion container style
              textInputStyle={{
                //inserted text style
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
              }}
              itemStyle={{
                //single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                borderWidth: 1,
              }}
              itemTextStyle={{
                //text style of a single dropdown item
                color: '#222',
              }}
              itemsContainerStyle={{
                //items container style you can pass maxHeight
                //to restrict the items dropdown hieght
                maxHeight: '60%',
              }}
              items={items}
              //mapping of item array
              //default selected item index
              placeholder="Select Item"
              //place holder for the search input
              //resetValue={true}
              //reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              //To remove the underline from the android input
            />
           
          </View>
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
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
    });
    
    