import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Odoo from 'react-native-odoo-promise-based';
import { Button, Card, ListItem, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getData } from '../../helpers/DataSource'


export default class RelatoriosListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            osId: props.osId,
            loading: true,
            navigation: props.navigation
        }
    }


    async componentDidMount() {
        console.log('Carregando relatorios.... ')
        const params = {
            ids: [],
            domain: [['os_id', '=', this.state.osId]],
            fields: [],
            limit: 10
        }
        this.setState({
            data: await getData(params, 'dgt_os.os.relatorio.servico'),
            loading: false
        })



    }

    onPress = (id) => {
        this.props.navigation.navigate('Relatorios', { 'id': id })
    }
    renderItem = ({ item }) => (
        <TouchableOpacity style={styles.list} onPress={() => this.onPress(item.id)}>
            <View style={styles.containerList}>
                <View style={styles.content}>
                    <View style={styles.name}>
                        <Text style={styles.data} >Data: {item.data_atendimento}</Text>
                        <Text >{item.name}</Text>
                        <Text >{item.servico_executados}</Text>
                    </View>

                    <Button buttonStyle={styles.buttons} type="clear" icon={<Icon name="trash" size={15} />}></Button>
                </View>
            </View>
            <Divider></Divider>
        </TouchableOpacity>
    )
    render() {
        return (
            <View style={styles.list}><Divider></Divider>
                {this.state.loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                        <FlatList
                            style={styles.container}
                            data={this.state.data}
                            renderItem={this.renderItem}
                        />)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        marginTop: 5,
        marginBottom: 15,





    },
    content: {

        width: "100%",
        flexDirection: 'row',


    },
    data: {

        alignItems: 'center',
        textAlign: 'left'
    },
    name: {
        width: "90%"
    },
    containerList: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingBottom: 5,
        paddingTop: 5,
    },
    buttons: {
        alignItems: 'flex-end',
        textAlign: 'right',
        alignContent: 'space-between'

    },
    item: {



    },
    label: {
        fontWeight: 'bold'
    },
    list: {
        width: "100%",



    }
});