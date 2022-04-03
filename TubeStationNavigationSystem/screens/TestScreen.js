
import React, { useState, useEffect } from 'react';

import {  FlatList, SafeAreaView, SectionList, StyleSheet, Text, View } from 'react-native';



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


const App = () => {
  const [searchText, setSearchText] = useState();
  var selectedIndex = 0
  return (
    <View style={styles.container}>
    
    <SectionList
      sections=
      {[
        {title: "Paddington", data: ["Edgeware Road", "Baker Street", "Great Portland Street"]},
        {title: "King's Cross St. Pancras", data: ["Mooregate"]},
        {title: "Angel", data: []},
      ]}
      
      renderItem={({item}) =>  <Text style={styles.item}>  {item}</Text>}
      renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>  {section.title}</Text>}
      keyExtractor={(item, index) => index}
    />
  </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
   },
   sectionHeader: {
     paddingTop: 2,
     paddingLeft: 2,
     paddingRight: 2,
     paddingBottom: 2,
     fontSize: 20,
     fontWeight: 'bold',
   },
   item: {
     padding: 2,
     fontSize: 16,
   },
 });
