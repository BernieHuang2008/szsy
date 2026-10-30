import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { date, timeFrom, timeTo, room, purpose, club } = req.body;
        
        // 1. 获取并更新教室列表（如果选择了新的自定义教室）
        let rooms = await kv.get('rooms') || ['公开课教室1', '公开课教室2', '大礼堂', '多功能厅', '操场', '会议室301'];
        if (!rooms.includes(room)) {
            rooms.push(room);
            await kv.set('rooms', rooms);
        }
        
        // 2. 获取并追加新的预约记录
        let reservations = await kv.get('reservations') || [];
        reservations.push({ date, timeFrom, timeTo, room, purpose, club });
        await kv.set('reservations', reservations);
        
        res.status(200).json({ success: true, message: '预约成功' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
