 const GAMES = [
  { id:1, title:"Sea of Thieves", genre:"Adventure", platform:"PC / Xbox", price:39.99, oldPrice:null, badge:"hot", image:"images/sea-of-thieves-4.jpg", stars:5 },
  { id:2, title:"Elden Ring", genre:"RPG", platform:"PC / PS5 / Xbox", price:49.99, oldPrice:59.99, badge:"sale", image:"images/elden-ring.jpg", stars:5 },
  { id:3, title:"The Legend of Zelda: TotK", genre:"Adventure", platform:"PC (Emu)", price:44.99, oldPrice:null, badge:"new", image:"images/zelda-totk.jpg", stars:5 },
  { id:4, title:"Civilization VII", genre:"Strategy", platform:"PC", price:54.99, oldPrice:69.99, badge:"sale", image:"images/civ-7.jpg", stars:4 },
  { id:5, title:"Baldur's Gate 3", genre:"RPG", platform:"PC / PS5", price:59.99, oldPrice:null, badge:null, image:"images/baldures-gate-3.jpg", stars:5 },
  { id:6, title:"Subnautica 2", genre:"Adventure", platform:"PC", price:34.99, oldPrice:null, badge:"new", image:"images/subnautica-2.jpg", stars:4 },
  { id:7, title:"Resident Evil 9", genre:"Horror", platform:"PC / PS5 / Xbox", price:49.99, oldPrice:59.99, badge:"sale", image:"images/resident-evil-9.jpg", stars:4 },
  { id:8, title:"Star Wars Outlaws", genre:"Action", platform:"PC / PS5 / Xbox", price:44.99, oldPrice:null, badge:null, image:"images/star-wars-outlaws.jpg", stars:4 },
];

  let cart = [];
  let activeGenre = "All";

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

  // ── Render games ──
  function renderGames(list) {
    const grid = document.getElementById('games-grid');
    if (list.length === 0) {
      grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;font-style:italic;color:var(--parchment-dark);opacity:0.5;padding:3rem 0;">No treasure found on these waters...</p>`;
      return;
    }
    grid.innerHTML = list.map(g => {
      const inCart = cart.some(c => c.id === g.id);
      const stars = '★'.repeat(g.stars) + '☆'.repeat(5 - g.stars);
      const badge = g.badge ? `<span class="game-badge badge-${g.badge}">${g.badge === 'new' ? 'New' : g.badge === 'sale' ? 'Sale' : 'Hot'}</span>` : '';
      const oldPrice = g.oldPrice ? `<span class="price-old">$${g.oldPrice.toFixed(2)}</span>` : '';
      return `
        <div class="game-card" data-id="${g.id}">
          <div class="game-art" style="position:relative;">
            <img src="${g.image}" alt="${g.title}" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;background:#0d1a2e;" onerror="this.outerHTML='<div style=\\'width:100%;aspect-ratio:16/9;background:#0d1a2e;display:flex;align-items:center;justify-content:center;font-family:Cinzel,serif;font-size:0.85rem;color:rgba(212,160,23,0.5);padding:1rem;text-align:center\\'>${g.title}</div>'" />
            ${badge}
          </div>
          <div class="game-card-body">
            <div class="game-platform">${g.platform}</div>
            <div class="game-stars">${stars}</div>
            <div class="game-title">${g.title}</div>
            <div class="game-genre">${g.genre}</div>
            <div class="game-footer">
              <div class="game-price">
                <span class="price-current">$${g.price.toFixed(2)}</span>
                ${oldPrice}
              </div>
              <button class="btn-add ${inCart ? 'added' : ''}" onclick="addToCart(${g.id})">
                ${inCart ? '✓ Added' : '+ Add'}
              </button>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  function filterGames() {
    const q = document.getElementById('search-input').value.toLowerCase();
    let list = GAMES;
    if (activeGenre !== 'All') list = list.filter(g => g.genre === activeGenre);
    if (q) list = list.filter(g => g.title.toLowerCase().includes(q) || g.genre.toLowerCase().includes(q));
    renderGames(list);
  }

  function setGenre(genre, btn) {
    activeGenre = genre;
    document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterGames();
  }

  // ── Cart ──
  function addToCart(id) {
    const game = GAMES.find(g => g.id === id);
    if (!game) return;
    if (cart.some(c => c.id === id)) {
      showToast('Already in thy chest, sailor!');
      return;
    }
    cart.push(game);
    updateCartCount();
    filterGames();
    showToast(`⚓ "${game.title}" claimed!`);
  }

  function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    updateCartCount();
    renderCart();
    filterGames();
  }

  function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
  }

  function renderCart() {
    const wrap = document.getElementById('cart-items');
    const footer = document.getElementById('cart-footer');
    if (cart.length === 0) {
      wrap.innerHTML = `<div class="cart-empty">Thy chest is empty, landlubber.<br>Go claim some loot!</div>`;
      footer.style.display = 'none';
      return;
    }
    footer.style.display = 'block';
    const total = cart.reduce((s, g) => s + g.price, 0);
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    wrap.innerHTML = cart.map(g => `
      <div class="cart-item">
        <img src="${g.image}" alt="${g.title}" style="width:56px;height:56px;object-fit:cover;border-radius:4px;flex-shrink:0;background:#0d1a2e;" />
        <div class="cart-item-info">
          <div class="cart-item-title">${g.title}</div>
          <div class="cart-item-price">$${g.price.toFixed(2)}</div>
        </div>
        <button class="btn-remove" onclick="removeFromCart(${g.id})" title="Remove">✕</button>
      </div>`).join('');
  }

  function openCart() {
    renderCart();
    document.getElementById('cart-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    document.getElementById('cart-modal').classList.remove('open');
    document.body.style.overflow = '';
  }
  function closeCartOutside(e) {
    if (e.target === document.getElementById('cart-modal')) closeCart();
  }

  function checkout() {
    if (cart.length === 0) return;
    const total = cart.reduce((s, g) => s + g.price, 0);
    alert(`⚓ Ahoy! Thy order of ${cart.length} game(s) totaling $${total.toFixed(2)} is being processed!\n\nKeys shall arrive in thy email, brave adventurer.`);
    cart = [];
    updateCartCount();
    renderCart();
    filterGames();
    closeCart();
  }

  // ── Toast ──
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2400);
  }
