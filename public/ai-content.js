(()=>{
  const byId=id=>document.getElementById(id);
  const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
  const title=s=>{s=clean(s);return s?s.charAt(0).toUpperCase()+s.slice(1):''};
  const unique=a=>[...new Set(a.map(clean).filter(Boolean))];
  const type=()=>typeof currentType==='function'?currentType():BUSINESS_TYPES.food;
  const val=id=>clean(byId(id)?.value||'');
  const firstItem=()=>{try{return products?.find(p=>clean(p.name))?.name||''}catch{return''}};

  const toneWords={
    professional:{label:'Profesional',lead:'meyakinkan',quality:'berkualiti',style:'jelas dan profesional'},
    friendly:{label:'Mesra',lead:'mudah dan mesra',quality:'dipilih dengan teliti',style:'mudah difahami dan mesra pelanggan'},
    premium:{label:'Premium',lead:'lebih eksklusif',quality:'bernilai dan berkualiti',style:'kemas, premium dan meyakinkan'},
    simple:{label:'Ringkas',lead:'mudah',quality:'praktikal',style:'ringkas, jelas dan terus kepada manfaat'}
  };

  const goalCopy={
    order:'mendorong pelanggan membuat tempahan',
    whatsapp:'menggalakkan pelanggan bertanya melalui WhatsApp',
    trust:'membina keyakinan terhadap perniagaan',
    quote:'mendapatkan pertanyaan dan sebut harga'
  };

  const headlinePatterns={
    food:[
      (n,p)=>`${p||'Pilihan Sedap'} Yang Mudah Dipesan`,
      (n,p)=>`${n}: Rasa Menarik, Tempahan Lebih Mudah`,
      (n,p)=>`Nikmati ${p||'Pilihan Kami'} Dengan Mudah`
    ],
    service:[
      (n,p)=>`${p||'Servis Profesional'} Yang Mudah Ditempah`,
      (n,p)=>`${n}: Servis Jelas, Urusan Lebih Mudah`,
      (n,p)=>`Penyelesaian Servis Untuk Keperluan Anda`
    ],
    automotive:[
      (n,p)=>`${p||'Servis Automotif'} Untuk Penjagaan Kenderaan Anda`,
      (n,p)=>`${n}: Servis Kenderaan Yang Lebih Mudah`,
      (n,p)=>`Jaga Kenderaan Anda Dengan Servis Yang Jelas`
    ],
    fashion:[
      (n,p)=>`${p||'Koleksi Pilihan'} Untuk Gaya Anda`,
      (n,p)=>`${n}: Pilihan Yang Kemas, Tempahan Yang Mudah`,
      (n,p)=>`Temui Gaya Yang Sesuai Dengan Anda`
    ],
    digital:[
      (n,p)=>`${p||'Penyelesaian Digital'} Untuk Bisnes Yang Lebih Meyakinkan`,
      (n,p)=>`${n}: Bina Kehadiran Digital Dengan Lebih Jelas`,
      (n,p)=>`Penyelesaian Digital Yang Disusun Mengikut Keperluan Anda`
    ],
    traditional:[
      (n,p)=>`${p||'Produk Tempatan'} Yang Mudah Dipesan`,
      (n,p)=>`${n}: Pilihan Tempatan, Urusan Lebih Mudah`,
      (n,p)=>`Nikmati Pilihan Tempatan Dari Kami`
    ],
    freelance:[
      (n,p)=>`${p||'Servis Profesional'} Mengikut Keperluan Anda`,
      (n,p)=>`${n}: Idea Anda, Dilaksanakan Dengan Lebih Kemas`,
      (n,p)=>`Servis Fleksibel Untuk Projek Anda`
    ]
  };

  function facts(){
    const t=type();
    const brief=val('aiBrief');
    const keywords=val('aiKeywords').split(/,|\n/).map(clean).filter(Boolean);
    const name=val('bizName')||'Perniagaan Anda';
    const category=val('category')||t.category;
    const target=val('target');
    const location=val('location');
    const item=firstItem();
    const tone=val('aiTone')||'professional';
    const goal=val('aiGoal')||'order';
    return {t,brief,keywords,name,category,target,location,item,tone,goal,tw:toneWords[tone]||toneWords.professional};
  }

  function makeHeadlines(f){
    const patterns=headlinePatterns[val('businessType')]||headlinePatterns.service;
    let out=patterns.map(fn=>fn(f.name,f.item));
    if(f.tone==='premium') out[0]=`${f.name} — ${f.item||f.category} Dengan Sentuhan Lebih Premium`;
    if(f.tone==='simple') out[1]=`${f.item||f.category}. Mudah Dipilih, Mudah Dihubungi.`;
    return unique(out).slice(0,3);
  }

  function makeAbout(f){
    const target=f.target?` untuk ${f.target}`:'';
    const loc=f.location?` di ${f.location} dan kawasan berkaitan`:'';
    const brief=f.brief?` Fokus kami ialah ${briefSentence(f.brief)}.`:'';
    const item=f.item?` Antara tawaran utama kami ialah ${f.item}.`:'';
    return `${f.name} menyediakan ${f.category.toLowerCase()}${target}${loc} dengan pendekatan yang ${f.tw.style}.${item}${brief} Pelanggan boleh mendapatkan maklumat lanjut dan membuat pertanyaan dengan mudah melalui saluran yang disediakan.`;
  }

  function briefSentence(s){
    s=clean(s).replace(/[.!?]+$/,'');
    if(!s)return'';
    return s.charAt(0).toLowerCase()+s.slice(1);
  }

  function makeUSP(f){
    const defaults=(f.t.usp||'').split(/,|\n/).map(clean).filter(Boolean);
    const fromKeywords=f.keywords.map(k=>title(k));
    const safeExtras=[];
    if(f.location) safeExtras.push(`Mudah dihubungi dari ${f.location}`);
    safeExtras.push('Maklumat produk / servis yang jelas','Tempahan atau pertanyaan yang mudah');
    return unique([...fromKeywords,...defaults,...safeExtras]).slice(0,4);
  }

  function makeCTA(f){
    if(f.goal==='quote') return val('businessType')==='digital'?'Dapatkan Sebut Harga':'Minta Sebut Harga';
    if(f.goal==='whatsapp') return 'WhatsApp Sekarang';
    if(f.goal==='trust') return 'Ketahui Lebih Lanjut';
    return f.t.cta||'Hubungi Kami';
  }

  function productDraft(p,f){
    const name=clean(p.name)||f.t.itemSingular;
    const price=clean(p.price);
    const promo=clean(p.promo);
    const pieces=[`${name} ditawarkan untuk pelanggan yang mencari ${f.category.toLowerCase()} yang ${f.tw.lead}.`];
    if(price) pieces.push(`Harga: ${price}.`);
    if(promo) pieces.push(`Promosi semasa: ${promo}.`);
    pieces.push(`Hubungi ${f.name} untuk maklumat lanjut, ketersediaan atau tempahan.`);
    return pieces.join(' ');
  }

  function draft(){
    const f=facts();
    return {
      headlines:makeHeadlines(f),
      about:makeAbout(f),
      usp:makeUSP(f),
      cta:makeCTA(f),
      productDescriptions:(typeof products!=='undefined'?products:[]).map(p=>({id:p.id,text:productDraft(p,f)}))
    };
  }

  function polishText(s){
    let x=clean(s);
    const swaps=[
      [/\bmurah\b/gi,'berpatutan'],[/\bbest\b/gi,'menarik'],[/\bpower\b/gi,'berkesan'],
      [/\bcepat gila\b/gi,'pantas'],[/\bsenang\b/gi,'mudah'],[/\bws\b/gi,'WhatsApp'],
      [/\bsy\b/gi,'saya'],[/\bx\b/gi,'tidak']
    ];
    swaps.forEach(([a,b])=>x=x.replace(a,b));
    return title(x);
  }

  function improveExisting(){
    const f=facts();
    const existingHead=val('headline');
    const existingAbout=val('about');
    const existingUSP=val('usp').split(/,|\n/).map(clean).filter(Boolean);
    const d=draft();
    if(existingHead) d.headlines=[polishText(existingHead),...d.headlines].filter((x,i,a)=>a.indexOf(x)===i).slice(0,3);
    if(existingAbout) d.about=polishText(existingAbout)+(existingAbout.length<90?` ${makeAbout(f)}`:'');
    if(existingUSP.length) d.usp=unique(existingUSP.map(polishText).concat(d.usp)).slice(0,4);
    renderResult(d,true);
  }

  let lastDraft=null;
  function renderResult(d,polished=false){
    lastDraft=d;
    const box=byId('aiResult');
    box.innerHTML=`
      <div class="aiResultHead"><div><b>${polished?'Ayat telah dikemas':'Cadangan kandungan sedia'}</b><small>Semak fakta sebelum digunakan.</small></div><span class="aiScore">${qualityScore()}% siap</span></div>
      <div class="aiSuggestion"><label>Pilihan Headline</label>${d.headlines.map((h,i)=>`<button class="headlinePick ${i===0?'active':''}" data-headline="${escapeAttr(h)}">${i+1}. ${escapeHtml(h)}</button>`).join('')}</div>
      <div class="aiSuggestion"><label>Penerangan Perniagaan</label><p>${escapeHtml(d.about)}</p></div>
      <div class="aiSuggestion"><label>USP / Kelebihan</label><div class="uspPills">${d.usp.map(x=>`<span>${escapeHtml(x)}</span>`).join('')}</div></div>
      <div class="aiSuggestion"><label>CTA Dicadangkan</label><p><b>${escapeHtml(d.cta)}</b></p></div>
      <div class="aiActions"><button class="btn btnPrimary" id="aiUseAll">✓ Guna Semua</button><button class="btn btnSoft" id="aiUseHeadline">Guna Headline</button><button class="btn btnLight" id="aiUseAbout">Guna Penerangan</button><button class="btn btnLight" id="aiUseUSP">Guna USP</button></div>`;
    box.querySelectorAll('.headlinePick').forEach(b=>b.addEventListener('click',()=>{box.querySelectorAll('.headlinePick').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));
    byId('aiUseAll').onclick=()=>applyDraft('all');
    byId('aiUseHeadline').onclick=()=>applyDraft('headline');
    byId('aiUseAbout').onclick=()=>applyDraft('about');
    byId('aiUseUSP').onclick=()=>applyDraft('usp');
  }

  function selectedHeadline(){return byId('aiResult')?.querySelector('.headlinePick.active')?.dataset.headline||lastDraft?.headlines?.[0]||''}
  function applyDraft(mode){
    if(!lastDraft)return;
    if(mode==='all'||mode==='headline') byId('headline').value=selectedHeadline();
    if(mode==='all'||mode==='about') byId('about').value=lastDraft.about;
    if(mode==='all'||mode==='usp') byId('usp').value=lastDraft.usp.join(', ');
    if(mode==='all'){
      byId('cta').value=lastDraft.cta;
      try{lastDraft.productDescriptions.forEach(s=>{const p=products.find(x=>x.id===s.id);if(p&&!clean(p.desc))p.desc=s.text});renderProducts()}catch{}
    }
    if(typeof preview==='function')preview();
    if(typeof show==='function')show(mode==='all'?'Cadangan AI digunakan.':'Kandungan dipilih telah digunakan.');
  }

  function qualityScore(){
    let n=0,total=7;
    if(val('bizName'))n++;if(val('businessType'))n++;if(val('target'))n++;if(val('location'))n++;
    if(val('aiBrief'))n++;if(firstItem())n++;if(val('aiKeywords'))n++;
    return Math.round(n/total*100);
  }

  function escapeHtml(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
  function escapeAttr(s){return escapeHtml(s).replace(/`/g,'&#96;')}

  function injectStyles(){
    const style=document.createElement('style');
    style.textContent=`
      .aiPanel{background:linear-gradient(180deg,#fff,#fbfcff);border:1px solid #ccd9ff!important;position:relative;overflow:hidden}
      .aiPanel:before{content:'';position:absolute;width:230px;height:230px;border-radius:50%;background:rgba(49,94,251,.07);right:-120px;top:-140px}
      .aiBadge{display:inline-flex;align-items:center;gap:6px;padding:6px 9px;border-radius:999px;background:#eef3ff;color:#2747b1;font-size:10px;font-weight:900;letter-spacing:.05em}
      .aiInput{min-height:110px}
      .aiGrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      .aiResult{margin-top:13px;border-top:1px solid var(--line);padding-top:13px}
      .aiResultHead{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:10px}
      .aiResultHead b{display:block;color:var(--navy)}.aiResultHead small{display:block;color:var(--muted);font-size:10px;margin-top:2px}
      .aiScore{font-size:10px;font-weight:900;background:#ecfdf3;color:#087653;border-radius:999px;padding:6px 8px;white-space:nowrap}
      .aiSuggestion{padding:11px 0;border-bottom:1px solid #edf0f5}.aiSuggestion label{margin:0 0 7px}.aiSuggestion p{font-size:13px;line-height:1.65;color:#475467;margin:0}
      .headlinePick{display:block;width:100%;text-align:left;border:1px solid var(--line);background:#fff;border-radius:10px;padding:9px 10px;margin:6px 0;color:#344054;font-size:12px}
      .headlinePick.active{border-color:#8fa6ff;background:#f3f6ff;box-shadow:0 0 0 3px rgba(49,94,251,.07)}
      .uspPills{display:flex;gap:6px;flex-wrap:wrap}.uspPills span{font-size:10px;font-weight:800;padding:6px 8px;background:#f4f6f9;border-radius:999px;color:#475467}
      .aiActions{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px}.aiActions .btn{padding:9px 11px;font-size:11px}
      .aiSafety{font-size:10px;color:#7d8797;line-height:1.5;margin:9px 0 0;padding:9px;background:#f8fafc;border-radius:9px}
      @media(max-width:760px){.aiGrid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function injectPanel(){
    const left=document.querySelector('.left');
    const first=left?.querySelector('.panel');
    if(!left||!first||byId('aiContentPanel'))return;
    const panel=document.createElement('section');
    panel.className='panel aiPanel';panel.id='aiContentPanel';
    panel.innerHTML=`
      <div class="panelHead"><div class="panelTitle"><div class="iconbox">AI</div><div><h2>AI Bantu Tulis Kandungan</h2><p class="note">Tulis idea ringkas. Sistem akan membina ayat pemasaran mengikut jenis perniagaan anda.</p></div></div><span class="aiBadge">SMART DRAFT</span></div>
      <label>Ceritakan bisnes anda dalam ayat mudah</label>
      <textarea id="aiBrief" class="aiInput" placeholder="Contoh: Saya jual chocojar RM12. Target pelajar kolej. COD sekitar kampus. Rasa coklat crunchy dan sesuai untuk snek."></textarea>
      <div class="aiGrid"><div><label>Gaya Ayat</label><select id="aiTone"><option value="professional">Profesional</option><option value="friendly">Mesra & santai</option><option value="premium">Premium</option><option value="simple">Ringkas & terus</option></select></div><div><label>Matlamat Utama</label><select id="aiGoal"><option value="order">Dapatkan tempahan</option><option value="whatsapp">Dapatkan pertanyaan WhatsApp</option><option value="trust">Bina keyakinan pelanggan</option><option value="quote">Dapatkan sebut harga</option></select></div></div>
      <label>Kata kunci / kelebihan sebenar</label><input id="aiKeywords" placeholder="Contoh: homemade, crunchy, COD, harga pelajar">
      <div class="actions" style="margin-top:12px"><button class="btn btnPrimary" id="aiGenerate">✨ Jana Kandungan</button><button class="btn btnSoft" id="aiImprove">✎ Baiki Ayat Sedia Ada</button></div>
      <p class="aiSafety">AI ini menghasilkan draf berdasarkan maklumat yang anda masukkan dan template jenis perniagaan. Semak semula harga, promosi, lokasi dan fakta sebelum publish. Sistem tidak akan menambah sijil, testimoni atau tuntutan yang anda tidak berikan.</p>
      <div id="aiResult" class="aiResult" style="display:none"></div>`;
    first.insertAdjacentElement('afterend',panel);
    byId('aiGenerate').onclick=()=>{const d=draft();byId('aiResult').style.display='block';renderResult(d,false)};
    byId('aiImprove').onclick=()=>{byId('aiResult').style.display='block';improveExisting()};
  }

  function upgradeLabels(){
    document.title='Business Website Studio v7 AI | TVET MARA Besut';
    const eyebrow=document.querySelector('.eyebrow');if(eyebrow)eyebrow.textContent='Website Builder Pelajar v7 • AI Content Assistant';
    const brand=document.querySelector('.brandlock > div:last-child');if(brand&&brand.firstChild)brand.firstChild.nodeValue='Business Website Studio v7';
    const heroH=document.querySelector('.hero h1');if(heroH)heroH.textContent='Bina website profesional dengan bantuan AI.';
    const heroP=document.querySelector('.hero p');if(heroP)heroP.textContent='Pilih jenis perniagaan, tulis idea ringkas dan biarkan AI bantu menyediakan headline, penerangan, USP, CTA serta kandungan produk sebelum anda preview dan publish.';
    const meta=document.querySelector('.hero-meta');if(meta&&!meta.textContent.includes('AI Bantu Tulis'))meta.insertAdjacentHTML('afterbegin','<span>✓ AI Bantu Tulis</span>');
    const foot=document.querySelector('.footer');if(foot)foot.textContent='Business Website Studio v7 AI • TVET MARA Besut • Built for learning, branding & real business use';
  }

  function init(){injectStyles();injectPanel();upgradeLabels()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0));else setTimeout(init,0);
})();
