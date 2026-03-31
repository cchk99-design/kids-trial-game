const categories = [
    { id: "fruits", name: "🍎 水果" },
    { id: "veggies", name: "🥦 蔬菜" },
    { id: "furniture", name: "🛋️ 家具" }
];

const vocabItems = [
    { id: 1, name: "蘋果", cat: "fruits", img: "https://cdn-icons-png.flaticon.com/512/415/415682.png" },
    { id: 2, name: "香蕉", cat: "fruits", img: "https://cdn-icons-png.flaticon.com/512/616/616442.png" },
    { id: 3, name: "西瓜", cat: "fruits", img: "https://cdn-icons-png.flaticon.com/512/2224/2224115.png" },
    { id: 4, name: "西蘭花", cat: "veggies", img: "https://cdn-icons-png.flaticon.com/512/2346/2346931.png" },
    { id: 5, name: "紅蘿蔔", cat: "veggies", img: "https://cdn-icons-png.flaticon.com/512/2224/2224131.png" },
    { id: 6, name: "梳化", cat: "furniture", img: "https://cdn-icons-png.flaticon.com/512/2550/2550346.png" },
    { id: 7, name: "雪櫃", cat: "furniture", img: "https://cdn-icons-png.flaticon.com/512/2153/2153835.png" }
];

let selectedIds = new Set();
let gameQueue = [];
let currentIdx = 0;

function renderBank() {
    const container = document.getElementById('bank-content');
    container.innerHTML = '';
    categories.forEach(cat => {
        const section = document.createElement('div');
        section.className = 'category-block';
        section.innerHTML = `<div class="category-header" style="background:#FF9800; color:white; padding:10px 20px; border-radius:15px; display:inline-block; margin-bottom:15px; font-weight:bold;">${cat.name}</div>`;
        
        const grid = document.createElement('div');
        grid.className = 'grid';
        
        vocabItems.filter(i => i.cat === cat.id).forEach(item => {
            const card = document.createElement('div');
            card.className = `vocab-card ${selectedIds.has(item.id) ? 'selected' : ''}`;
            card.innerHTML = `<img src="${item.img}"><p>${item.name}</p>`;
            card.onclick = () => toggleSelect(item.id, card);
            grid.appendChild(card);
        });
        section.appendChild(grid);
        container.appendChild(section);
    });
}

function toggleSelect(id, element) {
    if (selectedIds.has(id)) {
        selectedIds.delete(id);
        element.classList.remove('selected');
    } else {
        selectedIds.add(id);
        element.classList.add('selected');
    }
    updateSelectionUI();
}

function updateSelectionUI() {
    const count = selectedIds.size;
    document.getElementById('selected-count').innerText = count;
    const btn = document.getElementById('start-btn');
    if (count > 0) {
        btn.classList.remove('disabled');
        btn.disabled = false;
    } else {
        btn.classList.add('disabled');
        btn.disabled = true;
    }
}

function startSelectedGame() {
    gameQueue = vocabItems.filter(item => selectedIds.has(item.id));
    currentIdx = 0;
    document.getElementById('bank-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    loadPhoto();
}

function loadPhoto() {
    const item = gameQueue[currentIdx];
    document.getElementById('current-img').src = item.img;
    document.getElementById('game-progress').innerText = `${currentIdx + 1} / ${gameQueue.length}`;
    document.querySelectorAll('.flip-card').forEach(c => c.classList.remove('flipped'));
    
    const nextBtn = document.getElementById('next-btn');
    nextBtn.innerText = (currentIdx === gameQueue.length - 1) ? "原成挑戰 ✨" : "下一個 ➡️";
}

function nextPhoto() {
    if (currentIdx < gameQueue.length - 1) {
        currentIdx++;
        loadPhoto();
    } else {
        exitGame();
    }
}

function exitGame() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('bank-screen').classList.remove('hidden');
}

function toggleFlip(el) { el.classList.toggle('flipped'); }

document.getElementById('zoom-slider').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--card-size', `${e.target.value}px`);
});

renderBank();
