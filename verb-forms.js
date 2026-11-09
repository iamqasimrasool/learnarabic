function installVerbForms() {
  const byId = id => document.getElementById(id);
  const controls = document.querySelector('.controls');
  const reference = byId('verbReference');
  const comparison = document.createElement('details');
  comparison.open = true;
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
  const condition = byId('condition');
  const aspect = byId('aspect');
  condition.value = 'مثبت';
  aspect.value = 'simple';
  byId('scope').value = 'active';

  render();
}
