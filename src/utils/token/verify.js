import jwt from 'jsonwebtoken'


export const verifyToken = ({ token, key = process.env.JWT_KEY }) => {
    try {
        
        const payload = jwt.verify(token, key);
        if (!payload) {
            return { error: 'Invalid token type' };
        }
        return payload;
    } catch (error) {
        return { error }
    }
}