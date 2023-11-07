import { VercelRequest, VercelResponse } from '@vercel/node';
module.exports = async (req: VercelRequest, res: VercelResponse) => {
    res.status(204).send('OK');    
}
