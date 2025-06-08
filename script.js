const fighters = [
    {
        name: "朝倉未来",
        weight: "フェザー級",
        record: "16勝3敗",
        image: "選手画像/朝倉未来.jpeg"
    },
    {
        name: "秋元強真",
        weight: "フライ級", 
        record: "12勝2敗",
        image: "選手画像/秋元強真.jpeg"
    },
    {
        name: "平本蓮",
        weight: "バンタム級",
        record: "8勝1敗",
        image: "選手画像/平本蓮.jpeg"
    },
    {
        name: "ヒロヤ",
        weight: "フライ級",
        record: "18勝10敗",
        image: "選手画像/ヒロヤ.jpeg"
    },
    {
        name: "シェイドラエフ",
        weight: "ライト級",
        record: "6勝0敗",
        image: "選手画像/シェイドラエフ.jpeg"
    },
    {
        name: "ちいかわ（シェイドラエフ）",
        weight: "ライト級",
        record: "6勝0敗",
        image: "選手画像/ちいかわ.jpeg"
    }
];

let currentFighterIndex = 0;
let matches = [];

const fighterCard = document.getElementById('fighter-card');
const fighterImage = document.getElementById('fighter-image');
const fighterName = document.getElementById('fighter-name');
const fighterWeight = document.getElementById('fighter-weight');
const fighterRecord = document.getElementById('fighter-record');
const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');
const matchNotification = document.getElementById('match-notification');
const continueBtn = document.getElementById('continue-btn');

function displayFighter(index) {
    if (index >= fighters.length) {
        showEndMessage();
        return;
    }
    
    const fighter = fighters[index];
    fighterImage.src = fighter.image;
    fighterName.textContent = fighter.name;
    fighterWeight.textContent = fighter.weight;
    fighterRecord.textContent = `戦績: ${fighter.record}`;
    
    fighterCard.style.transform = 'scale(1)';
    fighterCard.style.opacity = '1';
    fighterCard.classList.remove('swipe-left', 'swipe-right');
}

function showEndMessage() {
    fighterCard.innerHTML = `
        <div style="padding: 60px 20px; text-align: center;">
            <h2>お疲れ様でした！</h2>
            <p style="margin-top: 20px; color: #666;">すべてのファイターを確認しました</p>
            <p style="margin-top: 10px; color: #42dca3; font-weight: bold;">${matches.length}人のファイターとマッチしました！</p>
            <button onclick="resetApp()" style="margin-top: 20px; padding: 12px 30px; background: #667eea; color: white; border: none; border-radius: 25px; cursor: pointer;">最初から始める</button>
        </div>
    `;
}

function resetApp() {
    currentFighterIndex = 0;
    matches = [];
    displayFighter(currentFighterIndex);
}

function swipeLeft() {
    fighterCard.classList.add('swipe-left');
    setTimeout(() => {
        currentFighterIndex++;
        displayFighter(currentFighterIndex);
    }, 300);
}

function swipeRight() {
    fighterCard.classList.add('swipe-right');
    matches.push(fighters[currentFighterIndex]);
    
    setTimeout(() => {
        if (Math.random() > 0.7) {
            showMatch();
        } else {
            currentFighterIndex++;
            displayFighter(currentFighterIndex);
        }
    }, 300);
}

function showMatch() {
    matchNotification.style.display = 'flex';
}

function hideMatch() {
    matchNotification.style.display = 'none';
    currentFighterIndex++;
    displayFighter(currentFighterIndex);
}

let startX = 0;
let currentX = 0;
let isDragging = false;

fighterCard.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    fighterCard.style.cursor = 'grabbing';
});

fighterCard.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    currentX = e.clientX - startX;
    const rotation = currentX * 0.1;
    
    fighterCard.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
    fighterCard.style.opacity = Math.max(0.5, 1 - Math.abs(currentX) / 300);
});

fighterCard.addEventListener('mouseup', () => {
    if (!isDragging) return;
    
    isDragging = false;
    fighterCard.style.cursor = 'grab';
    
    if (Math.abs(currentX) > 100) {
        if (currentX > 0) {
            swipeRight();
        } else {
            swipeLeft();
        }
    } else {
        fighterCard.style.transform = 'translateX(0) rotate(0deg)';
        fighterCard.style.opacity = '1';
    }
    
    currentX = 0;
});

fighterCard.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
});

fighterCard.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    currentX = e.touches[0].clientX - startX;
    const rotation = currentX * 0.1;
    
    fighterCard.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
    fighterCard.style.opacity = Math.max(0.5, 1 - Math.abs(currentX) / 300);
});

fighterCard.addEventListener('touchend', () => {
    if (!isDragging) return;
    
    isDragging = false;
    
    if (Math.abs(currentX) > 100) {
        if (currentX > 0) {
            swipeRight();
        } else {
            swipeLeft();
        }
    } else {
        fighterCard.style.transform = 'translateX(0) rotate(0deg)';
        fighterCard.style.opacity = '1';
    }
    
    currentX = 0;
});

likeBtn.addEventListener('click', swipeRight);
dislikeBtn.addEventListener('click', swipeLeft);
continueBtn.addEventListener('click', hideMatch);

displayFighter(currentFighterIndex);