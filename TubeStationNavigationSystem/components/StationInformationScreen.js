import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Circle, Polyline } from "react-native-maps";
import { ScrollView } from "react-native-web";

const StationInformationScreen = (props) => {

    const [data, setData] = React.useState();

    // Run on load
    React.useEffect(() => {
        // IFFE as use effect cannot be async
        (async () => {
            //const raw = await fetch("http://localhost:8081/search?stationOne=Paddington&stationTwo=Tower Hill");
            // const raw = await fetch(`http://172.20.10.2:8081/search?stationOne=${props.data.start}&stationTwo=${props.data.end}`);
            const raw = await fetch(`http://91c2-62-254-70-84.ngrok.io/select?selected${props.data.sele}`);
            setData(await raw.json());
        })()
    }, [props.data]);

    return (
        <View style={styles.container}>
            
        </View>
    )
}