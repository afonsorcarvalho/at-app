import React, { Component, useState, useEffect, useRef } from 'react'
import { Text,  View, StyleSheet, ActivityIndicator, Image } from 'react-native'
//import DataSource from '../../helpers/DataSource'
import RelatoriosListView from '../Components/RelatoriosListView'
import PecasListView from '../Components/PecasListView'
import AsyncStorage from '@react-native-community/async-storage'

import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getData, setData } from '../../helpers/DataSource';
import { AtInput } from '../Components/AtInput';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Appbar, Snackbar,Button,Divider , Card, Title } from 'react-native-paper';
const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#f1c40f',
    },
};
const MyComponent = () => (
    <Appbar style={styles.bottom}>
        <Appbar.Action
            icon="archive"
            onPress={() => console.log('Pressed archive')}
        />
        <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
        <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
        <Appbar.Action
            icon="delete"
            onPress={() => console.log('Pressed delete')}
        />
    </Appbar>
);
const OverlayExample = (value) => {
    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);
    return (
        <View style={styles.container}>
            <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}

                action={{
                    label: 'Undo',
                    onPress: () => {
                        // Do something
                    },
                }}>
                Hey there! I'm a Snackbar.
        </Snackbar>
        </View>

    );
};

export default class OsDetalhes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            osId: props.navigation.state.params.id,
            db: 'dgt_os.os',
            data: [],
            loading: true,
            modoEdit: false,
            form: {
                'description': '',
            },
            modalSaveVisible: false,
            msgSnackBar: ''

        }

    }
    static navigationOptions = {
        headerTitle: 'Detalhes da OS'
    }

    async componentDidMount() {
        console.log('montando.... ')

        const params = {
            ids: [],
            domain: [['id', '=', this.state.osId]],
            fields: [],
            limit: 10

        }
        this.setState({
            data: await getData(params, 'dgt_os.os'),
            loading: false
        })
        OverlayExample(false)




    }
    onPressAdd() {
        alert('Fazer tratamento adição')
    }
    formUpdate = async (e) => {
        var data = await AsyncStorage.getItem('data[' + this.state.db + ']')
        data = JSON.parse(data)
        this.setState({
            data: data
        })
        console.log('form update');
        console.log(data);
        const params = {
            'description': this.state.data[0].description

        }
        res = await setData([this.state.osId], params, 'dgt_os.os').then(
            response => {
                console.log("Realizado atualização do campo")
                this.setState({
                    modalSaveVisible: true,
                    msgSnackBar: "Salvo com sucesso!!!"
                })

            }
        ).catch(e => {
            console.log(e);
            this.setState({
                modalSaveVisible: true,
                msgSnackBar: "Erro ao salvar",
            })
        })
    }
    onDismissSnackBar = () => {
        this.setState({
            modalSaveVisible: false
        })
    }
    render() {

        //console.log(this.state.odoo)
        var osId = this.props.navigation.state.params.id;
        var visible = this.state.modalSaveVisible;
        let data = []
        if (!this.state.loading) {
            data = this.state.data[0]

        }


        return (
            <PaperProvider theme={theme}>
                <View style={styles.container}>
                    <MyComponent></MyComponent>
                    {this.state.loading ? (<ActivityIndicator size="large" />
                    ) : (<ScrollView>
                        <Card >

                            <Card.Content>
                                <Title>{data.name}</Title>
                                <Text style={styles.label} >Cliente:</Text><Text>{data.cliente_id[1]}</Text>
                                <Text style={styles.label}>Equipamento:</Text><Text>{data.equipment_id[1]}</Text>




                                <AtInput label='Descrição:' field='description' value={data.description} db={this.state.db} ></AtInput>
                                <Text style={styles.label}>Pecas</Text>

                                <PecasListView osId={data.id} navigation={this.props.navigation}></PecasListView>
                                <Button
                                    icon={
                                        <Icon
                                            name="plus"
                                            size={15}
                                            color="#2089dc"

                                        />
                                    }
                                    type='clear'
                                    title=" Adicionar Peça"

                                />
                                <Text style={styles.label}>Relatórios</Text>
                                <RelatoriosListView osId={data.id} navigation={this.props.navigation}></RelatoriosListView>
                                <Button
                                    icon={
                                        <Icon
                                            name="plus"
                                            size={15}
                                            color="#2089dc"

                                        />
                                    }
                                    type='clear'
                                    title=" Adicionar Relatório"

                                />
                                
                                <Text>Assinatura do Cliente</Text>
                                <Image style={{ width: 200, height: 50 }} source={{ uri: "data:image/gif;base64," + data.digital_signature_client }} />
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={this.formUpdate} >Salvar</Button>

                            </Card.Actions>
                        </Card>
                    </ScrollView>


                        )}
                    <Snackbar
                        visible={this.state.modalSaveVisible}
                        onDismiss={this.onDismissSnackBar}
                        theme={theme}

                    >
                        {this.state.msgSnackBar}
                    </Snackbar>

                </View>
            </PaperProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0
    },
    item: {

        fontSize: 14,

    },
    label: {
        fontWeight: 'bold'
    },
    fieldEdit: {
        color: 'green',
        textShadowColor: 'blue',

    }

});
