/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState } from 'react';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/Loader';
import Odoo from 'react-native-odoo-promise-based';

const LoginScreen = props => {
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    AsyncStorage.setItem('userEmail',userEmail );
    AsyncStorage.setItem('userPassword',userPassword );
    
    
    var odoo = new Odoo({
        host: 'server.diagnostica-ma.com.br',
        port: 8069, /* Defaults to 80 if not specified */
        database: 'odoo-diagnostica',
        username: userEmail, /* Optional if using a stored session_id */
        password: userPassword  /* Optional if using a stored session_id */

    })

    odoo.connect().then(response => {
        //Hide Loader
        setLoading(false);
        console.log(response);
        if(typeof(response.error) == 'object'){
            setErrortext('Please check your email id or password');
            console.log('Please check your email id or password');
        // If server response message same as Data Matched
        }else{
            if (response.data.uid > 0) {
                AsyncStorage.setItem('user_id', JSON.stringify(response.data.uid));
                AsyncStorage.setItem('userEmail',userEmail );
                AsyncStorage.setItem('userPassword',userPassword );
                AsyncStorage.setItem('sid',response.data.session_id);
                AsyncStorage.setItem('name',response.data.partner_display_name);
                AsyncStorage.setItem('odoo',JSON.stringify(odoo));
                console.log(response.data.uid);
                console.log(response.data.partner_display_name);
                props.navigation.navigate('DrawerNavigationRoutes');
                } else {
                
                }
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
      console.log(odoo)
      console.log(AsyncStorage)
  };
  

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 100 }}>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={{uri: 'http://server.diagnostica-ma.com.br:8069/web/image/res.company/1/logo?unique=4ecdf61'}}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
               
                placeholder="Email" //dummy@abc.com
                
                autoCapitalize="none"
                keyboardType="email-address"
                ref={ref => {
                  this._emailinput = ref;
                }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._passwordinput && this._passwordinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                
                placeholder="Senha" //12345
               
                keyboardType="default"
                ref={ref => {
                  this._passwordinput = ref;
                }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
      
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EAEAEA',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#f96f00',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#f96f00',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
  },
  registerTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});