/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

/* pra colocar figura <Image style={{width: 200, height: 50}} source={{uri: "data:image/gif;base64," + item.digital_signature_client}} /> */

//Import React
import React, { Component } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
//Import all required component
import { View } from 'react-native';

import OsListView from '../Components/OsListView';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#f1c40f',
    },
};
const HomeScreen = (props) => {
    global.currentScreenIndex = 'HomeScreen';
    console.log(props)
    return (
        <PaperProvider theme={theme}>
            <View style={{ flex: 1, alignItems: 'stretch', marginTop: 10 }}>
                <OsListView navigation={props.navigation}></OsListView>
            </View>
        </PaperProvider>
    );
};
export default HomeScreen;