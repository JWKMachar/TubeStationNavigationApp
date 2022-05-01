import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Circle, Polyline } from "react-native-maps";
import { ScrollView } from "react-native-web";

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

const ResultsScreen = (props) => {

    const [data, setData] = React.useState();

    // Run on load
    React.useEffect(() => {
        // IFFE as use effect cannot be async
        (async () => {
            //const raw = await fetch("http://localhost:8081/search?stationOne=Paddington&stationTwo=Tower Hill");
            //const raw = await fetch(`http://172.20.10.2:8081/search?stationOne=${props.data.start}&stationTwo=${props.data.end}`);
            //const raw = await fetch(`http://0.0.0.0:8081/search?stationOne=${props.data.start}&stationTwo=${props.data.end}`);
            const raw = await fetch(`hhttp://b81a-62-254-10-235.ngrok.io/search?stationOne=${props.data.start}&stationTwo=${props.data.end}`);
            setData(await raw.json());
        })()
    }, [props.data]);

    const renderLine = (start, end, index) => {
        if (index == data.steps.lengh - 1 || !end) return null;
        console.log({ start, end });
        return (
            <Polyline
                coordinates={[
                    { latitude: start.lat, longitude: start.lng },
                    { latitude: end.lat, longitude: end.lng }
                ]}
                strokeWidth={3}
                strokeColor={lineColours[end.line]}

            />
        )
    }

    return (
        <View style={styles.container}>
            {data && (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: data.start.lat,
                           longitude: data.start.lng,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                    >
                        {renderLine(data.start, data.steps[0])}
                        {renderLine(data.steps[data.steps.length - 1], data.end)}
                        {data.steps.map((_, index) => renderLine(data.steps[index], data.steps[index + 1], index))}
                        <Circle
                        center={{
                            latitude: data.start.lat,
                            longitude: data.start.lng
                            }}
                            radius={50}
                            fillColor="#2cb67d"
                        />

                        {data.steps.map((step) => (
                            <Circle
                                key={step.station}
                                center={{
                                    latitude: step.lat,
                                    longitude: step.lng
                                }}
                                radius={25}
                                fillColor="#dddddd"
                            />
                        ))}
                        <Circle
                            center={{
                                latitude: data.end.lat,
                                longitude: data.end.lng
                            }}
                            radius={50}
                            fillColor="#FF0000"
                        />
                    </MapView>
            )}
        </View>
    )
}

export default ResultsScreen;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center",
        height: Dimensions.get("screen").height - 100,
        zIndex: 100,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});