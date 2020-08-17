import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'

import { getData } from '../../helpers/DataSource'
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';


export default class OsListView extends React.Component {
    constructor(props) {
        super(props);
        console.log("aqui chegou o props")
        console.log(props)
        this.props = props
        this.state = {
            data: '',
            loading: true,
            navigation: props.navigation

        };
    }

    
    async componentDidMount() {
        const params = {
            ids: [],
            domain: [['create_date', '>', '2020-01-01']],
            fields: [],
            limit: 30
        }
        this.setState({
            data: await getData(params, 'dgt_os.os'),
            loading: false
        })
       
    }
    onPress = (id) => {
       
        this.props.navigation.navigate('Detalhes',{'id':id})
        
    }
    renderItem = ({ item }) => (

        <ListItem
            title={item.name}
            subtitle={
                <TouchableOpacity style={styles.container} onPress={() => this.onPress(item.id)}>
                    <Text style={styles.name}>{item.equipment_id[1]}</Text>
                    <Text style={styles.name}>{item.cliente_id[0]} - {item.cliente_id[1]}</Text>
                    <Text style={styles.date}>Data programada - {item.date_scheduled}</Text>
                    <Text style={styles.type}>{item.description}</Text>


                </TouchableOpacity>}
            bottomDivider
            chevron
        />
    )
    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                        <FlatList
                            style={styles.container}
                            data={this.state.data}
                            renderItem={this.renderItem}
                        />)}
            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
