import { sendMailToRegister, sendMailToRecoveryPassword } from "../config/nodemailer.js"
import Veterinario from "../models/Veterinario.js"

// Esta línea elimínala, es la que causa el error por redeclaración:
// import mailer from "../config/nodemailer.js";

// Esta también elimínala, pues redeclara variables ya importadas:
// const { sendMailToRegister, sendMailToRecoveryPassword } = mailer;

const registro = async (req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarEmailBDD = await Veterinario.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})

    const nuevoVeterinario = new Veterinario(req.body)
    nuevoVeterinario.password = await nuevoVeterinario.encrypPassword(password)
    
    const token = nuevoVeterinario.crearToken();
    nuevoVeterinario.token = token; // <-- AQUÍ ESTABA EL PROBLEMA
    
    await sendMailToRegister(email,token)
    await nuevoVeterinario.save()

    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})
}
const confirmarMail = async (req, res) => {
    const { token } = req.params;

    const veterinarioBDD = await Veterinario.findOne({ token });

    if (!veterinarioBDD) {
        // Puede que el token sea inválido o que ya esté confirmado
        return res.status(404).json({ msg: "El token es inválido o ya fue usado para confirmar la cuenta." });
    }

    if (veterinarioBDD.confirmEmail) {
        return res.status(400).json({ msg: "La cuenta ya está confirmada." });
    }

    veterinarioBDD.token = null;
    veterinarioBDD.confirmEmail = true;
    await veterinarioBDD.save();

    res.status(200).json({ msg: "Cuenta confirmada correctamente" });
};

const recuperarPassword = async (req,res) => {
    //! ---->> 1
    const {email} = req.body
    //! ---->> 2
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const veterinarioBDD = await Veterinario.findOne({email})
    if (!veterinarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    //! ---->> 3
    const token = veterinarioBDD.crearToken()
    veterinarioBDD.token = token
    await sendMailToRecoveryPassword(email,token)
    await veterinarioBDD.save()
    //! ---->> 4
    res.status(200).json({msg:"Revisa tu correo para restablecer la contraseña"})
}


const comprobarTokenPassword = async (req,res) => {
    //! ---->> 1
    const {token} = req.params
    //! ---->> 2
    const veterinarioBDD = await Veterinario.findOne({token})
    if (veterinarioBDD.token !== token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    //! ---->> 3
    await veterinarioBDD.save()
    //! ---->> 4
    res.status(200).json({msg:"Token confirmado, ya puedes crear tu nuevo password"})
}



const crearNuevoPassword = async (req,res) => {
    //! ---->> 1
    const{password,confirmPassword} = req.body
    //! ---->> 2
    if(Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if(password!==confirmPassword) return res.status(404).json({msg:"Lo sentimos, los password no coinciden"})
    const veterinarioBDD = await Veterinario.findOne({token:req.params.token})
    console.log(veterinarioBDD)
    if (veterinarioBDD.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, la cuenta no se puede validar"})
    //! ---->> 3
    veterinarioBDD.token = null
    veterinarioBDD.password = await veterinarioBDD.encrypPassword(password)
    await veterinarioBDD.save()
    //! ---->> 4
    res.status(200).json({msg:"Felicitacioens, ya puedes inciar sesión con tu nuevo password"})
}
const login = async(req,res) => {
    const {email,password} = req.body

    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    
    const veterinarioBDD = await Veterinario.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    
    if(!veterinarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    if(veterinarioBDD.confirmEmail === false) return res.status(403).json({msg:"Lo sentimos, debe verificar su cuenta"})
    
    const verificarPassword = await veterinarioBDD.matchPassword(password)
    if(!verificarPassword) return res.status(401).json({msg:"Lo sentimos, el password no es el correcto"})
    
    const {nombre,apellido,direccion,telefono,_id,rol} = veterinarioBDD

    res.status(200).json({
        rol,
        nombre,
        apellido,
        direccion,
        telefono,
        _id,
        email:veterinarioBDD.email
    })
}

export {
    registro,
    confirmarMail,
    recuperarPassword,
    comprobarTokenPassword,
    crearNuevoPassword,
    login
}
