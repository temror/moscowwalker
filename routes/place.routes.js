const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const Place = require('../models/Place')
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
            const place = filterPlaces[Math.floor(Math.random() * filterPlaces.length)]
            res.json({place,fpLength:filterPlaces.length})
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
            const visitedPlace = await Place.updateOne({_id: placeId}, {$push: {owners: {id: userId, visited: visit}}})
            res.status(201).json({visitedPlace})
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    })
router.post(
    '/update',
    auth,
    async (req, res) => {
        try {
            const {placeId, userId, visit} = req.body
            const update = await Place.findOneAndUpdate(
                { _id : placeId },
                { $set: { "owners.$[elem].visited" : visit } },
                { arrayFilters: [ { "elem.id": userId } ] })
            res.status(201).json({update})
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    })
router.post(
    '/delete',
    auth,
    async (req, res) => {
        try {
            const {placeId, userId} = req.body
            await Place.findOneAndUpdate(
                { _id : placeId },
                { $pull: { owners : {id:userId}}})
            res.status(201).json({message: 'Место удалено'})
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    })
router.get('/visited/:visited/:userId', auth, async (req, res) => {
        try {
            let visit = true
            if (req.params.visited !== "true") {
                visit = false
            }
            const places = await Place.find()
            const visitedPlaces = []
            places.forEach(p => {
                p.owners.forEach(o => {
                    if (o.id.toString() === req.params.userId.toString() &&
                        o.visited === visit) {
                        visitedPlaces.push(p)
                    }
                })
            })
            res.status(201).json({visitedPlaces})
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    }
)
router.get('/selected/:id', auth, async (req, res) => {
        try {
            const selected = await Place.findOne({_id: req.params.id})
            res.json(selected)
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    }
)
module.exports = router