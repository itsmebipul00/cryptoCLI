// import program from 'commander'
// import key from '../command/key.js'
import program from 'commander'
// import key from '../command/key.js'
// const key= require('../command/key')
import inquirer from "inquirer"
import colors from 'colors'
// import KeyManager from "../library/KeyManager.js"
import Configstore from 'configstore'

const  config= new Configstore('cryptorank')

program
    .command('set')
    .description('SET API Keys --https://nomics.com')
    .action(async() => {
        const isRequired = e => e === '' ? 'This value is required' : true
        // const KeyManager= new KeyManager()
        const input= await inquirer.prompt({
            type: 'input',
            name: 'key',
            message: 'Enter API Key'.green +' ~https://nomics.com',
            validate: isRequired
        })
        const key= config.set('APIKey', input.key)
        if(key){
            console.log('API SET')
        } 
    })


program
    .command('show')
    .description('REMOVE API Keys')
    .action(() => {
        try {
            const key= config.get('APIKey')
            if(!key){
                throw new Error('No API KEY Found ---https://nominics.com')
            }
            console.log("Current Key:", key.yellow)
        } catch (error) {
            console.log(error.message.red)
        }
    })

program
    .command('remove')
    .description('REMMOVE API Keys')
    .action(() => {
        try {
            const key= config.get('APIKey')
            if(!key){
                throw new Error('No API KEY Found ---https://nominics.com')
            }
            config.delete('APIKey')
            console.log("API KEY REMOVED".blue) 
        } catch (error) {
            console.log(error.message.red)
        }

    })

program.parse(process.argv)

