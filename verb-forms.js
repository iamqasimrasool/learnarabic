// The list and the comparison table share the sentence engine and the example controls.
function installVerbForms() {
  const byId = id => document.getElementById(id);
  const controls = document.querySelector('.controls');
  const reference = byId('verbReference');
  const comparison = document.createElement('details');
  comparison.className = 'comparison';
  comparison.innerHTML = '<summary>تفصیلی جدول اور تمام زمانوں کا موازنہ</summary>';
  reference.before(comparison);
  const comparisonFilters = document.createElement('div');
  comparisonFilters.className = 'controls';
  comparison.append(comparisonFilters);
  for (const id of ['person','tense','detail']) comparisonFilters.append(byId(id).closest('label'));
  comparison.append(reference);
  const exampleTable = byId('exampleTable').closest('.tablewrap');
  comparison.append(exampleTable.previousElementSibling, exampleTable);

  const options = document.createElement('details');
  options.className = 'form-options';
  options.innerHTML = '<summary>حالت، کیفیت اور تعداد</summary><div></div>';
  for (const id of ['condition','aspect','number','scope']) options.lastElementChild.append(byId(id).closest('label'));
  controls.append(options);
  const browser = document.createElement('section');
  browser.className = 'forms';
  browser.setAttribute('aria-labelledby','forms-title');
  browser.innerHTML = '<header><h2 id="forms-title"></h2><div class="time-choices" role="group" aria-label="زمانہ یا حکم"></div></header><div class="forms-list"></div>';
  controls.after(browser);
  const tabs = browser.querySelector('.time-choices');
  const list = browser.querySelector('.forms-list');
  let tense = 'present', openKey = '', previousCondition = 'مثبت';
  const condition = byId('condition');
  const aspect = byId('aspect');
  condition.value = 'مثبت';
  aspect.value = 'simple';
  byId('scope').value = 'active';

  function draw() {
    const direct = directives.includes(condition.value);
    byId('forms-title').textContent = byId('verb').selectedOptions[0].textContent;
    for (const tab of tabs.children) tab.setAttribute('aria-pressed', String(tab.value === (direct ? 'direct' : tense)));
    list.replaceChildren();
    const number = byId('number').value;
    const selection = condition.value === 'all' ? lessonConditions : [condition.value];
    const qualities = direct ? ['simple'] : aspect.value === 'all' ? aspects : [aspect.value];
    const t = direct ? 'direct' : tense;
    function row(i, voice) {
      const option = per.options[i];
      const key = voice + i;
      const item = document.createElement('div');
      item.className = 'form-item';
      const toggle = document.createElement('button');
      toggle.className = 'form-toggle';
      const label = document.createElement('span');
      label.textContent = voice === 'active' ? option.textContent : 'نتیجہ / فاعل غیر متعین';
      const form = document.createElement('span');
      form.className = 'arabic';
      form.lang = 'ar-SA';
      const c = selection.length === 1 ? selection[0] : 'مثبت';
      const a = qualities.length === 1 ? qualities[0] : 'simple';
      const entry = lessonSentence(i,t,a,voice,c);
      const compact = referenceForm(entry,c);
      for (const word of compact.ar.split(/\s+/u)) {
        if (form.childNodes.length) form.append(' ');
        const core = word.replace(/[،؟]+$/u,'');
        for (const [part,role] of core ? lessonSegments(core,entry) : []) {
          const mark = document.createElement('span');
          mark.className = role;
          mark.textContent = part;
          form.append(mark);
        }
        form.append(word.slice(core.length));
      }
      toggle.append(form,label);
      const audio = document.createElement('button');
      audio.className = 'form-audio';
      audio.textContent = '🔊';
      audio.setAttribute('aria-label',compact.ar+' سنیں');
      audio.onclick = () => speak(compact.ar);
      const examples = document.createElement('div');
      examples.className = 'form-examples';
      examples.id = 'examples-'+key;
      toggle.setAttribute('aria-controls',examples.id);
      function expand(on) {
        toggle.setAttribute('aria-expanded',String(on));
        examples.hidden = !on;
        if (!on || examples.childElementCount) return;
        for (const state of selection) for (const quality of qualities) {
          const block = document.createElement('article');
          const heading = document.createElement('strong');
          heading.textContent = direct ? state : state+' · '+aspectName[quality];
          block.append(heading);
          appendExample(block,i,t,quality,voice,state,[quality]);
          examples.append(block);
        }
      }
      toggle.onclick = () => {
        const on = examples.hidden;
        const previous = list.querySelector('[aria-expanded="true"]');
        if (previous && previous !== toggle) {
          previous.setAttribute('aria-expanded','false');
          byId(previous.getAttribute('aria-controls')).hidden = true;
        }
        openKey = on ? key : '';
        expand(on);
      };
      expand(openKey === key);
      item.append(toggle,audio,examples);
      list.append(item);
    }
    if (direct || byId('scope').value !== 'nonagent') {
      for (const i of [0,1,3,12,13,14,5,6,7,8,2,4,15,16,17,11,9,10]) {
        if (number !== 'all' && numberOfPerson(i) !== number) continue;
        if (!direct || [1,2,6,9,13,16].includes(i)) row(i,'active');
      }
    }
    if (!direct && !lessons[byId('verb').value].motion && byId('scope').value !== 'active') row(0,'nonagent');
  }
  for (const [value,title] of Object.entries({...tenseNames,direct:'حکم'})) {
    const button = document.createElement('button');
    button.value = value;
    button.textContent = title;
    button.onclick = () => {
      if (value === 'direct') {
        if (!directives.includes(condition.value)) previousCondition = condition.value;
        condition.value = 'حکم';
      } else {
        tense = value;
        if (directives.includes(condition.value)) condition.value = previousCondition;
      }
      render();
      draw();
    };
    tabs.append(button);
  }
  let printOpen;
  window.addEventListener('beforeprint', () => { printOpen = comparison.open; comparison.open = true; });
  window.addEventListener('afterprint', () => { comparison.open = printOpen; });
  controls.addEventListener('change',draw);
  render();
  draw();
}
