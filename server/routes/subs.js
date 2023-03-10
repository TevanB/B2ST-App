const User = require("../models/UserModel")
const express = require("express")
const router = express.Router()

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SEC);

router.post("/", async (req, res)=>{
    const{email: email} = req.body
    const user = await User.findOne({email: email})
    if(!user){
        return res.status(400).json({error: "Authenticated user not found"})
    } else {
        const customerId = user.customer.id
        const subscription = await stripe.subscriptions.list(
            {
                customer: customerId,
                status: "all",
                expand: ["data.default_payment_method"]
            },
            {
                apiKey: process.env.STRIPE_SEC
            }
        )
        var plan
        if (!subscription.data.length){
            plan = []
        }
        else{
            plan = subscription.data[0].plan.nickname
        }
        res.json(plan)
    }
})





module.exports = router
