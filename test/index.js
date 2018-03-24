'use strict'

process.on('unhandledRejection', (err) => { console.log(err) })

require('./package')
require('./fragment-parser')
require('./section-parser')
