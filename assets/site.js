(()=>{
  const toggle=document.querySelector('#menu-trigger');
  const menu=document.querySelector('#mobile-menu');
  const header=document.querySelector('#site-header');
  const closeMenu=()=>{
    if(!menu||!toggle)return;
    menu.classList.remove('is-open');menu.setAttribute('aria-hidden','true');menu.inert=true;
    toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');
    document.documentElement.classList.remove('no-scroll');
  };
  const openMenu=()=>{
    menu.classList.add('is-open');menu.setAttribute('aria-hidden','false');menu.inert=false;
    toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Fechar menu');
    document.documentElement.classList.add('no-scroll');
  };
  toggle?.addEventListener('click',()=>toggle.getAttribute('aria-expanded')==='true'?closeMenu():openMenu());
  menu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  document.addEventListener('pointerdown',e=>{if(toggle?.getAttribute('aria-expanded')==='true'&&!header?.contains(e.target))closeMenu();});
  window.addEventListener('resize',()=>{if(innerWidth>=1024)closeMenu();});
  const select=document.querySelector('#lead-service');
  document.querySelectorAll('a[data-service]').forEach(link=>link.addEventListener('click',()=>{
    if(!select)return;
    const option=[...select.options].find(opt=>opt.value===link.dataset.service);
    if(option)select.value=option.value;
  }));
  document.querySelector('#lead-form')?.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.querySelector('#lead-name')?.value.trim();
    const service=select?.value;
    const period=document.querySelector('#lead-period')?.value;
    const error=document.querySelector('#lead-error');
    if(!name||!service){
      error.textContent='Informe seu nome e o atendimento desejado.';error.hidden=false;
      (!name?document.querySelector('#lead-name'):select)?.focus();return;
    }
    error.hidden=true;
    const message=`Olá! Meu nome é ${name}. Gostaria de consultar disponibilidade para ${service}${period?`, preferencialmente no período da ${period.toLowerCase()}`:''}. Podemos conversar sobre um horário?`;
    const url=`https://wa.me/5561993538285?text=${encodeURIComponent(message)}`;
    const win=window.open(url,'_blank','noopener,noreferrer');
    if(!win)window.location.assign(url);
  });
  const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
})();
