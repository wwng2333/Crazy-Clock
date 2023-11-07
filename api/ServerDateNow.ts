import { VercelRequest, VercelResponse } from '@vercel/node';
module.exports = async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(Date.now().toString());
}
