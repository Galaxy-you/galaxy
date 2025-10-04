const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 密钥从环境变量中获取
const API_KEY = process.env.DASHSCOPE_API_KEY; 

app.post('/api/chat', async (req, res) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
            headers: {
                'Content-Type': 'application/json',
                // 使用环境变量
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

app.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});