(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav: solid once scrolled, burger menu on small screens
  var nav = document.getElementById('nav');
  function onScroll(){ if(nav) nav.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  var burger = document.getElementById('burger'), links = document.getElementById('navLinks');
  if(burger && links){
    burger.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.addEventListener('click', function(e){
      if(e.target.tagName === 'A'){ links.classList.remove('open'); burger.setAttribute('aria-expanded','false'); burger.setAttribute('aria-label','Open menu'); }
    });
  }

  // Hero: crossfade every 6s (static first photo under reduced motion)
  var slides = document.querySelectorAll('#slides img'), dots = document.querySelectorAll('#dots span'), i = 0;
  if(slides.length > 1 && !reduce){
    setInterval(function(){
      slides[i].classList.remove('active'); if(dots[i]) dots[i].classList.remove('on');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
      if(dots[i]){ dots[i].classList.remove('on'); void dots[i].offsetWidth; dots[i].classList.add('on'); }
    }, 6000);
  }

  // Reveal on scroll
  var els = document.querySelectorAll('.reveal, .wipe');
  if('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {rootMargin:'0px 0px -8% 0px', threshold:.08});
    els.forEach(function(el){ io.observe(el); });
  } else { els.forEach(function(el){ el.classList.add('in'); }); }

  // Email: built here from parts so the address never sits in the HTML
  document.querySelectorAll('a[data-gmail]').forEach(function(a){
    var to = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) + '&su=' + (a.getAttribute('data-su') || '') + '&body=' + (a.getAttribute('data-body') || '');
    a.target = '_blank'; a.rel = 'noopener';
  });
  document.querySelectorAll('[data-email]').forEach(function(s){
    s.textContent = s.getAttribute('data-user') + '@' + s.getAttribute('data-domain');
  });

  var yr = document.getElementById('yr'); if(yr) yr.textContent = new Date().getFullYear();
})();
