const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require("path");

const app = express()

app.use(express.json({extended:true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/places', require('./routes/place.routes'))

if(process.env.NODE_ENV === 'production') {
    app.use('/',express.static(path.join(__dirname,'client','build')))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(path.resolve(__dirname,'client','build','index.html')))
    })
}

const PORT = config.get('PORT') || 5000

async function start() {
    try{
        await mongoose.connect(
            config.get('mongoUri'),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        )
        app.listen(PORT,() => console.log(`Приложение запущено на порту ${PORT}...`) )
    }
    catch (e){
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
start()