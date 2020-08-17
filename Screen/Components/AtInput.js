import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import 'moment/locale/pt-br';

class AtInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db: props.db,
            

            loading: true,
            modoEdit: false,
            value: props.value,
            fnCall: props.fnCall,
            field: props.field,
        }
    }
    updateData = async (value) => {
        console.log("entrou no update data")

        var data = await AsyncStorage.getItem('data[' + this.state.db + ']')
        console.log(data);
        data = JSON.parse(data);
        console.log("valor inserido")
        console.log(value)
        console.log("data[0]."+this.state.field+"=value")
        data[0][""+this.state.field] = value
        eval("data[0]."+this.state.field+"=value")
        //data[0].description = value
        console.log(data);
        await AsyncStorage.setItem('data[' + this.state.db + ']', JSON.stringify(data))

    }
    render() {
        return (
            <View>
                <Text style={styles.label}>{this.props.label}</Text>
                {
                    !this.state.modeEdit ? (
                        <TouchableOpacity onPress={() => { this.setState({ modeEdit: true }) }} >
                            <Text style={styles.fieldEdit}>
                                {this.state.value}
                            </Text>
                        </TouchableOpacity>) : (
                            <TextInput
                                autofocus='true'
                                mode='outlined'
                                onBlur={(text) => {
                                    
                                    this.updateData(this.state.value);

                                    this.setState({ 'modeEdit': false })
                                }}
                                value={this.state.value}
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(text) => { this.setState({ 'value': text }) }}
                                scrollEnabled={true}
                                ref={this.state.ref}
                            >
                            </TextInput>)
                }</View>
        )
    }
}
class AtDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db: props.db,

            loading: true,
            modoEdit: false,
            value: props.value,
            fnCall: props.fnCall,
            field: props.field,
            show: false,
            mode: 'date',
            date: new Date()
        }
    }
    setShow = (value) =>{
        this.setState({
            show: value
        })

    }
    setDate = (value) =>{
        this.setState({
            date: value
        })

    }
    setMode = (value) =>{
        this.setState({
            mode: value
        })

    }
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        this.setShow(Platform.OS === 'ios');
        this.setDate(currentDate);
      };
    updateData = async (value) => {
        console.log("entrou no update data")

        var data = await AsyncStorage.getItem('data[' + this.state.db + ']')
        console.log(data);
        data = JSON.parse(data);
        console.log("valor inserido")
        console.log(value)
        eval("data[0]."+this.props.field+"=value")
        console.log(data);
        await AsyncStorage.setItem('data[' + this.state.db + ']', JSON.stringify(data))

    }
    render() {
        var date = this.state.date
        var mode = this.state.mode
        return (
            <View>
                <Text style={styles.label}>{this.props.label}</Text>
                {
                    !this.state.modeEdit ? (
                        <TouchableOpacity onPress={() => { this.setState({ modeEdit: true }) }} >
                            <Text style={styles.fieldEdit}>
                                {this.state.value}
                            </Text>
                        </TouchableOpacity>) : (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={this.onChange}
                            />)
                }</View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
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
export {
    AtInput, AtDate
}