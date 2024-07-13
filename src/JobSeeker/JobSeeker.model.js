'use strict'

import { Schema, model } from "mongoose"

const JobSeekerSchema = Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    curriculumVitae: {
        type: String,
        required: true
    }

})

export default model('JobSeeker', JobSeekerSchema)