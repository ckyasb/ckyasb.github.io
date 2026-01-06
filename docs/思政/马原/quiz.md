# 马原选择

<style>
/* 容器样式 */
.quiz-app {
    max-width: 800px;
    margin: 20px auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: var(--md-code-bg-color, #f8f9fa);
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

/* 控制栏 */
.quiz-controls {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #dee2e6;
    flex-wrap: wrap;
}

.control-item {
    flex: 1;
    min-width: 200px;
}

.control-item label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 0.9em;
    color: #495057;
}

.control-item select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    background-color: #fff;
    font-size: 14px;
}

/* 状态栏 */
.quiz-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 0.9em;
    color: #6c757d;
    font-weight: 500;
}

/* 题目区 */
.question-card {
    background: #fff;
    padding: 20px;
    border-radius: 6px;
    border: 1px solid #e9ecef;
}

.q-header {
    font-size: 1.1em;
    line-height: 1.6;
    margin-bottom: 20px;
    font-weight: bold;
    color: #212529;
}

.badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75em;
    color: white;
    margin-right: 8px;
    vertical-align: middle;
}
.badge-single { background-color: #007bff; }
.badge-multi { background-color: #6610f2; }

/* 选项列表 */
.options {
    list-style: none;
    padding: 0;
    margin: 0;
}

.option-li {
    margin-bottom: 12px;
    padding: 12px 16px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: flex-start;
}

.option-li:hover {
    background-color: #e9ecef;
}

.option-li.selected {
    background-color: #e7f1ff;
    border-color: #007bff;
}

.option-li input {
    margin-top: 4px;
    margin-right: 12px;
    cursor: pointer;
}

.option-text {
    flex: 1;
    line-height: 1.5;
}

/* 按钮区 */
.action-area {
    margin-top: 24px;
    display: flex;
    gap: 12px;
}

.btn {
    padding: 10px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: background-color 0.2s;
}

.btn-primary { background-color: #007bff; color: white; }
.btn-primary:hover { background-color: #0056b3; }
.btn-primary:disabled { background-color: #a0c4ff; cursor: not-allowed; }

.btn-next { background-color: #28a745; color: white; display: none; }
.btn-next:hover { background-color: #218838; }

/* 反馈区 */
.feedback-box {
    margin-top: 20px;
    padding: 16px;
    border-radius: 6px;
    display: none;
}
.feedback-correct { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
.feedback-wrong { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }

/* 禁用状态 */
.disabled-options .option-li {
    pointer-events: none;
    opacity: 0.7;
}
</style>

<div class="quiz-app">
    <div id="loading-msg">正在加载题库，请稍候...</div>
    
    <div id="quiz-main" style="display:none;">
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
        </div>

        <div class="quiz-stats">
            <span id="progress-disp">进度: 0 / 0</span>
            <span id="score-disp">当前得分: 0</span>
        </div>

        <div class="question-card">
            <div class="q-header" id="question-text"></div>
            <ul class="options" id="options-list"></ul>
            
            <div class="feedback-box" id="feedback-div"></div>

            <div class="action-area">
                <button class="btn btn-primary" id="btn-submit" onclick="submitAnswer()" disabled>提交答案</button>
                <button class="btn btn-next" id="btn-next" onclick="nextQuestion()">下一题 ➜</button>
            </div>
        </div>
    </div>
    
    <div id="error-msg" style="display:none; color:red; padding:20px; border:1px solid red;"></div>
</div>

<script>
// 全局变量
let fullData = [];
let currentPool = [];
let currentIndex = 0;
let currentScore = 0;
let userSelection = []; // 存储 ['A'] 或 ['A', 'C']

// 初始化加载
window.onload = async function() {
    try {
        // 读取 JSON 文件
        // 兼容 MkDocs 默认的 directory_urls (生成 /quiz/index.html) -> 需要 ../
        // 和非 directory_urls (生成 /quiz.html) -> 需要 ./
        let response = await fetch('../questions_full.json');
        
        if (!response.ok) {
            // 如果上一级找不到，尝试同级目录
            response = await fetch('./questions_full.json');
        }
        
        if (!response.ok) throw new Error("无法读取文件 (404)");
        
        fullData = await response.json();
        
        if (!fullData || fullData.length === 0) {
            throw new Error("JSON 文件为空或格式错误");
        }

        // 初始化章节下拉框
        const chapterSelect = document.getElementById('chapter-select');
        fullData.forEach((chap, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.text = `${chap.chapterName} (${chap.questions.length}题)`;
            chapterSelect.appendChild(opt);
        });

        document.getElementById('loading-msg').style.display = 'none';
        document.getElementById('quiz-main').style.display = 'block';
        
        // 开始第一章
        resetAndLoad();

    } catch (err) {
        document.getElementById('loading-msg').style.display = 'none';
        const errDiv = document.getElementById('error-msg');
        errDiv.style.display = 'block';
        errDiv.innerHTML = `
            <strong>加载失败</strong><br>
            原因: ${err.message}<br><br>
            提示：如果你是直接双击打开 html 文件，请使用 "mkdocs serve" 运行，因为浏览器禁止本地文件直接跨域读取。
        `;
    }
};

// 重置并加载题目池
function resetAndLoad() {
    const chapIdx = document.getElementById('chapter-select').value;
    const typeFilter = document.getElementById('type-select').value;
    
    // 获取当前章节所有题目
    const rawQuestions = fullData[chapIdx].questions;
    
    // 过滤
    if (typeFilter === 'all') {
        currentPool = rawQuestions;
    } else {
        currentPool = rawQuestions.filter(q => q.type === typeFilter);
    }
    
    // 重置状态
    currentIndex = 0;
    currentScore = 0;
    document.getElementById('score-disp').innerText = "当前得分: 0";
    
    if (currentPool.length > 0) {
        renderQuestion();
    } else {
        document.getElementById('question-text').innerText = "该章节下没有此类题目。";
        document.getElementById('options-list').innerHTML = "";
        document.getElementById('btn-submit').style.display = 'none';
        document.getElementById('btn-next').style.display = 'none';
        document.getElementById('progress-disp').innerText = "进度: 0 / 0";
    }
}

// 渲染当前题目
function renderQuestion() {
    const q = currentPool[currentIndex];
    const total = currentPool.length;
    
    // 更新进度
    document.getElementById('progress-disp').innerText = `进度: ${currentIndex + 1} / ${total}`;
    
    // 题目文本
    const badgeHtml = q.type === 'single' 
        ? '<span class="badge badge-single">单选</span>' 
        : '<span class="badge badge-multi">多选</span>';
    
    document.getElementById('question-text').innerHTML = `${badgeHtml} ${currentIndex + 1}. ${q.question}`;
    
    // 选项列表
    const ul = document.getElementById('options-list');
    ul.innerHTML = '';
    ul.classList.remove('disabled-options');
    userSelection = [];
    
    q.options.forEach(opt => {
        const li = document.createElement('li');
        li.className = 'option-li';
        li.onclick = (e) => toggleSelect(e, li, opt.label, q.type);
        
        const inputType = q.type === 'single' ? 'radio' : 'checkbox';
        li.innerHTML = `
            <input type="${inputType}" name="q_opt" value="${opt.label}">
            <span class="option-text">${opt.label}. ${opt.text}</span>
        `;
        ul.appendChild(li);
    });
    
    // 按钮状态
    document.getElementById('feedback-div').style.display = 'none';
    document.getElementById('btn-submit').style.display = 'inline-block';
    document.getElementById('btn-submit').disabled = true;
    document.getElementById('btn-next').style.display = 'none';
}

// 处理点击选项
function toggleSelect(e, li, label, type) {
    const input = li.querySelector('input');
    
    // 如果点击对象不是 input 本身（即点击了 li 背景），则手动切换 input 状态
    // 如果点击的是 input，浏览器已经处理了 checked 状态变化，无需干预
    if (e.target.tagName !== 'INPUT') {
        if (type === 'single') {
            input.checked = true;
        } else {
            input.checked = !input.checked;
        }
    }
    
    // 根据 input 的最新状态同步数据和 UI
    if (type === 'single') {
        // 单选：更新数组，并刷新所有选项样式
        userSelection = [label];
        const allLis = document.querySelectorAll('.option-li');
        allLis.forEach(item => {
            const itemInput = item.querySelector('input');
            if (itemInput.checked) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    } else {
        // 多选：根据 checked 状态添加或移除
        if (input.checked) {
            li.classList.add('selected');
            if (!userSelection.includes(label)) {
                userSelection.push(label);
            }
        } else {
            li.classList.remove('selected');
            userSelection = userSelection.filter(l => l !== label);
        }
    }
    
    // 只要有选择就允许提交
    document.getElementById('btn-submit').disabled = (userSelection.length === 0);
}

// 提交答案
function submitAnswer() {
    const q = currentPool[currentIndex];
    
    // 答案标准化：移除空格，排序
    // 例如题库里的答案可能是 "ABC" 或 "A"
    const standardCorrect = q.answer.trim().split('').sort().join('');
    const standardUser = userSelection.sort().join('');
    
    const isCorrect = (standardCorrect === standardUser);
    const feedback = document.getElementById('feedback-div');
    
    feedback.style.display = 'block';
    if (isCorrect) {
        currentScore++;
        document.getElementById('score-disp').innerText = `当前得分: ${currentScore}`;
        feedback.className = 'feedback-box feedback-correct';
        feedback.innerHTML = `<strong>✅ 回答正确！</strong>`;
    } else {
        feedback.className = 'feedback-box feedback-wrong';
        feedback.innerHTML = `<strong>❌ 回答错误</strong><br>你的答案: ${standardUser}<br>正确答案: <strong>${q.answer}</strong>`;
    }
    
    // 禁用选项
    document.getElementById('options-list').classList.add('disabled-options');
    
    // 切换按钮
    document.getElementById('btn-submit').style.display = 'none';
    document.getElementById('btn-next').style.display = 'inline-block';
}

// 下一题
function nextQuestion() {
    if (currentIndex < currentPool.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        alert(`本章节练习结束！\n共 ${currentPool.length} 题，你答对了 ${currentScore} 题。`);
    }
}
</script>