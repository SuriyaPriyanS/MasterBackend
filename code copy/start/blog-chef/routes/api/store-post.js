import {createPost} from '../../controllers/post'
import {deleteCach} from '../../controllers/cach'

export default async(req,res) => {
  try {
   const post = await createPost(req.body.post)
   deleteCach('all-posts')
   res.json({post})
  } catch (error) {
      res.status(401).json({error})
  }
}