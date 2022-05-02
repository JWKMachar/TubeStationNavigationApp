import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MapView, { Circle, Polyline } from "react-native-maps";
import { InfoCard } from "./infocard";

const StationInformationScreen = (props) => {

    const [data, setData] = React.useState();


    // Run on load
    React.useEffect(() => {
        // IFFE as use effect cannot be async
        (async () => {
            //const raw = await fetch("http://localhost:8081/search?stationOne=Paddington&stationTwo=Tower Hill");
            //const raw = await fetch(`http://172.20.10.2:8081/search?stationOne=${props.data.start}&stationTwo=${props.data.end}`);
            //const raw = await fetch(`http://0.0.0.0:8081/search?stationOne=${props.data.start}&stationTwo=${props.data.end}`);
            console.log(props.data.select);
            const raw = await fetch(`http://3d55-62-254-10-235.ngrok.io/select?selected=${props.data.start}`);
            setData(await raw.json());
            console.log(await raw.json());
        })()
    }, [props.data]);
    return (
        <ScrollView>
            {data &&
                (
                    <View>
                        <Text key="name">Station name: {data[0].name}</Text>
                        <Text key="lines">Lines at Station: {data[0].lines}</Text>
                        <Text key="Zone">Zone: {data[0].Zone}</Text>
                        <Text key="Longitude">Longitude: {data[0].Longitude}</Text>
                        <Text key="Latitude">Latitude: {data[0].Latitude}</Text>
                    </View>
                )}
        </ScrollView>
    )
}

export default StationInformationScreen;