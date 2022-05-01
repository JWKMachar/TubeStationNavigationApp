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
            const raw = await fetch(`http://66b6-62-254-10-235.ngrok.io/select?selected=${props.data.start}`);
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
                    </View>
                )}
        </ScrollView>
    )
}

export default StationInformationScreen;