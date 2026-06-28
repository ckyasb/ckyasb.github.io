window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"], ["$$", "$$"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|"
  },
  startup: {
    ready: function() {
      // 修复被 Markdown 拆散的 $$...$$ 块
      // 情况：<p>$$</p><p>FORMULA</p><p>$$</p> → <p>$$\nFORMULA\n$$</p>
      var paras = document.querySelectorAll('p');
      for (var i = 0; i < paras.length - 2; i++) {
        if (paras[i].textContent.trim() === '$$' && 
            paras[i+2].textContent.trim() === '$$') {
          // 合并三个 <p> 为一个
          var merged = document.createElement('p');
          merged.textContent = '$$\n' + paras[i+1].textContent + '\n$$';
          paras[i].parentNode.insertBefore(merged, paras[i]);
          paras[i].remove();
          paras[i+1].remove();
          paras[i+2].remove();
          i--; // 调整索引
        }
      }
      MathJax.startup.defaultReady();
    }
  }
};
