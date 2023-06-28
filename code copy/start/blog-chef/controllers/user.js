import User from "../models/user";
import jwt from 'jsonwebtoken'

const sign = (obj) => new Promise((resolve,reject) => {
    jwt.sign(obj, process.env.jwtPrivateKey, (err, token) => {
        if(err) return reject(err)
        return resolve(token)
    })
})

const verify = token => new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwtPrivateKey, (error) => {
        if(error) reject(error)
        return resolve()
    })
})

export const signUpAdmin =async ({email, password,name}) => {
    try {
       await User.create({name, email, password, isAdmin: true}) 
       return Promise.resolve()
    } catch (error) {
        return Promise.reject({error})
    }
}

export const loginAdmin =async ({email, password}) => {
   try {
    const user = await User.findOne({email: email, isAdmin: true})
    await user.checkPassword(password)
    await user.updateLastLoggedIn()
    return Promise.resolve(user)
   } catch (error) {
    return Promise.reject(error)
   }
}

export const signUpUser = async ({name,email,password}) => {
    try {
        const user = await User.create({name, email, password}) 

        // Generate a JWT token
        const token = await sign({
            id: user._id,
            name: user.name,
            email: user.email
        })

        return Promise.resolve({
            user: {id: user._id, 
                    name: user.name,
                    email: user.email,
                    lastLoggedIn: user.lastLoggedIn}, 
                    token
        })

    } catch (error) {
        return Promise.reject(error)
    }
}  

export const loginUser = async ({email, password}) => {
    try {
        const user = await User.findOne({email})
        await user.checkPassword(password)
        await user.updateLastLoggedIn()
        const token = await sign({
            id: user._id,
            name: user.name,
            email: user.email
        })
        console.log("token", token)
        return Promise.resolve({
            user: {id: user._id, 
                    name: user.name,
                    email: user.email,
                    lastLoggedIn: user.lastLoggedIn}, token
        })
    } catch (error) {
        return Promise.error(error)
    }
}

export const verifyToken = async (token) => {
    try {
        const user = jwt.decode(token)
        const foundUser = await User.findOne({email: user.email})

        if(!foundUser) {
            return Promise.reject({error: 'Unauthorized!'})
        }

        // verify token and resolve
        await verify(token)
        return Promise.resolve()
    } catch (error) {
        return Promise.reject({error: 'Unauthorized!'})
    }
}