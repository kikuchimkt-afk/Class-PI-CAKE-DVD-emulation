document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('mainVideo');
    const videoSource = document.getElementById('videoSource');
    const overlay = document.getElementById('videoOverlay');
    const playBtn = document.getElementById('playBtn');
    const chapterListEl = document.getElementById('chapterList');

    // === 正確な68チャプター定義 (PDF TOC照合済み) ===
    const chapters = [
        // Unit 1 (ch1-8)
        { ch: 1, unit: 1, lesson: 1, title: "U1-1 Let's Study! \"Charlie's Family\"", type: "study" },
        { ch: 2, unit: 1, lesson: 2, title: "U1-2 Let's Study! \"At School\"", type: "study" },
        { ch: 3, unit: 1, lesson: 3, title: "U1-3 Introduction \"Plants\"", type: "intro" },
        { ch: 4, unit: 1, lesson: 4, title: "U1-4 Phonics: -an, -en, -it, -ot, -ug", type: "phonics" },
        { ch: 5, unit: 1, lesson: 5, title: "U1-5 Phonics: p, b, t, d", type: "phonics" },
        { ch: 6, unit: 1, lesson: 6, title: "U1-6 Let's Study! \"After School\"", type: "study" },
        { ch: 7, unit: 1, lesson: 7, title: "U1-7 Phonics: c, g, m, n", type: "phonics" },
        { ch: 8, unit: 1, lesson: 8, title: "U1-8 Close-Up", type: "closeup" },
        // Unit 2 (ch9-17)
        { ch: 9, unit: 2, lesson: 1, title: "U2-1 Let's Study! \"Where's My Backpack?\"", type: "study" },
        { ch: 10, unit: 2, lesson: 2, title: "U2-2 Introduction \"Seeds\"", type: "intro" },
        { ch: 11, unit: 2, lesson: 3, title: "U2-3 Phonics: f, v, s, z", type: "phonics" },
        { ch: 12, unit: 2, lesson: 4, title: "U2-4 Let's Study! \"At a Flea Market\"", type: "study" },
        { ch: 13, unit: 2, lesson: 5, title: "U2-5 Phonics: l, f, w, y", type: "phonics" },
        { ch: 14, unit: 2, lesson: 6, title: "U2-6 Let's Study! \"Cool Trading Cards\"", type: "study" },
        { ch: 15, unit: 2, lesson: 7, title: "U2-7 Phonics: j, h, k, x, c, g", type: "phonics" },
        { ch: 16, unit: 2, lesson: 8, title: "U2-8 Close-Up", type: "closeup" },
        { ch: 17, unit: 2, lesson: 9, title: "U2-9 Think Globally \"Celebrating Birthdays\"", type: "global" },
        // Unit 3 (ch18-25)
        { ch: 18, unit: 3, lesson: 1, title: "U3-1 Let's Study! \"Let's Go to the Circus!\"", type: "study" },
        { ch: 19, unit: 3, lesson: 2, title: "U3-2 Introduction \"Animal Body Parts\"", type: "intro" },
        { ch: 20, unit: 3, lesson: 3, title: "U3-3 Phonics: ch, sh", type: "phonics" },
        { ch: 21, unit: 3, lesson: 4, title: "U3-4 Let's Study! \"Picnic Time\"", type: "study" },
        { ch: 22, unit: 3, lesson: 5, title: "U3-5 Phonics: ph, wh", type: "phonics" },
        { ch: 23, unit: 3, lesson: 6, title: "U3-6 Let's Study! \"What Can You Do?\"", type: "study" },
        { ch: 24, unit: 3, lesson: 7, title: "U3-7 Phonics: th, th", type: "phonics" },
        { ch: 25, unit: 3, lesson: 8, title: "U3-8 Close-Up", type: "closeup" },
        // Unit 4 (ch26-34)
        { ch: 26, unit: 4, lesson: 1, title: "U4-1 Let's Study! \"What Do You Do After School?\"", type: "study" },
        { ch: 27, unit: 4, lesson: 2, title: "U4-2 Introduction \"Animal Communication\"", type: "intro" },
        { ch: 28, unit: 4, lesson: 3, title: "U4-3 Phonics: ck, ng", type: "phonics" },
        { ch: 29, unit: 4, lesson: 4, title: "U4-4 Let's Study! \"Amber's Favorite Comic Books\"", type: "study" },
        { ch: 30, unit: 4, lesson: 5, title: "U4-5 Phonics: a-e, i-e", type: "phonics" },
        { ch: 31, unit: 4, lesson: 6, title: "U4-6 Let's Study! \"Hobbies\"", type: "study" },
        { ch: 32, unit: 4, lesson: 7, title: "U4-7 Phonics: u-e, o-e, e-e", type: "phonics" },
        { ch: 33, unit: 4, lesson: 8, title: "U4-8 Close-Up", type: "closeup" },
        { ch: 34, unit: 4, lesson: 9, title: "U4-9 Think Globally \"Amazing Buildings\"", type: "global" },
        // Unit 5 (ch35-42)
        { ch: 35, unit: 5, lesson: 1, title: "U5-1 Let's Study! \"Let's Have a Tea Party!\"", type: "study" },
        { ch: 36, unit: 5, lesson: 2, title: "U5-2 Introduction \"Healthy Food\"", type: "intro" },
        { ch: 37, unit: 5, lesson: 3, title: "U5-3 Phonics: cl/gl/pl, br/dr/pr, sm/sn/sw", type: "phonics" },
        { ch: 38, unit: 5, lesson: 4, title: "U5-4 Let's Study! \"Charlie's Speech\"", type: "study" },
        { ch: 39, unit: 5, lesson: 5, title: "U5-5 Phonics: ai, ay, ee, ea", type: "phonics" },
        { ch: 40, unit: 5, lesson: 6, title: "U5-6 Let's Study! \"I Want a Camera\"", type: "study" },
        { ch: 41, unit: 5, lesson: 7, title: "U5-7 Phonics: oa, ow", type: "phonics" },
        { ch: 42, unit: 5, lesson: 8, title: "U5-8 Close-Up", type: "closeup" },
        // Unit 6 (ch43-51)
        { ch: 43, unit: 6, lesson: 1, title: "U6-1 Let's Study! \"New Backpacks\"", type: "study" },
        { ch: 44, unit: 6, lesson: 2, title: "U6-2 Introduction \"Healthy Living\"", type: "intro" },
        { ch: 45, unit: 6, lesson: 3, title: "U6-3 Phonics: ue, ui, ie", type: "phonics" },
        { ch: 46, unit: 6, lesson: 4, title: "U6-4 Let's Study! \"A Call from Dad\"", type: "study" },
        { ch: 47, unit: 6, lesson: 5, title: "U6-5 Phonics: au, aw, oi, oy", type: "phonics" },
        { ch: 48, unit: 6, lesson: 6, title: "U6-6 Let's Study! \"Be More Careful\"", type: "study" },
        { ch: 49, unit: 6, lesson: 7, title: "U6-7 Phonics: ou, ow, oo, oo", type: "phonics" },
        { ch: 50, unit: 6, lesson: 8, title: "U6-8 Close-Up", type: "closeup" },
        { ch: 51, unit: 6, lesson: 9, title: "U6-9 Think Globally \"Baby Teeth\"", type: "global" },
        // Unit 7 (ch52-59)
        { ch: 52, unit: 7, lesson: 1, title: "U7-1 Let's Study! \"Amber Loves Horses\"", type: "study" },
        { ch: 53, unit: 7, lesson: 2, title: "U7-2 Introduction \"Computers\"", type: "intro" },
        { ch: 54, unit: 7, lesson: 3, title: "U7-3 Phonics: or, ar", type: "phonics" },
        { ch: 55, unit: 7, lesson: 4, title: "U7-4 Let's Study! \"Homework\"", type: "study" },
        { ch: 56, unit: 7, lesson: 5, title: "U7-5 Phonics: er, ir, ur", type: "phonics" },
        { ch: 57, unit: 7, lesson: 6, title: "U7-6 Let's Study! \"Robots Are So Cool!\"", type: "study" },
        { ch: 58, unit: 7, lesson: 7, title: "U7-7 Phonics: wor, war", type: "phonics" },
        { ch: 59, unit: 7, lesson: 8, title: "U7-8 Close-Up", type: "closeup" },
        // Unit 8 (ch60-68)
        { ch: 60, unit: 8, lesson: 1, title: "U8-1 Let's Study! \"The Concert\"", type: "study" },
        { ch: 61, unit: 8, lesson: 2, title: "U8-2 Introduction \"Programming\"", type: "intro" },
        { ch: 62, unit: 8, lesson: 3, title: "U8-3 Phonics: -or, -er, air, are", type: "phonics" },
        { ch: 63, unit: 8, lesson: 4, title: "U8-4 Let's Study! \"Kate's Jigsaw Puzzle\"", type: "study" },
        { ch: 64, unit: 8, lesson: 5, title: "U8-5 Phonics: ear, eer", type: "phonics" },
        { ch: 65, unit: 8, lesson: 6, title: "U8-6 Let's Study! \"Dad's Birthday\"", type: "study" },
        { ch: 66, unit: 8, lesson: 7, title: "U8-7 Phonics: ire, our, ore", type: "phonics" },
        { ch: 67, unit: 8, lesson: 8, title: "U8-8 Close-Up", type: "closeup" },
        { ch: 68, unit: 8, lesson: 9, title: "U8-9 Think Globally \"Pets\"", type: "global" },
    ];

    // === スクリプト表示のトグル状態 ===
    let showEnglish = false;
    let showJapanese = false;

    // === サイドバー描画 ===
    let currentUnit = 0;
    chapters.forEach(chapter => {
        if (chapter.unit !== currentUnit) {
            const unitTitle = document.createElement('div');
            unitTitle.className = 'unit-title';
            unitTitle.textContent = `Unit ${chapter.unit}`;
            chapterListEl.appendChild(unitTitle);
            currentUnit = chapter.unit;
        }

        const item = document.createElement('div');
        item.className = 'chapter-item';
        // タイプに応じたアイコン追加
        const icon = { study: '📖', intro: '🌍', phonics: '🔤', closeup: '🎬', global: '🌐' }[chapter.type] || '📄';
        item.innerHTML = `<span class="ch-icon">${icon}</span> ${chapter.title}`;
        item.dataset.chapter = chapter.ch;

        item.addEventListener('click', () => {
            document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            playChapter(chapter.ch);
        });

        chapterListEl.appendChild(item);
    });

    // === 動画再生 ===
    const playChapter = (chapterNum) => {
        document.querySelector('.video-and-script').style.display = 'flex';
        const fileUrl = `videos/chapter_${chapterNum}.mp4`;
        videoSource.src = fileUrl;
        video.load();
        video.play().catch(e => console.log('Autoplay prevented:', e));
        overlay.classList.add('hidden');

        // スクリプト表示を更新
        updateScriptDisplay(chapterNum);
    };

    // === スクリプト表示更新 ===
    const updateScriptDisplay = (chapterNum) => {
        const enPanel = document.getElementById('scriptEn');
        const jaPanel = document.getElementById('scriptJa');
        if (!enPanel || !jaPanel) return;

        const data = (typeof SCRIPT_DATA !== 'undefined') ? SCRIPT_DATA[chapterNum] : null;

        if (data) {
            enPanel.innerHTML = data.en || '<p class="no-script">Script not available</p>';
            jaPanel.innerHTML = data.ja || '<p class="no-script">スクリプトなし</p>';
        } else {
            enPanel.innerHTML = '<p class="no-script">Script not yet available for this chapter.</p>';
            jaPanel.innerHTML = '<p class="no-script">このチャプターのスクリプトはまだありません。</p>';
        }
    };

    // === トグルボタン ===
    const toggleEnBtn = document.getElementById('toggleEn');
    const toggleJaBtn = document.getElementById('toggleJa');
    const scriptPanel = document.getElementById('scriptPanel');

    if (toggleEnBtn) {
        toggleEnBtn.addEventListener('click', () => {
            showEnglish = !showEnglish;
            toggleEnBtn.classList.toggle('active', showEnglish);
            document.getElementById('scriptEn').classList.toggle('visible', showEnglish);
            updatePanelVisibility();
        });
    }

    if (toggleJaBtn) {
        toggleJaBtn.addEventListener('click', () => {
            showJapanese = !showJapanese;
            toggleJaBtn.classList.toggle('active', showJapanese);
            document.getElementById('scriptJa').classList.toggle('visible', showJapanese);
            updatePanelVisibility();
        });
    }

    const updatePanelVisibility = () => {
        if (scriptPanel) {
            scriptPanel.classList.toggle('has-content', showEnglish || showJapanese);
        }
    };

    // === 再生コントロール ===
    const togglePlay = () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };

    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
    });

    overlay.addEventListener('click', togglePlay);

    video.addEventListener('play', () => {
        overlay.classList.add('hidden');
    });

    video.addEventListener('pause', () => {
        overlay.classList.remove('hidden');
    });

    // 初期状態では何も選択せず、背景のみを表示する
});
