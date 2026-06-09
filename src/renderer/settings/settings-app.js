(() => {
  const { IpcClient, ThemeManager } = window;
  const ipc = new IpcClient();
  const themeManager = new ThemeManager();
  themeManager.init(ipc);

  ipc.onSettingsChanged((settings) => {
    if (settings.theme) themeManager.setTheme(settings.theme);
  });

  // Tab switching
  const tabs = document.querySelectorAll('.settings-tab');
  const pages = document.querySelectorAll('.settings-page');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      pages.forEach((p) => p.classList.remove('active'));
      const page = document.querySelector(`[data-page="${target}"]`);
      if (page) page.classList.add('active');
    });
  });

  // Theme cards
  const themeCards = document.querySelectorAll('.theme-card');
  let selectedTheme = 'starry';

  themeCards.forEach((card) => {
    card.addEventListener('click', () => {
      themeCards.forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedTheme = card.dataset.theme;
    });
  });

  // Range slider value display
  const typewriterSpeed = document.getElementById('typewriterSpeed');
  const typewriterSpeedVal = document.getElementById('typewriterSpeedVal');
  if (typewriterSpeed && typewriterSpeedVal) {
    typewriterSpeed.addEventListener('input', () => {
      typewriterSpeedVal.textContent = typewriterSpeed.value + 'ms';
    });
  }

  // Load current settings
  async function loadSettings() {
    const res = await ipc.getSettings();
    if (!res.ok) return;

    const s = res.data;

    // API
    const keyRes = await ipc.getApiKey();
    if (keyRes.ok && keyRes.data?.apiKey) {
      document.getElementById('apiKey').value = keyRes.data.apiKey;
    }

    // Appearance
    selectedTheme = s.theme || 'starry';
    themeCards.forEach((c) => {
      c.classList.toggle('selected', c.dataset.theme === selectedTheme);
    });

    // Interaction
    document.getElementById('subtitleEnabled').checked = s.subtitleEnabled !== false;
    document.getElementById('typewriterSpeed').value = s.typewriterSpeed || 35;
    if (typewriterSpeedVal) {
      typewriterSpeedVal.textContent = (s.typewriterSpeed || 35) + 'ms';
    }
    document.getElementById('clickThrough').checked = s.clickThrough !== false;
    document.getElementById('alwaysOnTop').checked = s.alwaysOnTop !== false;

    // Pomodoro
    document.getElementById('pomodoroWorkDuration').value = s.pomodoroWorkDuration || 25;
    document.getElementById('pomodoroShortBreak').value = s.pomodoroShortBreak || 5;
    document.getElementById('pomodoroLongBreak').value = s.pomodoroLongBreak || 15;
    document.getElementById('pomodoroLongBreakInterval').value = s.pomodoroLongBreakInterval || 4;
  }

  // Toast
  function showToast(msg) {
    let toast = document.getElementById('saveToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'saveToast';
      toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--color-accent);color:#fff;padding:10px 24px;border-radius:20px;font-size:14px;z-index:999;opacity:0;transition:opacity 0.3s;pointer-events:none;white-space:nowrap;';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, 2000);
  }

  // Save
  document.getElementById('saveBtn').addEventListener('click', async () => {
    const partial = {
      theme: selectedTheme,
      subtitleEnabled: document.getElementById('subtitleEnabled').checked,
      typewriterSpeed: parseInt(typewriterSpeed.value, 10),
      clickThrough: document.getElementById('clickThrough').checked,
      alwaysOnTop: document.getElementById('alwaysOnTop').checked,
      pomodoroWorkDuration: parseInt(document.getElementById('pomodoroWorkDuration').value, 10),
      pomodoroShortBreak: parseInt(document.getElementById('pomodoroShortBreak').value, 10),
      pomodoroLongBreak: parseInt(document.getElementById('pomodoroLongBreak').value, 10),
      pomodoroLongBreakInterval: parseInt(document.getElementById('pomodoroLongBreakInterval').value, 10),
    };

    const apiKey = document.getElementById('apiKey').value.trim();
    if (apiKey) await ipc.setApiKey(apiKey);

    await ipc.updateSettings(partial);
    showToast('已保存');
  });

  // Cancel
  document.getElementById('cancelBtn').addEventListener('click', () => {
    window.close();
  });

  // Reset to defaults
  document.getElementById('resetBtn').addEventListener('click', async () => {
    const defaults = {
      theme: 'starry',
      subtitleEnabled: true,
      typewriterSpeed: 35,
      clickThrough: true,
      alwaysOnTop: true,
      mute: false,
      pomodoroWorkDuration: 25,
      pomodoroShortBreak: 5,
      pomodoroLongBreak: 15,
      pomodoroLongBreakInterval: 4,
    };
    await ipc.updateSettings(defaults);
    loadSettings();
  });

  // Test connection
  document.getElementById('testConnectionBtn').addEventListener('click', async () => {
    const resultEl = document.getElementById('testResult');
    resultEl.textContent = '正在测试...';
    resultEl.className = 'test-result';

    const apiKey = document.getElementById('apiKey').value.trim();
    if (!apiKey) {
      resultEl.textContent = '请先输入 API Key';
      resultEl.className = 'test-result fail';
      return;
    }

    try {
      const baseUrl = document.getElementById('apiBaseUrl').value.trim();
      const model = document.getElementById('apiModel').value.trim();
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey,
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: 'hi' }],
          max_tokens: 5,
        }),
      });
      if (res.ok) {
        resultEl.textContent = '连接成功!';
        resultEl.className = 'test-result success';
      } else {
        var errData = {};
        try { errData = await res.json(); } catch (e) { /* ignore */ }
        resultEl.textContent = '连接失败: ' + ((errData.error && errData.error.message) || res.statusText);
        resultEl.className = 'test-result fail';
      }
    } catch (e) {
      resultEl.textContent = '连接失败: ' + e.message;
      resultEl.className = 'test-result fail';
    }
  });

  loadSettings();
})();
