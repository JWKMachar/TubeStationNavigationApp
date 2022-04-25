import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-web";
import Card from '../components/card';

const lineColours = {
    "Bakerloo": "#B36305",
    "Central": "#E32017",
    "Circle": "#FFD300",
    "District": "#00782A",
    "HnC": "#F3A9BB",
    "Jubilee": "#A0A5A9",
    "Metropolitan": "#9B0056",
    "Northern": "#000000",
    "Piccadilly": "#003688",
    "Victoria": "#0098D4",
    "WnC": "#95CDBA",
    "WALK": "#FFFFFF"
};

const StationsScreen = (props) => {

    const [data, setData] = React.useState();

    React.useEffect(() => {
        // IFFE as use effect cannot be async
        (async () => {
            //const raw = await fetch("http://localhost:8081/search?stationOne=Paddington&stationTwo=Tower Hill");
            // const raw = await fetch(`http://172.20.10.2:8081/search?stationOne=${props.data.start}&stationTwo=${props.data.end}`);
            const raw = await fetch(`http://dd7c-62-254-70-84.ngrok.io/search?stationOne=${props.data.start}&stationTwo=${props.data.end}`);
            setData(await raw.json());
        })()
    }, [props.data]);

    return (
        <View>
        {data &&(
            <Card>{data.steps}</Card>
        
        )}
        </View>

    
)}

export default StationsScreen;
