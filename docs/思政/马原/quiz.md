# 马原选择

<style>
/* --- 基础布局 --- */
.quiz-app {
    max-width: 850px;
    margin: 20px auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    background: var(--md-code-bg-color, #f8f9fa);
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* --- 顶部仪表盘 --- */
.dashboard {
    background: #fff;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}
.dash-item { display: flex; flex-direction: column; }
.dash-label { font-size: 0.8rem; color: #666; font-weight: bold; text-transform: uppercase;}
.dash-value { font-size: 1.2rem; font-weight: bold; color: #333; }
.progress-bar-container {
    width: 100%;
    height: 8px;
    background-color: #e9ecef;
    border-radius: 4px;
    margin-top: 10px;
    overflow: hidden;
}
.progress-bar-fill {
    height: 100%;
    background-color: #28a745;
    width: 0%;
    transition: width 0.5s ease;
}

/* --- 控制栏 --- */
.quiz-controls {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    align-items: flex-end;
}
.control-item { flex: 1; min-width: 180px; }
.control-item label { display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9em; color: #495057; }
.control-item select { width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; }

/* 错题模式开关 */
.mode-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fff0f0;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #ffcccc;
    color: #d63384;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
}
.mode-toggle input { width: 16px; height: 16px; cursor: pointer; }

/* --- 题目显示区 --- */
.question-card {
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    min-height: 200px;
}
.q-header { font-size: 1.15em; line-height: 1.6; margin-bottom: 20px; font-weight: bold; color: #212529; }
.badge { padding: 2px 8px; border-radius: 4px; font-size: 0.75em; color: white; margin-right: 8px; vertical-align: middle; }
.badge-single { background-color: #007bff; }
.badge-multi { background-color: #6610f2; }

/* 选项样式 */
.options { list-style: none; padding: 0; margin: 0; }
.option-li {
    margin-bottom: 12px;
    padding: 12px 16px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: flex-start;
}
.option-li:hover { background-color: #f8f9fa; }
.option-li.selected { background-color: #e7f1ff; border-color: #007bff; }
.option-li input { margin-top: 5px; margin-right: 12px; pointer-events: none; } 

/* 按钮区 */
.action-area { margin-top: 24px; display: flex; gap: 12px; justify-content: space-between; }
.btn-group { display: flex; gap: 10px; }
.btn { padding: 10px 24px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 600; color: white; transition: 0.2s; }
.btn-primary { background-color: #007bff; }
.btn-primary:hover { background-color: #0056b3; }
.btn-primary:disabled { background-color: #a0c4ff; cursor: not-allowed; }
.btn-next { background-color: #28a745; display: none; }
.btn-next:hover { background-color: #218838; }
.btn-danger { background-color: #dc3545; font-size: 12px; padding: 8px 16px;} 
.btn-danger:hover { background-color: #c82333; }
/* 手动移除按钮 */
.btn-remove { background-color: #6c757d; font-size: 13px; padding: 5px 10px; margin-left: 10px; border-radius: 4px; color: white; border: none; cursor: pointer; }
.btn-remove:hover { background-color: #5a6268; }

/* 反馈与状态 */
.feedback-box { margin-top: 20px; padding: 16px; border-radius: 6px; display: none; }
.feedback-correct { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
.feedback-wrong { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
.disabled-options .option-li { pointer-events: none; opacity: 0.7; }
</style>

<div class="quiz-app">
    <div id="loading-msg">⏳ 正在加载题库，请稍候...</div>
    
    <div id="quiz-main" style="display:none;">
        
        <div class="dashboard">
            <div class="dash-item">
                <span class="dash-label">总进度</span>
                <span class="dash-value" id="global-progress">0%</span>
            </div>
            <div class="dash-item">
                <span class="dash-label">错题本</span>
                <span class="dash-value" id="global-mistakes" style="color:#dc3545">0</span>
            </div>
            <div class="dash-item" style="align-self: flex-end;">
                 <button class="btn btn-danger" onclick="clearAllData()">🗑️ 重置所有记录</button>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar-fill" id="progress-bar"></div>
            </div>
        </div>

        <div class="quiz-controls">
            <div class="control-item">
                <label>选择章节</label>
                <select id="chapter-select" onchange="resetAndLoad()"></select>
            </div>
            <div class="control-item">
                <label>题目类型</label>
                <select id="type-select" onchange="resetAndLoad()">
                    <option value="all">全部题型</option>
                    <option value="single">单项选择题</option>
                    <option value="multi">多项选择题</option>
                </select>
            </div>
            <div class="control-item" style="flex: 0 0 auto;">
                <label>&nbsp;</label>
                <label class="mode-toggle">
                    <input type="checkbox" id="mistake-mode" onchange="resetAndLoad()">
                    🎯 只看错题
                </label>
            </div>
        </div>

        <div class="question-card">
            <div style="display:flex; justify-content:space-between; color:#999; font-size:0.9em; margin-bottom:10px;">
                <span id="chapter-progress">本章进度: 0/0</span>
                <span id="score-disp">本次得分: 0</span>
            </div>

            <div class="q-header" id="question-text"></div>
            <ul class="options" id="options-list"></ul>
            
            <div class="feedback-box" id="feedback-div"></div>

            <div class="action-area">
                <button class="btn btn-primary" id="btn-submit" onclick="submitAnswer()" disabled>提交答案</button>
                <button class="btn btn-next" id="btn-next" onclick="nextQuestion()">下一题 ➜</button>
            </div>
        </div>
    </div>
    
    <div id="error-msg" style="display:none; color:red; padding:20px; border:1px solid red; background:#fff;"></div>
</div>

<script>
// ==========================================
// 全局状态
// ==========================================
let fullData = [];      
let currentPool = [];   
let currentIndex = 0;   
let currentScore = 0;   
let userSelection = []; 

// 本地存储结构
let userStats = {
    progress: {}, 
    mistakes: {}  
};

// ==========================================
// 初始化
// ==========================================
window.onload = async function() {
    loadUserStats(); 
    
    try {
        // 优先尝试当前目录，失败则尝试上一级目录 (兼容 MkDocs 目录结构)
        let response = await fetch('questions_full.json');
        if (!response.ok) {
            response = await fetch('../questions_full.json');
        }

        if (!response.ok) throw new Error("无法读取题库文件 questions_full.json");
        
        fullData = await response.json();
        
        const chapterSelect = document.getElementById('chapter-select');
        fullData.forEach((chap, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.text = chap.chapterName;
            chapterSelect.appendChild(opt);
        });

        document.getElementById('loading-msg').style.display = 'none';
        document.getElementById('quiz-main').style.display = 'block';
        
        updateDashboard(); 
        resetAndLoad();    

    } catch (err) {
        showError(err.message);
    }
};

// ==========================================
// 逻辑控制
// ==========================================
function resetAndLoad() {
    const chapIdx = document.getElementById('chapter-select').value;
    const typeFilter = document.getElementById('type-select').value;
    const isMistakeMode = document.getElementById('mistake-mode').checked;
    
    const rawQuestions = fullData[chapIdx].questions;
    
    // 构建带Key的题目池
    let tempPool = rawQuestions.map((q, idx) => ({
        ...q,
        uniqueKey: `${chapIdx}_${idx}`, 
        originalIndex: idx
    }));

    // 筛选
    if (isMistakeMode) {
        tempPool = tempPool.filter(q => userStats.mistakes[q.uniqueKey]);
    }

    if (typeFilter !== 'all') {
        tempPool = tempPool.filter(q => q.type === typeFilter);
    }

    currentPool = tempPool;
    currentIndex = 0;
    currentScore = 0;
    document.getElementById('score-disp').innerText = "本次得分: 0";
    
    if (currentPool.length > 0) {
        renderQuestion();
    } else {
        showEmptyState(isMistakeMode);
    }
}

function showEmptyState(isMistakeMode) {
    document.getElementById('question-text').innerHTML = isMistakeMode 
        ? "🎉 本章节暂时没有错题记录。" 
        : "该筛选条件下没有题目。";
    document.getElementById('options-list').innerHTML = "";
    document.getElementById('feedback-div').style.display = 'none';
    document.getElementById('btn-submit').style.display = 'none';
    document.getElementById('btn-next').style.display = 'none';
    document.getElementById('chapter-progress').innerText = "0/0";
}

function renderQuestion() {
    const q = currentPool[currentIndex];
    
    document.getElementById('chapter-progress').innerText = `本章进度: ${currentIndex + 1} / ${currentPool.length}`;
    
    const badgeHtml = q.type === 'single' 
        ? '<span class="badge badge-single">单选</span>' 
        : '<span class="badge badge-multi">多选</span>';
    
    let extraTag = "";
    if (userStats.mistakes[q.uniqueKey]) extraTag = " <span style='color:red;font-size:0.8em;font-weight:normal'>[错题本]</span>";
    else if (userStats.progress[q.uniqueKey]) extraTag = " <span style='color:green;font-size:0.8em;font-weight:normal'>[已掌握]</span>";

    document.getElementById('question-text').innerHTML = `${badgeHtml} ${currentIndex + 1}. ${q.question} ${extraTag}`;
    
    const ul = document.getElementById('options-list');
    ul.innerHTML = '';
    ul.classList.remove('disabled-options');
    userSelection = [];
    
    q.options.forEach(opt => {
        const li = document.createElement('li');
        li.className = 'option-li';
        li.onclick = () => toggleSelect(li, opt.label, q.type);
        
        const inputType = q.type === 'single' ? 'radio' : 'checkbox';
        li.innerHTML = `
            <input type="${inputType}" name="q_opt">
            <div style="flex:1">${opt.label}. ${opt.text}</div>
        `;
        ul.appendChild(li);
    });
    
    document.getElementById('feedback-div').style.display = 'none';
    document.getElementById('btn-submit').style.display = 'inline-block';
    document.getElementById('btn-submit').disabled = true;
    document.getElementById('btn-next').style.display = 'none';

    // 触发 MathJax 渲染 (如果存在)
    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([document.querySelector('.question-card')]).catch((err) => console.log(err));
    }
}

function toggleSelect(li, label, type) {
    const input = li.querySelector('input');
    
    if (type === 'single') {
        userSelection = [label];
        const allLis = document.querySelectorAll('.option-li');
        allLis.forEach(item => {
            item.classList.remove('selected');
            item.querySelector('input').checked = false;
        });
        li.classList.add('selected');
        input.checked = true;
    } else {
        if (userSelection.includes(label)) {
            userSelection = userSelection.filter(l => l !== label);
            li.classList.remove('selected');
            input.checked = false;
        } else {
            userSelection.push(label);
            li.classList.add('selected');
            input.checked = true;
        }
    }
    document.getElementById('btn-submit').disabled = (userSelection.length === 0);
}

// ==========================================
// 提交逻辑 (核心修改区域)
// ==========================================
function submitAnswer() {
    const q = currentPool[currentIndex];
    
    const standardCorrect = q.answer.trim().replace(/\s+/g, '').split('').sort().join('');
    const standardUser = userSelection.sort().join('');
    const isCorrect = (standardCorrect === standardUser);
    
    const feedback = document.getElementById('feedback-div');
    feedback.style.display = 'block';
    
    if (isCorrect) {
        // 答对了
        userStats.progress[q.uniqueKey] = true;
        currentScore++;
        
        // 构建反馈内容
        let feedbackHtml = `<strong>✅ 回答正确！</strong>`;
        
        // 关键修改：如果该题在错题本中，显示手动移除按钮
        if (userStats.mistakes[q.uniqueKey]) {
            feedbackHtml += ` <br><span style="color:#666;font-size:0.9em">这道题仍在错题本中。</span> 
                <button class="btn-remove" onclick="manualRemoveMistake('${q.uniqueKey}')">🗑️ 我已掌握，移出错题本</button>`;
        } else {
            feedbackHtml += ` 已存入掌握进度。`;
        }

        feedback.className = 'feedback-box feedback-correct';
        feedback.innerHTML = feedbackHtml;
        
    } else {
        // 答错了
        userStats.mistakes[q.uniqueKey] = true;
        
        feedback.className = 'feedback-box feedback-wrong';
        feedback.innerHTML = `<strong>❌ 回答错误</strong><br>你的答案: ${standardUser}<br>正确答案: <strong>${q.answer}</strong><br><small>已自动加入错题本。</small>`;
    }
    
    saveUserStats();     
    updateDashboard();   
    document.getElementById('score-disp').innerText = `本次得分: ${currentScore}`;

    document.getElementById('options-list').classList.add('disabled-options');
    document.getElementById('btn-submit').style.display = 'none';
    document.getElementById('btn-next').style.display = 'inline-block';
}

// 手动移除错题
function manualRemoveMistake(key) {
    if (userStats.mistakes[key]) {
        delete userStats.mistakes[key];
        saveUserStats();
        updateDashboard();
        
        // 更新反馈区文字
        const feedback = document.getElementById('feedback-div');
        feedback.innerHTML = `<strong>✅ 回答正确！</strong><br>🎉 已成功将此题移出错题本！`;
        
        // 刷新题目列表的标记（可选，视觉优化）
        // 如果是在错题模式下，不立即刷新页面，以免题目突然消失体验不好
        // 用户点击“下一题”时，这道题自然就不在了
    }
}

function nextQuestion() {
    if (currentIndex < currentPool.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        const isMistakeMode = document.getElementById('mistake-mode').checked;
        alert("本轮练习结束！");
        resetAndLoad(); 
    }
}

// ==========================================
// 数据存储
// ==========================================
function loadUserStats() {
    const saved = localStorage.getItem('quiz_app_stats');
    if (saved) {
        try {
            userStats = JSON.parse(saved);
            if (!userStats.progress) userStats.progress = {};
            if (!userStats.mistakes) userStats.mistakes = {};
        } catch (e) { console.error("读取存档失败", e); }
    }
}

function saveUserStats() {
    localStorage.setItem('quiz_app_stats', JSON.stringify(userStats));
}

function clearAllData() {
    if(confirm("确定要清空所有的做题进度和错题记录吗？")) {
        userStats = { progress: {}, mistakes: {} };
        saveUserStats();
        updateDashboard();
        resetAndLoad();
        alert("记录已重置。");
    }
}

function updateDashboard() {
    let totalQuestions = 0;
    fullData.forEach(chap => { totalQuestions += chap.questions.length; });
    
    if (totalQuestions === 0) return;

    const masteredCount = Object.keys(userStats.progress).length;
    const mistakeCount = Object.keys(userStats.mistakes).length;
    
    const pct = Math.round((masteredCount / totalQuestions) * 100);
    document.getElementById('global-progress').innerText = `${pct}% (${masteredCount}/${totalQuestions})`;
    document.getElementById('progress-bar').style.width = `${pct}%`;
    document.getElementById('global-mistakes').innerText = mistakeCount;
}

function showError(msg) {
    document.getElementById('loading-msg').style.display = 'none';
    const errDiv = document.getElementById('error-msg');
    errDiv.style.display = 'block';
    errDiv.innerText = "错误: " + msg;
}
</script>