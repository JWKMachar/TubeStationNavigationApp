import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

import SearchableDropdown from "../components/SearchableDropdown.js";

export default function (props) {
  //const [originalData, _] = useState([]);
  const [dataSource] = useState([
    "algate east", "tower hill", "monument", "cannon street",
    "blackfriars", "temple", "embankment", "westminster", "st jamess park", 
    "victoria", "south kensington", "earls court",])

  const [filtered, setFiltered] = useState([]);
  const [searching, setSearching] = useState(false);

  const onSearch = (text) => {
    if (text) {
      setSearching(true);
      const temp = text.toLowerCase();

      const tempList = dataSource.filter((item) => {
        if (item.match(temp)) return item;
      });
      setFiltered([...tempList]);
    } else {
      setSearching(false);
      setFiltered([...dataSource]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Search"
        placeholderTextColor="white"
        onChangeText={onSearch}
      />
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20 }}>
          List of data
        </Text>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {
            filtered.map((item, index) => {
            return (
              <View
                style={{
                  margin: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                  width: 150,
                  backgroundColor: "grey",
                }}
              >
                <Text style={{ fontSize: 15 }}>{item}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {searching && (
        <SearchableDropdown
          onPress={(item) =>
            {
            setSearching(false)
          }}
          dataSource={filtered}
          />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: "20%",
    flex: 1,
  },
  textInput: {
    backgroundColor: "#BFBFBF",
    width: "80%",
    borderRadius: 5,
    height: 50,
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});