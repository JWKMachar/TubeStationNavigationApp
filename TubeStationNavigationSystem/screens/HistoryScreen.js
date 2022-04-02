import React, { useState, useEffect, Component, Image} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Card from '../components/card';

const App = () => {
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
    <View>
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
