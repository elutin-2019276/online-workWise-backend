import mongoose from 'mongoose';

const employerSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    descriptionCompany: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Employer = mongoose.model('Employer', employerSchema);

export default Employer;
