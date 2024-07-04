'use strict'

import { Schema, model } from "mongoose";

const employerSchema = new Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    descriptionCompany: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    versionKey: false
});

export default model('Employer', employerSchema);