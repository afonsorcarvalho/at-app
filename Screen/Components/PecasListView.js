import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { getData } from '../../helpers/DataSource'
import { Button, Card, ListItem, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PecasListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            osId: props.osId,
            loading: true
        }
    }

   
    async componentDidMount() {
        console.log('carregando Pecas.... ')
        const params = {
            ids: [],
            domain: [['os_id', '=', this.state.osId]],
            fields: [],
            limit: 10
        }
        this.setState({
            data: await getData(params, 'dgt_os.os.pecas.line'),
            loading: false
        })
       

    }
    renderItem = ({ item }) => (
        <TouchableOpacity style={styles.list} onPress={() => this.onPress(item.id)}>
            <View style={styles.containerList}>
                <View style={styles.content}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.qtd}>{'QTD ' + item.product_uom_qty}</Text>
                    <Button buttonStyle={styles.buttons} type="clear" icon={<Icon name="trash" size={15} />}></Button>

                </View>
            </View>
            <Divider></Divider>
        </TouchableOpacity>
    )
    render() {
        return (
            <View style={styles.container}><Divider></Divider>
                {this.state.loading ? (
                    <ActivityIndicator size="large" />
                ) : (

                        <FlatList

                            data={this.state.data}
                            renderItem={this.renderItem



                            }
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
        marginBottom:15




    },
    content: {

        width: "100%",
        flexDirection: 'row',


    },
    qtd: {
        width: "20%",
        alignItems:'center',
        textAlign:'center'
    },
    name: {
        width: "70%"
    },
    containerList: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingBottom:5, 
        paddingTop:5,
    },
    buttons: {
        alignItems: 'baseline'

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
