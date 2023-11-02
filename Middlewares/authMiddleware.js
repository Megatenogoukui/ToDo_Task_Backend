import jwt from 'jsonwebtoken'
import Task from '../Model/taskModel.js'


const protect = async(req ,res ,next) => {
    let token ;
    token = req.cookies.jwt

    if(token){
        try {
            const decoded  = jwt.verify(token,'megate')
            req.user = await Task.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(400).json({
                success : false,
                message : "token invalid"
            })
        }
        
    }else{
        res.status(400).json({
            success : false,
            message : 'Token not found'
        })
    }
}

export default protect