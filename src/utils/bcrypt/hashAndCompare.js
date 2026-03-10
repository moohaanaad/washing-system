import bcrypt from 'bcrypt'

export const hashPassword = (password) => {
    console.log(Number(process.env.saltOrRound))
    return bcrypt.hashSync(password, Number(process.env.saltOrRound))
} 
