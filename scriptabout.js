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
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('[data-animate]').forEach(function(el){
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('[data-animate]').forEach(function(el){
      el.classList.add('is-visible');
    });
  }