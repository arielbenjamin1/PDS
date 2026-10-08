(() => {
'use strict';
// Consistent vector icons for iPhone/iPad Safari (avoids emoji-font substitutions).
// Keep the original links, actions and visible arrow positions unchanged.
const pdsArrowPaths = {
  '↗': 'M5 19 19 5 M8 5h11v11',
  '→': 'M4 12h16 M13 5l7 7-7 7',
  '↑': 'M12 20V4 M5 11l7-7 7 7',
  '❯': 'M8 3l9 9-9 9'
};
function pdsArrowIcon(character) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 24 24');
  svg.setAttribute('width','1em');
  svg.setAttribute('height','1em');
  svg.setAttribute('fill','none');
  svg.setAttribute('stroke','currentColor');
  svg.setAttribute('stroke-width','2');
  svg.setAttribute('stroke-linecap','square');
  svg.setAttribute('stroke-linejoin','miter');
  svg.setAttribute('aria-hidden','true');
  svg.setAttribute('focusable','false');
  svg.classList.add('pds-vector-arrow');
  svg.style.display='inline-block';
  svg.style.verticalAlign='-0.12em';
  svg.style.flexShrink='0';
  const path=document.createElementNS(ns,'path');
  path.setAttribute('d',pdsArrowPaths[character]);
  svg.append(path);
  return svg;
}
function pdsReplaceArrowGlyphs(root) {
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const targets=[];
  let node;
  while((node=walker.nextNode())) {
    if (!/[↗→↑❯]/u.test(node.nodeValue)) continue;
    const parent=node.parentElement;
    if (!parent || parent.closest('script,style,textarea,svg')) continue;
    targets.push(node);
  }
  for(const textNode of targets) {
    const frag=document.createDocumentFragment();
    for(const piece of textNode.nodeValue.split(/([↗→↑❯])/u)) {
      if(!piece) continue;
      if(pdsArrowPaths[piece]) frag.append(pdsArrowIcon(piece));
      else frag.append(document.createTextNode(piece));
    }
    textNode.replaceWith(frag);
  }
}
pdsReplaceArrowGlyphs(document.body);

const registration = 'https://app.thestudiodirector.com/dancepds/portal.sd?page=Login';
const classes = {
 combination:{kicker:'CLASS GUIDE / FIRST STEPS',title:'PRE BALLET / TAP',intro:'A warm introduction to dance fundamentals through movement, music and early technique.',detail:'PDS lists Pre Ballet/Tap 1 and 2, Ballet/Tap 1 and successive combination classes. The first combination programs divide class time between ballet and tap, building musicality, self-expression and discipline. Older combination levels add jazz and progress toward more advanced classes.',note:'<strong>What to know:</strong> Class levels and exact placement are confirmed by the studio. Ballet and tap footwear, hair and clothing guidelines vary by class.'},
 ballet:{kicker:'CLASS GUIDE / CLASSICAL FOUNDATIONS',title:'BALLET & POINTE',intro:'The technique that develops strength, alignment, artistry and confident movement.',detail:'PDS offers Open Ballet and Ballet Levels 5–8. Advanced ballet levels require placement. The studio also offers Pre-Pointe and Pointe, which require an instructor or owner recommendation; pointe students must also attend a ballet class.',note:'<strong>What to know:</strong> Pointe is not an open enrollment beginner class. The appropriate ballet level, shoe fit and prerequisites are determined by PDS.'},
 jazz:{kicker:'CLASS GUIDE / ENERGY & ARTISTRY',title:'JAZZ',intro:'Learn to combine musicality, control, creative expression and powerful movement.',detail:'The PDS curriculum includes jazz in its combination classes and Jazz Levels 5–8. Intermediate and advanced classes work on progressively more complex movement vocabulary, extensions, center work and combinations.',note:'<strong>What to know:</strong> Upper-level jazz is placement-based. Studio class guidance includes specific jazz shoes and appropriate practice attire.'},
 hiphop:{kicker:'CLASS GUIDE / RHYTHM & STYLE',title:'HIP HOP',intro:'High-energy classes built around coordination, age-appropriate movement and musical expression.',detail:'PDS lists Beginning All Boys Hip Hop and All Boys Hip Hop Levels 5–8. Its beginning offering introduces students to jazz and hip hop fundamentals; later levels build rhythm, coordination, agility and choreography.',note:'<strong>What to know:</strong> Some hip hop levels require placement. Ask the studio about current groups and suitable class placement.'},
 contemporary:{kicker:'CLASS GUIDE / MOVEMENT TELLS A STORY',title:'CONTEMPORARY',intro:'A creative blend of ballet, jazz and lyrical movement that connects dance to emotion.',detail:'PDS Contemporary Levels 5–8 explore expressive movement and musical interpretation. Advanced levels incorporate more complex technique, partnering and weight-sharing work. The current program lists ballet enrollment as a prerequisite.',note:'<strong>What to know:</strong> PDS specifies that contemporary students must be enrolled in ballet; upper-level classes require placement.'},
 acro:{kicker:'CLASS GUIDE / STRENGTH & FLEXIBILITY',title:'ACROBATICS',intro:'Explore coordination, balance, tumbling foundations and new physical possibilities.',detail:'PDS lists Acrobatics Levels 1–3 and Acro Tots. The Acro Tots program serves approximately ages 2½–5 and focuses on developmental motor coordination, listening and basic skills. Other acrobatics classes build balance and tumbling progressively.',note:'<strong>What to know:</strong> The existing PDS class description says acrobatics does not participate in the year-end recital. Availability varies by season.'},
 more:{kicker:'CLASS GUIDE / MORE TO EXPLORE',title:'TAP & MUSICAL THEATER',intro:'Two expressive paths: create music through your feet or bring a stage story to life.',detail:'PDS lists Tap Levels 5–8 and Musical Theater. Advanced tap covers rhythms and technical footwork; musical theater introduces acting and movement through songs, stories and performances. PDS also lists Modern and Technique/Turns & Leaps.',note:'<strong>What to know:</strong> Upper-level tap placement is determined by PDS. Ask which specialty courses are open during the current season.'},
 adult:{kicker:'CLASS GUIDE / A SPACE FOR YOU',title:'ADULT BARRE',intro:'Dance-based movement and strengthening for adults in a supportive studio setting.',detail:'PDS lists Adult Barre Classes – Barre Body® among its offerings, as well as opportunities for experienced adult tap students at an appropriate level.',note:'<strong>What to know:</strong> Confirm adult program availability, schedule and experience requirements directly with the studio.'}
};
const teachers = {
 serrah:{kicker:'FACULTY / OWNER & ARTISTIC DIRECTOR',title:'SERRAH BROD',intro:'A teacher, choreographer and creative leader with experience across ballet, jazz and performance.',detail:'The PDS biography describes Serrah as an award-winning choreographer whose training spans the University of Minnesota, DanceWorks, Zenon Dance Company and Ballet Arts. After working in Minnesota she continued her dance education in California and has performed and choreographed in numerous productions.',note:'<strong>At PDS:</strong> Serrah is Owner and Artistic Director and helps guide the experience and development of students at the studio.'},
 misha:{kicker:'FACULTY / BALLET & POINTE',title:'MISHA NIKITINE',intro:'A professional ballet background brought directly into the studio classroom.',detail:'Misha trained at Perm Choreographic Academy in Russia and the School of the Hartford Ballet. The PDS faculty biography lists principal dancer roles with Hartford Ballet, Fort Worth-Dallas Ballet, Miami City Ballet and Carolina Ballet, as well as classical and contemporary choreography.',note:'<strong>At PDS:</strong> Upper-level ballet, pointe and Dance Company choreography.'},
 katie:{kicker:'FACULTY / FOUNDATION CLASSES',title:'KATIE HYDE',intro:'Helping younger dancers begin their journey with care, confidence and strong fundamentals.',detail:'Katie started dancing in Powhatan and studied with teachers at Richmond Ballet and Richmond Dance Center. She holds an associate degree in Early Child Development and has taught pre-ballet and tap in preschools and childcare centers.',note:'<strong>At PDS:</strong> Ballet, tap and jazz combination classes.'},
 neo:{kicker:'FACULTY / HIP HOP & CHOREOGRAPHY',title:'SUZANNE “NEO” LYNCH',intro:'Commercial dance experience, fresh creative energy and a passion for giving it back to students.',detail:'Neo studied jazz, ballet, tap, lyrical, gymnastics, contemporary and hip hop before pursuing a professional dance career in Atlanta. Her PDS biography references performances with major music artists and on prominent televised award shows and tours.',note:'<strong>At PDS:</strong> Hip hop instruction and Dance Company choreography.'},
 alissa:{kicker:'FACULTY / TAP',title:'ALISSA PAGNOTTI-ROSWICK',intro:'A deep foundation in tap and musical theater shared with the next generation.',detail:'Alissa earned a BFA in Musical Theatre from The Boston Conservatory and studied or worked with leaders in tap including Savion Glover and Gregory Hines. Her experience spans performing, choreography, and coaching at numerous dance organizations.',note:'<strong>At PDS:</strong> Tap instruction and Dance Company choreography.'},
 shannon:{kicker:'FACULTY / NEXT GENERATION',title:'SHANNON MILLS',intro:'A connection from student to instructor, bringing PDS experience full circle.',detail:'The current PDS site describes Shannon Mills as a former PDS dancer who began training at age three, performed with the studio’s dance team, and served as a teaching assistant before moving into instruction.',note:'<strong>At PDS:</strong> Beginning hip hop and beginning contemporary.'}
};
const toggle=document.querySelector('#nav-toggle'), mobile=document.querySelector('#mobile-menu');
const closeMobile=()=>{mobile.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');document.body.classList.remove('menu-open')};
if(toggle&&mobile){toggle.addEventListener('click',()=>{const expand=toggle.getAttribute('aria-expanded')!=='true';mobile.hidden=!expand;toggle.setAttribute('aria-expanded',String(expand));toggle.setAttribute('aria-label',expand?'Close navigation':'Open navigation');document.body.classList.toggle('menu-open',expand)});mobile.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',closeMobile));window.addEventListener('resize',()=>{if(innerWidth>900)closeMobile()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true')closeMobile()})}
const filters=[...document.querySelectorAll('.filter')],cards=[...document.querySelectorAll('.class-card')],counter=document.querySelector('#class-count');
filters.forEach(btn=>btn.addEventListener('click',()=>{const filter=btn.dataset.filter;let count=0;filters.forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});cards.forEach(card=>{const visible=filter==='all'||card.dataset.categories.split(' ').includes(filter);card.hidden=!visible;if(visible)count++});counter.textContent=count+' PROGRAM'+(count===1?'':'S')}));
const dialog=document.getElementById('detail-dialog'),close=document.getElementById('dialog-close'),done=document.getElementById('dialog-done');let lastFocus=null;
function openDetail(data,kind){if(!data)return;lastFocus=document.activeElement;document.getElementById('dialog-kicker').textContent=data.kicker;document.getElementById('dialog-title').textContent=data.title;document.getElementById('dialog-description').textContent=data.intro;document.getElementById('dialog-detail').innerHTML='<p>'+data.detail+'</p><p>'+data.note+'</p>';const cta=dialog.querySelector('.dialog-actions a');cta.href=kind==='teacher'?'mailto:Serrah@dancepds.com?subject='+encodeURIComponent('Question about the PDS faculty'):registration;cta.textContent=kind==='teacher'?'ASK ABOUT OUR TEACHERS ↗':'EXPLORE REGISTRATION ↗';pdsReplaceArrowGlyphs(cta);dialog.showModal();document.body.classList.add('modal-open')}
function closeDetail(){if(dialog.open)dialog.close()}
cards.forEach(card=>card.addEventListener('click',()=>openDetail(classes[card.dataset.class],'class')));
document.querySelectorAll('.faculty-card').forEach(card=>card.addEventListener('click',()=>openDetail(teachers[card.dataset.teacher],'teacher')));
close.addEventListener('click',closeDetail);done.addEventListener('click',closeDetail);dialog.addEventListener('click',e=>{if(e.target===dialog)closeDetail()});dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(lastFocus)lastFocus.focus()});
const form=document.getElementById('contact-form');form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const name=form.querySelector('#name').value.trim(),email=form.querySelector('#email').value.trim(),interest=form.querySelector('#interest').value,msg=form.querySelector('#message').value.trim();const subject=encodeURIComponent('PDS website inquiry: '+interest),body=encodeURIComponent('Hello Premiere Dance Studio,\n\n'+msg+'\n\nClass interest: '+interest+'\nName: '+name+'\nReply-to email: '+email+'\n');const status=document.getElementById('form-status');status.hidden=false;status.textContent='Your email application should open with the message filled in. Review it and press Send there. If it does not open, email Serrah@dancepds.com directly.';window.location.href='mailto:Serrah@dancepds.com?subject='+subject+'&body='+body});
const navLinks=[...document.querySelectorAll('.nav-desktop a[href^="#"]')];if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id))}})},{rootMargin:'-25% 0px -65% 0px'});document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section))}
})();
