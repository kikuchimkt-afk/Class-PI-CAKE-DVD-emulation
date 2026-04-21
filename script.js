document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('mainVideo');
    const videoSource = document.getElementById('videoSource');
    const overlay = document.getElementById('videoOverlay');
    const playBtn = document.getElementById('playBtn');
    const chapterListEl = document.getElementById('chapterList');

    const lessonNames = [
        "Let's Study! (1)",
        "Let's Study! (2)",
        "Phonics (1)",
        "Phonics (2)",
        "Close-Up",
        "Introduction",
        "Think Globally (1)",
        "Think Globally (2)"
    ];

    // Assuming first 5 chapters are intro/extras and real units start from chapter 6
    // We will adjust this offset if needed. Let's start with 0 offset for now and load chapter_1 -> Unit 1 Lesson 1.
    // If the offset is different, we can simply change this constant.
    const CHAPTER_OFFSET = 0; 
    
    // Generate chapter structure
    const chapters = [];
    for (let unit = 1; unit <= 8; unit++) {
        for (let lesson = 0; lesson < 8; lesson++) {
            chapters.push({
                unit: unit,
                title: lessonNames[lesson],
                chapterNumber: CHAPTER_OFFSET + (unit - 1) * 8 + lesson + 1
            });
        }
    }

    // Render Sidebar
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
        item.textContent = chapter.title;
        item.dataset.chapter = chapter.chapterNumber;
        
        item.addEventListener('click', () => {
            document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            playChapter(chapter.chapterNumber);
        });

        chapterListEl.appendChild(item);
    });

    const playChapter = (chapterNum) => {
        // Assume MP4 files are named chapter_1.mp4, etc.
        const fileUrl = `videos/chapter_${chapterNum}.mp4`;
        videoSource.src = fileUrl;
        video.load();
        video.play().catch(e => console.log('Autoplay prevented:', e));
        overlay.classList.add('hidden');
    };

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

    // Select first chapter by default
    if (chapterListEl.querySelector('.chapter-item')) {
        chapterListEl.querySelector('.chapter-item').click();
        // Pause immediately so it doesn't auto-play on initial load if user doesn't want to
        video.pause();
        overlay.classList.remove('hidden');
    }
});
