/**
 * 这是带有内存数据库的测试版后端服务器
 * 真实运行需要使用 Node.js + Express 或其他框架。
 */
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// 静态文件服务，方便直接测试网页
app.use(express.static(__dirname));

// ========== 模拟的内存数据库 ==========
const db = {
    rooms: ['公开课教室1', '公开课教室2', '大礼堂', '多功能厅', '操场', '会议室301'],
    reservations: [],
    broadcasts: []
};

// 初始化一点假数据以供测试使用
const today = new Date();
const dStr = (offset) => {
    let d = new Date(today);
    d.setDate(today.getDate() + offset);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
db.reservations.push(
    { date: dStr(0), timeFrom: '08:00', timeTo: '10:00', room: '大礼堂', club: '话剧社', purpose: '排练' },
    { date: dStr(1), timeFrom: '14:30', timeTo: '16:00', room: '操场', club: '足球社', purpose: '训练' },
    { date: dStr(2), timeFrom: '18:00', timeTo: '20:30', room: '公开课教室1', club: '街舞社', purpose: '招新' }
);
// ===================================

// 获取所有教室的 API
app.get('/api/rooms', (req, res) => {
    res.json(db.rooms);
});

// 获取未来预约记录的 API
app.get('/api/reservations', (req, res) => {
    res.json(db.reservations);
});

// 处理教室预约的 API
app.post('/api/reserve', (req, res) => {
    const { date, timeFrom, timeTo, room, purpose, club } = req.body;
    console.log('收到教室预约请求:', req.body);
    
    // 内存数据库写入：如果有遇到新的自定义教室，自动加入常驻列表
    if (!db.rooms.includes(room)) {
        db.rooms.push(room);
    }
    
    db.reservations.push({ date, timeFrom, timeTo, room, purpose, club });
    
    res.json({ success: true, message: '预约成功' });
});

// 处理添加广播的 API
app.post('/api/broadcast', (req, res) => {
    const { club, date, content } = req.body;
    console.log('收到添加广播请求:', req.body);
    
    // 内存数据库写入
    db.broadcasts.push({ club, date, content });
    
    res.json({ success: true, message: '广播添加成功' });
});

// 获取所有广播的 API
app.get('/api/broadcasts', (req, res) => {
    res.json(db.broadcasts);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Test Server is running on http://localhost:${PORT}`);
    console.log(`请在浏览器中打开: http://localhost:${PORT}/index.html`);
});
