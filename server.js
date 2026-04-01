/**
 * 这是一个简单的后端占位文件，以便完整体现前后端分离。
 * 真实运行需要使用 Node.js + Express 或其他框架。
 */
const express = require('express');
const app = express();
app.use(express.json());

// TODO: 获取所有教室的 API
app.get('/api/rooms', (req, res) => {
    // 这里可以从数据库获取
    res.json(['公开课教室1', '公开课教室2', '大礼堂', '多功能厅', '操场', '会议室301']);
});

// TODO: 获取未来预约记录的 API
app.get('/api/reservations', (req, res) => {
    const today = new Date();
    const dStr = (offset) => {
        let d = new Date(today);
        d.setDate(today.getDate() + offset);
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    };
    
    // 返回一些用于测试假数据，实际应查数据库
    res.json([
        { date: dStr(0), timeFrom: '08:00', timeTo: '10:00', room: '大礼堂', club: '话剧社' },
        { date: dStr(1), timeFrom: '14:30', timeTo: '16:00', room: '操场', club: '足球社' },
        { date: dStr(2), timeFrom: '18:00', timeTo: '20:30', room: '公开课教室1', club: '街舞社' }
    ]);
});

// TODO: 处理教室预约的 API
app.post('/api/reserve', (req, res) => {
    const { date, timeFrom, timeTo, room, purpose, club } = req.body;
    console.log('收到教室预约请求:', req.body);
    // TODO: 实现数据库写入、冲突检测逻辑
    res.json({ success: true, message: '预约请求已收到' });
});

// TODO: 处理添加广播的 API
app.post('/api/broadcast', (req, res) => {
    const { club, date, content } = req.body;
    console.log('收到添加广播请求:', req.body);
    // TODO: 实现数据库写入等记录逻辑
    res.json({ success: true, message: '广播记录已收到' });
});

app.listen(3000, () => {
    console.log('Mock Server is running on port 3000');
});
