import User from './user.model.js'
import { encrypt, checkPassword } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) => {
    try {
        return res.send({ message: 'Serever running' })
    } catch (error) {
        console.error(error)
        return error
    }
}

//REGISTRAR USUARIO 
export const register = async (req, res) => {
    try {
        let data = req.body

        //VALIDAR QUE EL DPI TENGA 13 DIGITOS.
        if (!(/^\d{13}$/.test(data.DPI))) {
            return res.status(400).send({ message: 'ERROR!! The DPI must have 13 digits' })
        }

        //VALIDAR QUE LA CONTRASENA TENGA 8 CARACTERES.
        if (data.password.length < 8) {
            return res.status(400).send({ message: 'ERROR!! The password must be at least 8 characters long.' })
        }

        //Validacion para la existencia de los datos.
        let dpiExist = await User.findOne({ DPI: data.DPI })
        if (dpiExist) return res.send({ message: 'ERROR!! The DPI is already registered with another user.' })
        let emailExist = await User.findOne({ email: data.email })
        if (emailExist) return res.send({ message: 'ERROR!! The email is already registered with another user. ' })
        let phoneExist = await User.findOne({ phone: data.phone })
        if (phoneExist) return res.send({ message: 'ERROR!! The phone is already registered with another user.' })

        //VALIDACION DE CAMPOS VACIOS.
        if (data.name === '' || data.surname === '' || data.DPI === '' || data.phone === '' || data.password === '') {
            return res.send({ message: 'Please, fill in all requested fields.' })
        }

        //ENCRIPTACION DE LA CONTRASENA
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({ message: 'SE GUARDOO CHUKY' })

    } catch (error) {
        console.error("Error while registering:", error)
        return res.status(500).send({ message: 'ERROR!! While registering.', error })
    }
}

//LOGIN DE USUARIO
export const login = async (req, res) => {
    try {
        let { password, email, DPI, phone } = req.body
        let user = await User.findOne({ $or: [{ email: email }, { DPI: DPI }, { phone: phone }] })
        user && await checkPassword(password, user.password)
        let loggedUser = {
            uid: user._id,
            surname: user.surname,
            name: user.name,
            phone: user.phone,
        }
        let token = await generateJwt(loggedUser)
        return res.send({
            message: `Wecome ${loggedUser.name}`,
            loggedUser,
            token
        }) 
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error trying to log in' })
    }
} 

//UPADTE DE USUARIO 
export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have sumbmitted some data that cannot be updated or missing data' })

        let updatedUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        //Validar si se actualizó
        if (!updatedUser) return res.status(401).send({ message: 'User not found and not updated' })
        //Responder con el dato actualizado
        return res.send({ message: 'Updated user', updatedUser })
    } catch (error) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({ message: `Username ${err.keyValue.username} is already taken` })
        return res.status(500).send({ message: 'Error updating account' })
    }
}

//DELETE DE USUARIO 
export const deleteU = async (req, res) => {
    try {
        let { id } = req.params
        let deletedUser = await User.findOneAndDelete({ _id: id })
        if (!deletedUser) return res.status(404).send({ message: 'Account not found and not deleted' })
        return res.send({ message: `Account with username ${deletedUser.username} deleted successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting account' })
    }
}