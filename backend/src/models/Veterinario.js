import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const veterinarioSchema = new Schema({
    nombre:{
        type:String,                  
        required:true,
        trim:true
    },
    apellido:{
        type:String,                  
        required:true,
        trim:true
    },
    direccion:{
        type:String,                  
        default:null,
        trim:true
    },
    celular:{
        type:String,                  
        default:null,
        trim:true
    },
    email:{
        type:String,                  
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,                  
        required:true
    },
    status:{
        type:Boolean,                  
        default:true
    },
    token:{
        type:String,                  
        default:null
    },
    confirmEmail:{
        type:Boolean,                  
        default:false
    },
    rol:{
        type:String,                  
        default:"veterinario"
    }
},{
    timestamps:true
})

// Método para encriptar contraseña
veterinarioSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

// Método para comparar password
veterinarioSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

// Método para crear token
veterinarioSchema.methods.crearToken = function(){
    return crypto.randomBytes(20).toString('hex')
}

const Veterinario = model('Veterinario', veterinarioSchema)
export default Veterinario


