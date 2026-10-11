
   // ── Particles ──
  (function() {
    const wrap = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 2.5 + 0.5;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        animation-duration:${Math.random()*12+8}s;
        animation-delay:${Math.random()*10}s;
        opacity:0;
      `;
      wrap.appendChild(p);
    }
  })();
  
  const DEALS = [
    { title:"Cyberpunk 2077", genre:"RPG", platform:"PC / PS5 / Xbox", price:34.99, oldPrice:59.99, discount:"-42%",
      img:"images/cyberpunk-2077.jpg" },
    { title:"Resident Evil 9", genre:"Horror", platform:"PC / PS5 / Xbox", price:39.99, oldPrice:59.99, discount:"-33%",
      img:"images/resident-evil-9.jpg" },
    { title:"Civilization VII", genre:"Strategy", platform:"PC", price:29.99, oldPrice:59.99, discount:"-50%",
      img:"images/civ-7.jpg" },
    { title:"Sea of Thieves", genre:"Adventure", platform:"PC / Xbox", price:24.99, oldPrice:39.99, discount:"-38%",
      img:"images/sea-of-thieves-4.jpg" },
  ];

  // ── Top rated data ──
  const TOP_RATED = [
    { rank:1, title:"Baldur's Gate 3", genre:"RPG", platform:"PC / PS5", price:59.99, stars:5,
      img:"images/baldures-gate-3.jpg" },
    { rank:2, title:"Elden Ring", genre:"RPG", platform:"PC / PS5 / Xbox", price:49.99, stars:5,
      img:"images/elden-ring.jpg" },
    { rank:3, title:"Star Wars Outlaws", genre:"Action", platform:"PC / PS5", price:44.99, stars:4,
      img:"images/star-wars-outlaws.jpg" },
    { rank:4, title:"The Legend of Zelda: TotK", genre:"Adventure", platform:"Nintendo Switch", price:44.99, stars:5,
      img:"images/zelda-totk.jpg" },
    { rank:5, title:"Resident Evil 9", genre:"Horror", platform:"PC / PS5 / Xbox", price:39.99, stars:4,
      img:"images/resident-evil-9.jpg" },
  ];

  // ── Render deals ──
  document.getElementById('deals-grid').innerHTML = DEALS.map(g => `
    <div class="deal-card">
      <img class="deal-img" src="${g.img}" alt="${g.title}" onerror="this.outerHTML='<div class=\\'deal-img\\' style=\\'display:flex;align-items:center;justify-content:center;background:#0d1a2e;font-family:Cinzel,serif;font-size:0.8rem;color:rgba(212,160,23,0.5);text-align:center;padding:0.5rem\\'>${g.title}</div>'" />
      <div class="deal-body">
        <div class="deal-platform">${g.platform}</div>
        <div class="deal-title">${g.title}</div>
        <div class="deal-genre">${g.genre}</div>
        <div class="deal-footer">
          <div class="deal-prices">
            <span class="deal-discount">${g.discount}</span>
            <div class="deal-price-row">
              <span class="price-now">$${g.price.toFixed(2)}</span>
              <span class="price-was">$${g.oldPrice.toFixed(2)}</span>
            </div>
          </div>
          <button class="btn-deal" onclick="showToast('⚓ \\'${g.title}\\' claimed!')">+ Add</button>
        </div>
      </div>
    </div>`).join('');

  // ── Render top rated ──
  document.getElementById('toprated-list').innerHTML = TOP_RATED.map(g => `
    <div class="toprated-item">
      <div class="toprated-rank">${g.rank}</div>
      <img class="toprated-img" src="${g.img}" alt="${g.title}" onerror="this.outerHTML='<div class=\\'toprated-img\\' style=\\'display:flex;align-items:center;justify-content:center;background:#0d1a2e;font-family:Cinzel,serif;font-size:0.65rem;color:rgba(212,160,23,0.5);text-align:center;padding:0.3rem\\'>${g.title}</div>'" />
      <div class="toprated-info">
        <div class="toprated-title">${g.title}</div>
        <div class="toprated-genre">${g.genre} · ${g.platform}</div>
        <div class="toprated-stars">${'★'.repeat(g.stars)}${'☆'.repeat(5-g.stars)}</div>
      </div>
      <div class="toprated-price">$${g.price.toFixed(2)}</div>
      <button class="btn-deal" onclick="showToast('⚓ \\'${g.title}\\' claimed!')">+ Add</button>
    </div>`).join('');

  // ── Countdown ──
  let totalSecs = 8 * 3600 + 42 * 60 + 17;
  function tick() {
    if (totalSecs <= 0) return;
    totalSecs--;
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    document.getElementById('cd-h').textContent = String(h).padStart(2,'0');
    document.getElementById('cd-m').textContent = String(m).padStart(2,'0');
    document.getElementById('cd-s').textContent = String(s).padStart(2,'0');
  }
  setInterval(tick, 1000);

  // ── Toast ──
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2400);
  }
