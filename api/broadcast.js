import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { club, date, content } = req.body;
        
        let broadcasts = await kv.get('broadcasts') || [];
        broadcasts.push({ club, date, content });
        await kv.set('broadcasts', broadcasts);
        
        res.status(200).json({ success: true, message: '广播添加成功' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
