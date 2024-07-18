import { Schema, model } from "mongoose"

const finalOfferHomeSchema = new Schema({
    workOffer: {
        type: Schema.ObjectId,
        ref: 'workOffer',
        required: true
    },
    workDate: {
        type: Date,
        default: Date.now
    },
    workSite: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    /*profesional: {
        type: Schema.ObjectId,
        ref: 'professional',
        required: true
    },*/
    status: {
        type: String,
        enum: ['ACTIVO', 'INACTIVO'],
        required: true
    }


}, {
    versionKey: false
})

export default model ('finalOfferHome', finalOfferHomeSchema)