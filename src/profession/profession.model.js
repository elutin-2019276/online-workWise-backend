'use strict'

import { Schema, model } from "mongoose";

const professionSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.ObjectId,
        rref: 'user',
        required: true
    }
}, {
    versionKey: false
})

export default model('profession', professionSchema)