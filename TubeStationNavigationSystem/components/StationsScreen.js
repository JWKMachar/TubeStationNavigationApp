import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Card from '../components/card';
import Card2 from '../components/card2';

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
            //const raw = await fetch(`http://0.0.0.0:8081/search?stationOne=${props.data.start}&stationTwo=${props.data.end}`);
            const raw = await fetch(`http://c8bd-62-254-10-235.ngrok.io/search?stationOne=${props.data.start}&stationTwo=${props.data.end}`);
            setData(await raw.json());
        })()
    }, [props.data]);

    return (

        <ScrollView>
            <Card2 data={props.data.start}/>
            {data &&(data.steps.map(x => <Card data={x}/>))}
            <Card2 data={props.data.end} />
        </ScrollView>
)}

export default StationsScreen;
