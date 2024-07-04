import { Schema, model } from "mongoose"

const workOfferSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    problemDescription: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    professional: {
        type: Schema.ObjectId,
        ref: 'professional',
        required: true
    },
    status: {
        type: String,
        enum: ['ACTIVO', 'INACTIVO'],
        required: true
    }
}, {
    versionKey: false
})

export default model('workOffer', workOfferSchema)