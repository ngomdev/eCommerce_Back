import bcrypt from 'bcryptjs'


const users = [
    {
        name: 'Admin user',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true

    },
    {
        name: 'khadim ngom',
        email: 'khadim@example.com',
        password: bcrypt.hashSync('123456', 10),


    },
    {
        name: 'modou diop',
        email: 'modou@example.com',
        password: bcrypt.hashSync('123456', 10),


    }
]




export default users