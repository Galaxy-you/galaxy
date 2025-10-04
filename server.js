const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const API_KEY = process.env.DASHSCOPE_API_KEY; 

app.post('/api/chat', async (req, res) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': API_KEY 
            },
            data: req.body
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ 
            error: error.message,
            details: error.response ? error.response.data : 'No detailed error information'
        });
    }
});

// Vercel 不需要 app.listen!
// app.listen(3000, () => {
//     console.log('服务器运行在 http://localhost:3000');
// });

module.exports = app; // 关键：导出 app，给 Vercel 识别