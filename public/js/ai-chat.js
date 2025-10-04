// 配置信息
const AI_CONFIG = {
    apiUrl: '/api/chat',
    model: 'qwen-turbo'
};

// 存储对话历史
let chatHistory = [
    {
        role: 'system',
        content: '你是一个专业的天文学AI助手，能够回答用户关于宇宙、星系、行星等天文学问题。'
    }
];

// 展示对话历史区域
function createChatHistoryUI() {
    const responseDiv = document.getElementById('ai-response');
    if (!document.getElementById('chat-history')) {
        const historyDiv = document.createElement('div');
        historyDiv.id = 'chat-history';
        historyDiv.className = 'chat-history';
        historyDiv.style.marginBottom = '20px';
        responseDiv.parentNode.insertBefore(historyDiv, responseDiv);
    }
    return document.getElementById('chat-history');
}

// 添加消息到历史记录UI
function addMessageToUI(role, content) {
    const historyDiv = createChatHistoryUI();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    
    const iconClass = role === 'user' ? 'fa-user' : 'fa-robot';
    
    // 如果是AI助手回复，使用marked解析Markdown
    const formattedContent = role === 'assistant' && typeof marked !== 'undefined' 
        ? marked.parse(content) 
        : content;
    
    messageDiv.innerHTML = `
        <div class="message-header">
            <i class="fas ${iconClass}"></i>
            <strong>${role === 'user' ? '你' : 'AI助手'}</strong>
        </div>
        <div class="message-content">${formattedContent}</div>
    `;
    
    historyDiv.appendChild(messageDiv);
    historyDiv.scrollTop = historyDiv.scrollHeight;
}

// 提交问题
async function submitQuestion() {
    const input = document.getElementById('ai-question-input');
    const question = input.value.trim();

    if (!question) {
        alert('请输入问题！');
        return;
    }

    // 添加用户问题到UI和历史记录
    addMessageToUI('user', question);
    chatHistory.push({
        role: 'user',
        content: question
    });

    // 在聊天历史区域添加一个临时的加载指示器
    const historyDiv = document.getElementById('chat-history');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message assistant-message loading';
    loadingDiv.innerHTML = '<div class="message-content"><i class="fas fa-spinner fa-spin"></i> AI正在思考中...</div>';
    historyDiv.appendChild(loadingDiv);
    historyDiv.scrollTop = historyDiv.scrollHeight;

    try {
        const response = await fetch(AI_CONFIG.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                model: AI_CONFIG.model,
                input: {
                    messages: chatHistory
                },
                parameters: {
                    result_format: 'message',
                    max_tokens: 800,
                    temperature: 0.7
                }
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API错误详情:', errorText);
            throw new Error(`API请求失败: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        
        // 提取AI回答
        const answer = data.output?.choices?.[0]?.message?.content || '抱歉，我无法回答这个问题。';
        
        // 从聊天历史中移除加载指示器
        historyDiv.removeChild(loadingDiv);
        
        // 添加AI回答到历史记录
        chatHistory.push({
            role: 'assistant',
            content: answer
        });
        
        // 添加到UI，使用markdown渲染
        addMessageToUI('assistant', answer);
        
        // 清空输入框
        input.value = '';

    } catch (error) {
        console.error('AI请求错误:', error);
        
        // 替换加载指示器为错误消息
        historyDiv.removeChild(loadingDiv);
        addMessageToUI('assistant', `
            <span style="color: #ff6b6b;">
                <i class="fas fa-exclamation-triangle"></i> 
                请求失败：${error.message}<br>
                <small>请确认后端服务是否正常运行在 http://localhost:3000</small>
            </span>
        `);
    }
}

// 打字机效果
function typeWriter(element, text, speed = 30) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 回车提交
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('ai-question-input');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitQuestion();
            }
        });
    }
    
    // 删除清空对话按钮的代码
});