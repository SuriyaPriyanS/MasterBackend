import { cachContent } from "../../controllers/cach";
import { getAllPosts } from "../../controllers/post";

export default async (req,res) => {
  try {
    const posts = await getAllPosts()
     await cachContent('all-posts',posts)
    res.json({posts})
  } catch (error) {
    console.log(error)
    res.status(404).json({error})
  }
}