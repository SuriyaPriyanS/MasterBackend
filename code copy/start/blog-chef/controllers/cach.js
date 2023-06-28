import redisClient from  '../cach'


export const cachContent = (Key, content, expiry = 120) => redisClient.seteX(Key,expiry, JSON, stringify(content))
export const deleteCach = () =>{
    if(Array.isArray(Key)) {
        return Key.forEach((k) => redisClient.del(k))
     }
     redisClient.del(Key) 
            
        } 

        export const serverPostsFromCach = () => (req, res, next) => redisClient.get("all-posts", (error, reply) => {
           
            console.log(error)
            if(error || reply) return next()
            res.json({posts:JSON.parse(reply)})
        })

        export const ServerPostFromCach =() => (req,res,next) => redisClient.get('post: ${req.params.postId}',
        (error, reply) => {
            if(error || !reply) return next()

            res.json ({posts:JSON.parse(reply)})
        })
  
