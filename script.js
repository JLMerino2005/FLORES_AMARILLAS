// ========= CARGA + EFECTOS =========
window.onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    // Estrellas fugaces
    function createShootingStar() {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      star.style.top = Math.random() * 60 + '%';
      star.style.animationDelay = '0s';
      star.style.animationDuration = (Math.random() * 1.5 + 2) + 's';
      document.querySelector('.shooting-stars').appendChild(star);
      setTimeout(() => star.remove(), 4000);
    }
    setInterval(() => {
      if (Math.random() > 0.3) createShootingStar();
    }, Math.random() * 5000 + 3000);

    // Lluvia de pétalos
    function rainPetals(n=18){
      for(let i=0;i<n;i++){
        setTimeout(()=>{
          const el=document.createElement('div');
          el.className='fall-petal'; el.textContent='🌼';
          el.style.left=(Math.random()*100)+'vw';
          el.style.setProperty('--sx', (Math.random()*80-40)+'px');
          document.body.appendChild(el);
          setTimeout(()=>el.remove(),6000);
        }, i*180);
      }
    }
    setInterval(()=>rainPetals(8), 7000);

    clearTimeout(c);
  }, 500);
};

// ========= LOGIN / DESBLOQUEO (siempre pide nombre) =========
(function(){
  const overlay  = document.getElementById('unlockOverlay');
  const form     = document.getElementById('unlockForm');
  const nameIn   = document.getElementById('unlockName');
  const pinIn    = document.getElementById('unlockPin');
  const nameSpan = document.getElementById('name');
  const typed    = document.getElementById('typedMsg');
  const shareBtn = document.getElementById('shareBtn');

  // Prefill con ?name= en la URL, pero igual muestra el modal
  const params = new URLSearchParams(location.search);
  const queryName = params.get('name');
  if (queryName) nameIn.value = queryName;

  function unlock(){
    // Nombre obligatorio
    const userName = (nameIn.value || '').trim();
    if (!userName) {
      nameIn.placeholder = 'Escribe tu nombre 💛';
      nameIn.focus();
      return;
    }
    nameSpan.textContent = userName;

    // PIN (opcional) si configuraste data-code en el overlay
    const requiredPin = (overlay.dataset.code || '').trim();
    const userPin     = (pinIn.value || '').trim();
    if (requiredPin && requiredPin !== userPin) {
      pinIn.value = '';
      pinIn.placeholder = 'PIN incorrecto 😅';
      pinIn.focus();
      return;
    }

    // Éxito
    document.body.classList.remove('locked');
    document.body.classList.add('unlocked');
    overlay.classList.add('hide');
    setTimeout(()=>overlay.remove(), 400);

    // Lluvia extra y mensaje
    burstPetals();
    typeMessage();
  }

  // Mensaje tipeado bajo la dedicatoria
  function typeMessage(){
    const who = (nameSpan.textContent || '').trim();
    const text = (who ? `${who}, ` : '') + "te quiero mucho 🌻✨";
    typed.textContent = '';
    let i = 0;
    const iv = setInterval(()=>{
      typed.textContent += text[i++] || '';
      if(i >= text.length) clearInterval(iv);
    }, 70);
  }

  // Pequeño burst de pétalos al desbloquear
  function burstPetals(){
    for(let i=0;i<18;i++){
      setTimeout(()=>{
        const el=document.createElement('div');
        el.className='fall-petal'; el.textContent='🌼';
        el.style.left=(Math.random()*100)+'vw';
        el.style.setProperty('--sx', (Math.random()*120-60)+'px');
        document.body.appendChild(el);
        setTimeout(()=>el.remove(),6000);
      }, i*80);
    }
  }

  // Submit del formulario
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    unlock();
  });

  // Compartir
  shareBtn.addEventListener('click', async ()=>{
    const url = location.href.split('#')[0];
    const title = 'Te comparto una sorpresa 🌻';
    const text  = 'Abre este jardín de girasoles con estrellas 🌠';
    try{
      if (navigator.share) {
        await navigator.share({title, text, url});
      } else {
        await navigator.clipboard.writeText(url);
        shareBtn.textContent = '¡Enlace copiado!';
        setTimeout(()=>shareBtn.textContent='Compartir esta sorpresa', 1600);
      }
    }catch(_e){}
  });

})();
