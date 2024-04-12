const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: __dirname + '../../.env' });

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    if(!username ||!email || !password){
        res.status(400)
        throw new Error("complete forms")
    }
    const emailAvailable = await User.findOne({email})
    if(emailAvailable){
        res.status(400)
        throw new Error("User already registered")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    console.log("hash", hashPassword)
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    })
    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(400)
        throw new Error("User data invalid")
    }
    console.log(`User created ${user}`)
})

const loginUser = asyncHandler(async  (req,res) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(400).json({message: "All fields are required"})
    }
    const user = await User.findOne({ email })

    if(user && (await bcrypt.compare(password, user.password))){

        const accessToken = jwt.sign({
            user:{
                username : user.username,
                email: user.email,
                id: user.id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn:"1m" })
        res.status(200).json({accessToken})

        const refreshToken = jwt.sign(
            {"username": user.username},
            process.env.REFRESH_ACCESS_TOKEN,
            {expiresIn: "1d"}
        )

        //create cookie
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true, //https
            sameSite: 'None',
            maxAge: 7 * 24 *60 * 60* 1000 // expiry for cookie
        })

        res.json({accessToken})

    }else{
        res.status(401).json({message: "Wrong credentials!"})
    }
})

//@desc refresh
//@route GET /user/refresh
//@access public
const refresh = asyncHandler(async(req, res)=> {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            const foundUser = await User.findOne({ username: decoded.username })

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "user": {
                        "username": foundUser.username,
                        "email": foundUser.email,
                        "id": foundUser.id,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
})


//@desc Logout
//@route POST  /user/logout
//@access public
const logout = asyncHandler(async(req, res)=>{
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
})

//@desc Cuurent User Info
//@route user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports= {loginUser, registerUser, currentUser, logout, refresh}