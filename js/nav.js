// nav.js — read-only navigation (data computed by GitHub Actions daily)

const TICKERS = ['NIFTY','BANKNIFTY','RELIANCE','TCS','INFY','HDFCBANK','ICICIBANK','SBIN','WIPRO','AXISBANK'];
let _activeTicker = localStorage.getItem('gex_ticker') || 'NIFTY';

function buildNav(active) {
  const pages = [
    {id:'index',    href:'./index.html',    label:'Dashboard'},
    {id:'analysis', href:'./analysis.html', label:'Analysis'},
    {id:'backtest', href:'./backtest.html', label:'Backtest'},
    {id:'universe', href:'./universe.html', label:'Universe'},
    {id:'whale',    href:'./whale.html',    label:'Whale Watch'},
    {id:'learn',    href:'./learn.html',    label:'Learn'},
  ];
  const links = pages.map(p =>
    `<a href="${p.href}" class="nav-link${active===p.id?' active':''}">${p.label}</a>`
  ).join('');

  const tickerOpts = TICKERS.map(t =>
    `<option value="${t}"${t===_activeTicker?' selected':''}>${t}</option>`
  ).join('');

  document.getElementById('nav').innerHTML = `
    <span class="nav-brand">GEX</span>
    ${links}
    <span class="nav-spacer"></span>
    <select id="ticker-select" onchange="switchTicker(this.value)"
      style="background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);
             padding:4px 8px;border-radius:6px;font-size:13px;cursor:pointer">
      ${tickerOpts}
    </select>
    <span class="nav-freshness" id="nav-freshness">Loading...</span>
    <a class="nav-btn" href="../../actions" target="_blank"
       title="GitHub Actions runs" style="font-size:11px;text-decoration:none">CI</a>
  `;

  API.getStatus().then(function(s) {
    const el = document.getElementById('nav-freshness');
    if (!el) return;
    const date = s.scan_date ? fmtDate(s.scan_date) : 'No data';
    const synth = Object.values(s.symbols || {}).some(function(v){ return v.is_synthetic; });
    if (synth) {
      el.textContent = 'Demo data - ' + date;
      el.style.color = '#f59e0b';
    } else {
      el.textContent = 'Data: ' + date;
    }
  }).catch(function() {
    const el = document.getElementById('nav-freshness');
    if (el) el.textContent = 'No data yet';
  });
}

function fmtDate(d) {
  if (!d) return '---';
  try {
    return new Date(d).toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'});
  } catch(e) { return d; }
}

function switchTicker(sym) {
  _activeTicker = sym;
  localStorage.setItem('gex_ticker', sym);
  window.location.reload();
}

window.getActiveTicker = () => _activeTicker;
