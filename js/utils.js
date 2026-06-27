function fmt(n, dec=0) {
  if (n == null || isNaN(n)) return '—';
  return Number(n).toLocaleString('en-IN', {minimumFractionDigits:dec, maximumFractionDigits:dec});
}
function fmtPct(n, dec=2) {
  if (n == null || isNaN(n)) return '—';
  const v = Number(n);
  const cls = v >= 0 ? 'pos' : 'neg';
  const sign = v >= 0 ? '+' : '';
  return `<span class="${cls}">${sign}${v.toFixed(dec)}%</span>`;
}
function fmtDist(spot, level) {
  if (!spot || !level) return '—';
  const pct = ((level - spot) / spot * 100);
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(2)}% from spot`;
}
function fmtTs(ts) {
  if (!ts) return 'No data';
  try {
    const d = new Date(ts);
    return d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) +
           ' ' + d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}) + ' IST';
  } catch(e) { return ts; }
}
function skelLine(w='100%') { return `<div class="skeleton skel-line" style="width:${w}"></div>`; }
function skelCard()          { return `<div class="skeleton skel-card"></div>`; }
function noData(msg)         { return `<div style="color:var(--text-muted);padding:20px;text-align:center;font-size:13px">${msg||'No data'}</div>`; }
