#!/usr/bin/env node
import program from 'commander'
// const program = require('commander')
// import pkg from '../package.json'
// const pkg= require('../package.json')

program
    .version('1.0.0')
    .command('key', 'Manage API Key --https://nomics.com')
    .command('check', 'Check Coin price Info')
    .parse(process.argv)
// console.log(process.argv)



