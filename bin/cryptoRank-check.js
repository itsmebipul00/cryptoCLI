import program from 'commander'
import axios from 'axios'
import Configstore from 'configstore'
import colors from 'colors'

const config= new Configstore('cryptorank')

program
    .command('price')
    .description('Check price of coins')
    .option('--coin <type>', 'Enter Crypto Ticker Symbols in CSV Format', 'BTC,ETH,ADA')
    .option('--curr <type>', 'Enter the currency', 'USD')
    .action(async(e) => {
        try {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: e.curr,
            })
            const key= config.get('APIKey')
            console.log(key)
            const res= await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${key}&ids=${e.coin}&convert=${e.curr}`)
            let output= ' '
            res.data.forEach(coin => {
                output+= `Coin:${coin.symbol.yellow} (${coin.name}) || Price:${formatter.format(coin.price).green}\n`
            })
            console.log(output)
        } catch (error) {
            console.log(error.message.red)
        }

    })

program.parse(process.argv)