import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        let rooms = await kv.get('rooms');
        if (!rooms) {
            rooms = ['公开课教室1', '公开课教室2', '大礼堂', '多功能厅', '操场', '会议室301'];
            // 首次访问时初始化默认教室配置
            await kv.set('rooms', rooms);
        }
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
