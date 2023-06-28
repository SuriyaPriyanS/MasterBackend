import mongoose from 'mongoose'

const connectToDb = () => mongoose.connect(`mongodb+srv://${process.env.atlasUser}:${process.env.atlasPassword}@cluster0.ednexjp.mongodb.net/?retryWrites=true&w=majority`)

export default connectToDb