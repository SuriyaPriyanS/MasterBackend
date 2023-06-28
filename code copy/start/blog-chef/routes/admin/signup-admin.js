import {signUpAdmin} from '../../controllers/user'

export default async(req, res) => {
  try {
    const {email,password,name} = req.body
    await signUpAdmin({email, password,name})
    res.redirect('/admin/login')
  } catch (error) {
    res.redirect('/admin/signup')
  }
};
