// 試用版數據
const categories = [
    { id: "fruits", name: "🍎 水果" },
    { id: "veggies", name: "🥦 蔬菜" },
    { id: "furniture", name: "🛋️ 家具" }
];

const vocabItems = [
    { name: "蘋果", cat: "fruits", img: "https://cdn-icons-png.flaticon.com/512/415/415682.png" },
    { name: "香蕉", cat: "fruits", img: "https://cdn-icons-png.flaticon.com/512/616/616442.png" },
    { name: "西瓜", cat: "fruits", img: "https://cdn-icons-png.flaticon.com/512/2224/2224115.png" },
    { name: "西蘭花", cat: "veggies", img: "https://cdn-icons-png.flaticon.com/512/2346/2346931.png" },
    { name: "紅蘿蔔", cat: "veggies", img: "https://cdn-icons-png.flaticon.com/512/2224/2224131.png" },
    { name: "粟米", cat: "veggies", img: "https://cdn-icons-png.flaticon.com/512/1206/1206109.png" },
    { name: "梳化", cat: "furniture", img: "https://cdn-icons-png.flaticon.com/512/2550/2550346.png" },
    { name: "床", cat: "furniture", img: "https://cdn-icons-png.flaticon.com/512/3015/3015509.png" },
    { name: "衣櫃", cat: "furniture", img: "https://cdn-icons-png.flaticon.com/512/1041/1041935.png" }
];

// 渲染圖庫
function renderBank() {
    const container = document.getElementById('bank-content');
    container.innerHTML = '';

    categories.forEach(cat => {
        const section = document.createElement('div');
        section.className = 'category-block';
        
        const title = document.createElement('div');
        title.className = 'category-title';
        title.innerText = cat.name;
        section.appendChild(title);
        
        const grid = document.createElement('div');
        grid.className = 'grid';
        
        const filtered = vocabItems.filter(item => item.cat === cat.id);
        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'vocab-card';
            card.innerHTML = `<img src="${item.img}"><p>${item.name}</p>`;
            card.onclick = () => startFlashcard(item.img);
            grid.appendChild(card);
        });
        
        section.appendChild(grid);
        container.appendChild(section);
    });
}

// 切換至遊戲畫面
function startFlashcard(imgSrc) {
    document.getElementById('bank-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    document.getElementById('current-img').src = imgSrc;
    // 重設所有翻轉卡片
    document.querySelectorAll('.flip-card').forEach(c => c.classList.remove('flipped'));
    window.scrollTo(0,0);
}

// 返回圖庫
function goBackToBank() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('bank-screen').classList.remove('hidden');
}

// 縮放滑桿
document.getElementById('zoom-slider').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--card-size', `${e.target.value}px`);
});

// 啟動
renderBank();
