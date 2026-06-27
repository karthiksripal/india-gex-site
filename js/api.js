// api.js — static file reads for GitHub Pages (no server required)
// All data is pre-computed by GitHub Actions and committed as JSON.

const _BASE = (() => {
  const loc = window.location.pathname;
  return loc.includes('/web/') ? '../data' : './data';
})();

const API = {
  getScan:     sym => _get(`${_BASE}/${sym||'NIFTY'}/latest.json`),
  getProfile:  sym => _get(`${_BASE}/${sym||'NIFTY'}/latest.json`),
  getLevels:   sym => _get(`${_BASE}/${sym||'NIFTY'}/latest.json`),
  getPlays:    sym => _get(`${_BASE}/${sym||'NIFTY'}/latest.json`),
  getBacktest: ()  => _get(`${_BASE}/backtest.json`),
  getUniverse: ()  => _get(`${_BASE}/universe.json`),
  getWhale:    ()  => _get(`${_BASE}/whale.json`),
  getStatus:   ()  => _get(`${_BASE}/meta.json`),
};

function _get(url) {
  return fetch(url).then(r => {
    if (!r.ok) return Promise.reject(new Error(`${r.status} ${r.url}`));
    return r.json();
  });
}
