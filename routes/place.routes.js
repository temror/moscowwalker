const {Router} = require('express')
const UserPlace = require('../models/UserPlace')
const auth = require('../middleware/auth.middleware')
const Place = require('../models/Place')
const User = require('../models/User')
const router = Router()

router.post(
    '/',
    auth,
    async (req, res) => {
        try {
            const places = await Place.find()
            const filterPlaces = await Place.find({owners: {$exists: false}})
            places.forEach(e => {
                let counter = 0
                e.owners.forEach(f => {
                    if (f.id.toString() === req.body.id.toString()) {
                        counter++
                    }
                })
                if(counter===0){
                    filterPlaces.push(e)
                }
            })
            console.log(filterPlaces)
            const place = filterPlaces[Math.floor(Math.random() * places.length)]

            res.json(place)
        } catch (e) {
            //ошибка
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    })
router.post(
    '/visit',
    auth,
    async (req, res) => {
        try {
            const {placeId, userId, visit} = req.body
            const visitedPlace = await Place.updateOne({_id:placeId},{$push: {owners:{id:userId,visited:visit}}})
            console.log(visitedPlace)
            res.status(201).json({visitedPlace})
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    })
router.post(
    '/create',
    auth,
    async (req, res) => {
        try {
            const place = new Place({
                name: "Красная площадь",
                description: "Описание для красной площади.",
                location: {
                    metro: "Охотный ряд",
                    yandex: "yandex.ru"
                }
            })
            await place.save()
            res.status(201).json({place})
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    })
router.get('/visited', auth, async (req, res) => {
        try {
            console.log('on server')
            const places = await Place.find()
            const visitedPlaces = []
            places.forEach(p=>{
                p.owners.forEach(o=>{
                    if(o.visited===true){
                        visitedPlaces.push(p)
                    }
                })
            })
            console.log(visitedPlaces)
            res.status(201).json({visitedPlaces})
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    }
)
module.exports = router