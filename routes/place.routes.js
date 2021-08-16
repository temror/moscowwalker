const {Router} = require('express')
const UserPlace = require('../models/UserPlace')
const auth = require('../middleware/auth.middleware')
const WholePlaces = require('../models/Place')
const router = Router()

router.post(
    '/',
    auth,
    async (req, res) => {
        try {
            const places = await WholePlaces.find()

            const place = places[Math.floor(Math.random() * places.length)]
            const check = async () =>{
                const ownerPlaces = await UserPlace.find({owner: req.body.id})
                const candidate = await UserPlace.findOne({name: place.name,owner: req.body.id})
                if(ownerPlaces.length === places.length){
                    res.status(400).json({message:'Места закончились'})
                }
                if(!!candidate){
                    await check()
                }
                res.json(place)
            }
            await check()
        } catch (e) {
            //ошибка
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    })
router.post(
    '/visit',
    auth,
    async (req,res)=>{
        try{
            const body = req.body

            const visitedPlace = new UserPlace({
                name: body.place.name,
                description: body.place.description,
                visited: body.visit,
                owner: req.user.userId
            })
            await visitedPlace.save()
            res.status(201).json({visitedPlace})
        }catch (e){
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    })
router.get('/visited',auth, async (req,res)=>{
    try{
        const visitedPlaces = await UserPlace.find({owner: req.user.userId})
        res.status(201).json({visitedPlaces})
    }catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
    }

)
module.exports = router