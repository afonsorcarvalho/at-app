import React, { Component, useState } from 'react'
import {  View, ActivityIndicator } from 'react-native'
import { Appbar, Switch, Subheading,  Heading, Snackbar,Button,Divider ,Text, Card, Title } from 'react-native-paper';
import { ScrollView,  TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getData, setData } from '../../helpers/DataSource';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AtInput, AtDate } from '../Components/AtInput';
import {theme} from '../../helpers/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import 'moment/locale/pt-br';

Moment.locale('pt-br')
const MySwitch = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return ( 
    <View>
        <Text>Tem Defeito</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
  </View>
  );
}
const TimeInput = () =>{
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  
    return (
      <View>
        <View>
          <Button onPress={showDatepicker} title="Show date picker!" />
        </View>
        <View>
          <Button onPress={showTimepicker} title="Show time picker!" />
        </View>
        <Text>{Moment(date).format("DD-MM-YYYY")}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    );
  };

export default class RelatoriosDetalhes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Id: props.navigation.state.params.id,
            db: 'dgt_os.os.relatorio.servico',
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
        headerTitle: 'Detalhes do Relatório'
    }
    async componentDidMount() {
        console.log('montando.... ')

        const params = {
            ids: [],
            domain: [['id', '=', this.state.Id]],
            fields: [],
            limit: 10

        }
        this.setState({
            data: await getData(params, 'dgt_os.os.relatorio.servico'),
            loading: false
        })
      

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
            'motivo_chamado':data[0].motivo_chamado,
            'servico_executados': data[0].servico_executados,
            'tem_defeitos': data[0].tem_defeitos,
            'defeitos': data[0].defeitos,
            'tem_pendencias': data[0].tem_pendencias,
            'pendencias':data[0].pendencias,
        }
        res = await setData([this.state.Id], params, this.state.db).then(
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
    onChange = () => {
        alert("change")
        
    }
    onDismissSnackBar = () => {
        this.setState({
            modalSaveVisible: false
        })
    }
    render() {
        let data = []
        if (!this.state.loading) {
            data = this.state.data[0]

        }
        return (
            <PaperProvider theme={theme}>
            <View>
            {this.state.loading ? (<ActivityIndicator size="large" />
                    ) : (<ScrollView>
                <Card>
                    <Card.Content>
                        <Title>{data.name}</Title>
                        <Subheading>{data.cliente_id[1]}</Subheading>
                        <AtInput label='Motivo do Chamado:' field='motivo_chamado' value={data.motivo_chamado} db={this.state.db} ></AtInput>
                        <AtInput label='Serviços Executados:' field='servico_executados' value={data.servico_executados} db={this.state.db} ></AtInput>
                        <TouchableOpacity onPress={() => {this.setState({showDate:true})}}>
                      
                        </TouchableOpacity>
                        <Button ></Button>
                       {this.state.showDate && (<DateTimePicker 
                         
                                value={new Date(data.data_atendimento)}
                                
                                mode="time"  
                                is24Hour={true}     
                                display="default"
                                onChange={this.onChange}
                        ></DateTimePicker>
                        

                       )}
                       <MySwitch></MySwitch>
                       <AtInput label="Defeitos" field='defeitos' value={data.defeitos} db={this.state.db}></AtInput>
                       <AtInput label="Pendências" field='pendencias' value={data.pendencias} db={this.state.db}></AtInput>
                        <AtDate label="Data de atendimento" field='data_atendimento' value={data.data_atendimento}></AtDate>
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
