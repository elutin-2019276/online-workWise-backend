import { Schema, model} from "mongoose"

const userSchema = new Schema({
    name:{
        type: String,
        require: true
    }, 
    username:{
        type: String, 
        unique: [true, 'The username already exists'],
        require: true
    },
    DPI: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    }, 
    phone: {
        type: Number, 
        required: true
    },
    email: {
        type: String, 
        unique: true, 
        required: false
    },
    password: {
        type: String, 
        required: true,
        minLength: [8, 'The password must be at least 8 characters.'] 
    }
}, {
    versionKey: false
})

export default model('user', userSchema)

