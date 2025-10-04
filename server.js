const express = require('express');
const cors = require('cors');
// 使用axios替代fetch
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.')); 

app.post('/api/chat', async (req, res) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'sk-d53769f8492e476bb697b1dd2b187d6d' 
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