import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import SearchScreen from './SearchScreen';
import Information from './Information';

const searchName = 'Search';
const testName = 'Test';
const historyName = 'History';
const informationName = 'Information';


const Tab = createBottomTabNavigator();

export default function NavigationBar() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={searchName}
                screenOptions={({ route }) => ({
                    headerShown: false,

                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let routeName = route.name;

                        if (routeName === searchName) {
                            iconName = focused ? 'compass' : 'compass-outline'
                            return <Ionicons name={iconName} size={size} color={color} />
                        } else if (routeName === testName) {
                            iconName = focused ? 'test-tube' : 'test-tube-empty'
                            return <MaterialCommunityIcons name={iconName} size={size} color={color} />
                        } else if (routeName === historyName) {
                            iconName = focused ? 'history' : 'history-toggle-off'
                            return <MaterialIcons name={iconName} size={size} color={color} />
                        } else if (routeName === informationName) {
                            iconName = focused ? 'information-circle-outline' : 'informaion-outline'
                            return <ion-icon name={iconName} size={size} color={color} />
                        }
                    },
                })}

                tabBarOptions={{
                    activeTintColor: '#2679ff',
                    inactiveTintColor: '#878787',
                    labelStyle: { paddingBottom: 0, fontSize: 12 },
                    style: { padding: 10, height: 70 }
                }}>
                <Tab.Screen name={searchName} component={SearchScreen} />
                <Tab.Screen name={informationName} component={Information} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}

