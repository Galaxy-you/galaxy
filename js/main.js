<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>星河探索 - 天文科普网站</title>
    <link rel="stylesheet" href="css/index.css">
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">
</head>
<body>
    <!-- 星空背景 -->
    <div class="stars-bg" id="stars-bg"></div>

    <!-- 导航栏 -->
    <header class="nav-header">
        <nav class="nav-container">
            <a href="#" class="logo">
                <span class="logo-icon">🌌</span>
                <span class="logo-text">星河探索</span>
            </a>
            <div class="nav-menu">
                <!-- 这里可以添加导航链接 -->
            </div>
        </nav>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-container">
        <!-- 网站标题区域 -->
        <section class="hero-section fade-in">
            <h1 class="hero-title">探索无垠宇宙</h1>
            <p class="hero-subtitle">🌟 发现星空奥秘，感受宇宙魅力 🌟</p>
            <p class="hero-description">
                从遥远的星系到神秘的黑洞，从古老的星座传说到最新的天文发现，
                让我们一起踏上这场精彩的宇宙之旅，探索那些隐藏在星空深处的无尽奥秘。
            </p>
        </section>

        <!-- 功能模块 -->
        <section class="modules-grid">
            <div class="module-card fade-in" onclick="location.href='pages/astronomy-knowledge.html'">
                <div class="module-icon">🪐</div>
                <h2 class="module-title">天文知识</h2>
                <p class="module-desc">深入了解太阳系、恒星、星系和宇宙的基础知识...</p>
            </div>

            <div class="module-card fade-in" onclick="location.href='pages/latest-news.html'">
                <div class="module-icon">📡</div>
                <h2 class="module-title">最新时讯</h2>
                <p class="module-desc">获取最新的天文发现、太空探索任务进展...</p>
            </div>

            <div class="module-card fade-in" onclick="location.href='pages/space-gallery.html'">
                <div class="module-icon">🌌</div>
                <h2 class="module-title">太空漫步</h2>
                <p class="module-desc">欣赏来自哈勃、韦伯等太空望远镜的绝美宇宙图片...</p>
            </div>

            <div class="module-card fade-in" onclick="location.href='pages/space-games.html'">
                <div class="module-icon">🎮</div>
                <h2 class="module-title">趣味游戏</h2>
                <p class="module-desc">通过互动游戏学习天文知识，包括星座识别、行星探索...</p>
            </div>
        </section>

        <!-- AI问答区域 -->
        <section class="ai-chat-section fade-in">
            <h2 class="ai-title">🤖 天文AI助手</h2>
            <p style="text-align: center; margin-bottom: 30px; opacity: 0.8;">
                有任何天文问题？让AI助手为你解答！
            </p>
            <div class="ai-input-container">
                <input 
                    type="text" 
                    class="ai-input" 
                    placeholder="请输入您的天文问题，如：什么是黑洞？火星上有生命吗？"
                    id="ai-question-input"
                />
                <button class="ai-submit-btn" onclick="submitQuestion()">
                    🚀 提问
                </button>
            </div>
            <div id="ai-response" style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 15px; display: none;">
                <p style="color: #64b5f6; font-weight: bold; margin-bottom: 10px;">AI助手回答：</p>
                <p id="ai-answer"></p>
            </div>
        </section>
    </main>

    <!-- 外部 JS -->
    <script src="js/main.js"></script>
</body>
</html>
