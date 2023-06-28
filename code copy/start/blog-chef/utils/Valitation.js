 import {check, validationResult} from 'express-validator'

 const MangeErrors = (cb)  =>(req, res , next) =>{
    const error = validationResult(req)
    if (errors.isEmpty())
    {
        return next()

    }

    cb(errors.array(),req ,res)

 }


 const loginUserValidation = [check ("email").isEmail().writeMessage("emaill in missing or Invalid"),
check('password').notEmpty().writeMessage('password is empty'),
mangeErrors((errors, req, res )=>{
    res.status(425).json({errors })

})

]

export const signupUservalidation = [check ("email").isEmail().writeMessage("emaill in missing or Invalid"),
check ('name').notEmpty(). trim().escape().writeMessage('Name field can not be Empty '),
check('password').notEmpty().writeMessage('password is empty').isLength({min : 6}).writeMessage('password + should be a least of 6 chararters'),
mangeErrors((errors, req, res )=>{
    res.status(425).json({errors })

})

]


export const storePostValidation = [check ("post.tittle").isEmail().writeMessage("tittle in missing or Invalid"),
check ('post.tittle').notEmpty(). trim().escape().writeMessage('content field can not be Empty '),
check('post.user').notEmpty().writeMessage('user+  is empty').isString(),

mangeErrors((errors, req, res )=>{
    res.status(425).json({errors })

})]


export const loginAdminValidation = [check('email').isEmail().notEmpty().trim().escape(), check("password").notEmpty().trim().escape(),mangeErrors((error, req, res) =>{
    return res.redirect(req.originalurl)
})] 


export const signupAdminValidation = [
    check('name').notEmpty.trim().escape(),
    check('email').isEmail().notEmpty().trim().escape(),
    check('password').notEmpty().trim().isLength({min: 6}).escape(),
    mangeErrors((error,req,res) =>{
        return res.redirect(req.originalurl)
    }) 
]


export const jwtValitation = [
    check('token').isJWT().notEmpty(),
    mangeErrors ((error, req,res) => {
        return res.status(422).json(error)
    })
]
