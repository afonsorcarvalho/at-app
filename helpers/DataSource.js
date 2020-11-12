import AsyncStorage from '@react-native-community/async-storage'
import Odoo from 'react-native-odoo-promise-based';


  

    
async function connectOdoo() {
        this.setState('odoo', new Odoo({
            host: 'server.diagnostica-ma.com.br',
            port: 8069, /* Defaults to 80 if not specified */
            database: 'odoo-diagnostica',
            username: await AsyncStorage.getItem('userEmail'), /* Optional if using a stored session_id */
            password: await AsyncStorage.getItem('userPassword'),  /* Optional if using a stored session_id */
            sid: await AsyncStorage.getItem('sid')

        }))


        this.state.odoo.connect().then(response => {
            console.log('conectado ao Odoo')
            console.log(response)


        }).catch(e => {
            console.log(e)
        })
    }
async function getData(params, db) {

        var data = [];

        console.log("entrou em getdata")
        var odoo = new Odoo({
            host: 'server.diagnostica-ma.com.br',
            port: 8069, /* Defaults to 80 if not specified */
            database: 'odoo-diagnostica',
            username: await AsyncStorage.getItem('userEmail'), /* Optional if using a stored session_id */
            password: await AsyncStorage.getItem('userPassword'),  /* Optional if using a stored session_id */
            sid: await AsyncStorage.getItem('sid')

        })
        data = await odoo.connect()
            .then(response => {
                console.log("Conectado com sucesso")
                console.log(response)

                console.log("params")
                console.log(params)
                
                return data;
            })
            .catch(e => { console.log(e);  })
        data = odoo.search_read(db, params, '')
            .then(async response => {
                console.log('Realizado search read')
                
                data = response.data
                res = await AsyncStorage.setItem('data['+db+']',JSON.stringify(data))
                return data;



            })
            .catch(e => { console.log(e) })

            return data;

    }
async function setData(ids=[],params, db) {

        var data = [];

        console.log("entrou em setdata")
        var odoo = new Odoo({
            host: 'server.diagnostica-ma.com.br',
            port: 8069, /* Defaults to 80 if not specified */
            database: 'odoo-diagnostica',
            username: await AsyncStorage.getItem('userEmail'), /* Optional if using a stored session_id */
            password: await AsyncStorage.getItem('userPassword'),  /* Optional if using a stored session_id */
            sid: await AsyncStorage.getItem('sid')

        })
        data = await odoo.connect()
            .then(response => {
                console.log("Conectado com sucesso")
               
                
                return data;
            })
            .catch(e => { console.log(e);  })
        data = odoo.update(db,ids, params, '')
            .then(response => {
                console.log('Realizado update')
                
                data = response.data
                return data;



            })
            .catch(e => { console.log(e) ;console.log("deu merda")})

            return data;

    }




export {getData, setData, connectOdoo}
