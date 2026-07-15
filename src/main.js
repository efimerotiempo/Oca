const STORAGE_KEY = 'oca-game-state-v1';
const TOTAL_CELLS = 111;
const ROUND_EFFECT_CELLS = new Set([8, 17, 29, 38, 47, 59, 66, 74, 83, 92, 101, 109]);
const templates = [
  'Cuenta una anécdota divertida en menos de un minuto.',
  'Reta a otro jugador a piedra, papel o tijera: quien pierda retrocede 1 casilla.',
  'Haz una pregunta de cultura general; si nadie acierta, avanzas 1 casilla.',
  'Imita a un personaje famoso durante 20 segundos.',
  'Elige una categoría y di 5 palabras relacionadas sin repetir.',
  'Canta el estribillo de una canción elegida por el grupo.',
  'Cuenta hasta 20 alternando con otro jugador; quien se equivoque pierde el próximo avance extra.',
  'Describe una película sin decir nombres propios; si la adivinan, todos aplauden y sigues.',
  'Haz una pose de estatua hasta que termine el siguiente turno.',
  'Inventa una regla graciosa para tu próximo turno.',
  'Responde una pregunta del grupo sin usar sí ni no.',
  'Elige a alguien para que lance de nuevo; tú mantienes tu posición.'
];
const miniGames = Array.from({ length: TOTAL_CELLS }, (_, index) => {
  const cell = index + 1;
  if (cell === TOTAL_CELLS) return 'Meta final: celebra tu llegada y cuenta tu mejor momento de la partida.';
  if (ROUND_EFFECT_CELLS.has(cell)) return 'Efecto de ronda completa: hasta que vuelva tu turno, debes hablar rimando. Al cumplirse la ronda, este efecto deja de aplicar.';
  return templates[index % templates.length];
});
const emptyState = { setupDone: false, players: [], currentPlayerIndex: 0, diceMode: 'virtual', diceFaces: 6, realRollInput: '', lastRoll: null, log: [], activeEffects: [], expiredNotices: [] };
let state = loadState();
let names = ['', ''];
let setupDiceMode = 'virtual';
let setupDiceFaces = 6;
let error = '';

function loadState() {
  try { return { ...emptyState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') }; } catch { return { ...emptyState }; }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function uid() { return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`; }
function html(text) { return String(text).replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch])); }
function render() { state.setupDone ? renderGame() : renderSetup(); }

function renderSetup() {
  document.getElementById('root').innerHTML = `<main class="app setup"><section class="card hero"><h1>Oca 111</h1><p>Configura participantes, dado y empieza una partida persistente desde cualquier navegador del móvil.</p></section><form class="card" id="setup-form"><h2>Participantes</h2><div id="name-list">${names.map((name, index) => `<label class="name-row">Jugador ${index + 1}<input value="${html(name)}" data-name-index="${index}" placeholder="Nombre"/><button type="button" data-remove="${index}" ${names.length <= 2 ? 'disabled' : ''}>Quitar</button></label>`).join('')}</div><button type="button" class="secondary" id="add-player">Agregar participante</button><h2>Dado</h2><div class="radio-grid"><label><input type="radio" name="dice-mode" value="virtual" ${setupDiceMode === 'virtual' ? 'checked' : ''}/> Virtual</label><label><input type="radio" name="dice-mode" value="real" ${setupDiceMode === 'real' ? 'checked' : ''}/> Real</label></div><label id="faces-label" ${setupDiceMode === 'real' ? 'hidden' : ''}>Caras del dado<select id="dice-faces"><option value="6">6</option><option value="12">12</option><option value="20">20</option></select></label>${error ? `<p class="error">${html(error)}</p>` : ''}<button class="primary">Comenzar partida</button></form></main>`;
  const faces = document.getElementById('dice-faces');
  if (faces) faces.value = String(setupDiceFaces);
  document.querySelectorAll('[data-name-index]').forEach(input => input.addEventListener('input', event => { names[Number(event.target.dataset.nameIndex)] = event.target.value; }));
  document.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', event => { names = names.filter((_, i) => i !== Number(event.target.dataset.remove)); render(); }));
  document.getElementById('add-player').addEventListener('click', () => { names.push(''); render(); });
  document.querySelectorAll('[name="dice-mode"]').forEach(input => input.addEventListener('change', event => { setupDiceMode = event.target.value; render(); }));
  if (faces) faces.addEventListener('change', event => { setupDiceFaces = Number(event.target.value); });
  document.getElementById('setup-form').addEventListener('submit', startGame);
}
function startGame(event) {
  event.preventDefault();
  const cleanNames = names.map(name => name.trim()).filter(Boolean);
  if (cleanNames.length < 2) { error = 'Ingresa al menos dos participantes.'; render(); return; }
  state = { ...emptyState, setupDone: true, players: cleanNames.map((name, index) => ({ id: uid(), name, position: 1, color: `hsl(${(index * 71) % 360} 80% 45%)` })), diceMode: setupDiceMode, diceFaces: setupDiceFaces, log: ['Partida iniciada. El orden de turnos sigue el orden de ingreso de nombres.'] };
  error = ''; saveState(); render();
}
function renderGame() {
  const currentPlayer = state.players[state.currentPlayerIndex];
  const sortedPlayers = [...state.players].sort((a, b) => b.position - a.position);
  document.getElementById('root').innerHTML = `<main class="app"><header class="topbar"><div><h1>Oca 111</h1><p>Turno de <strong>${html(currentPlayer.name)}</strong></p></div><button class="danger" id="reset">REINICIAR</button></header><section class="grid"><article class="card turn"><h2>Turno actual</h2><p class="position">Casilla ${currentPlayer.position} / ${TOTAL_CELLS}</p><p><strong>Minijuego actual:</strong> ${html(miniGames[currentPlayer.position - 1])}</p>${state.diceMode === 'virtual' ? `<p>Dado virtual de ${state.diceFaces} caras.</p>` : `<label>Resultado del dado real<input inputmode="numeric" id="real-roll" value="${html(state.realRollInput)}" placeholder="Ej. 5"/></label>`}${error ? `<p class="error">${html(error)}</p>` : ''}<button class="primary roll" id="roll">${state.diceMode === 'virtual' ? 'Tirar dado' : 'Registrar tirada'}</button>${state.lastRoll ? `<p>Última tirada: ${state.lastRoll}</p>` : ''}</article><article class="card"><h2>Recordatorios de ronda</h2>${state.activeEffects.length ? state.activeEffects.map(effect => `<div class="effect"><strong>${html(effect.playerName)}</strong><span>Casilla ${effect.startedAtCell}: ${html(effect.text)}</span></div>`).join('') : '<p>No hay efectos activos.</p>'}${state.expiredNotices.map(notice => `<p class="notice">${html(notice)}</p>`).join('')}</article></section><section class="card"><h2>Posiciones</h2><div class="players">${sortedPlayers.map(player => `<div class="player"><span class="dot" style="background:${player.color}"></span><strong>${html(player.name)}</strong><meter min="1" max="${TOTAL_CELLS}" value="${player.position}"></meter><span>${player.position}</span></div>`).join('')}</div></section><section class="card board"><h2>Tablero</h2><div class="cells">${Array.from({ length: TOTAL_CELLS }, (_, i) => { const cell = i + 1; const occupants = state.players.filter(player => player.position === cell); return `<div class="cell ${occupants.length ? 'occupied' : ''}" title="${html(miniGames[i])}"><span>${cell}</span>${occupants.map(player => `<i style="background:${player.color}" title="${html(player.name)}"></i>`).join('')}</div>`; }).join('')}</div></section><section class="card"><h2>Historial</h2>${state.log.map(item => `<p class="log">${html(item)}</p>`).join('')}</section></main>`;
  document.getElementById('reset').addEventListener('click', resetGame);
  document.getElementById('roll').addEventListener('click', rollDice);
  const realRoll = document.getElementById('real-roll');
  if (realRoll) realRoll.addEventListener('input', event => { state.realRollInput = event.target.value; saveState(); });
}
function rollDice() {
  const roll = state.diceMode === 'virtual' ? Math.floor(Math.random() * state.diceFaces) + 1 : Number(state.realRollInput);
  if (!Number.isInteger(roll) || roll < 1) { error = 'Ingresa un resultado válido del dado real.'; render(); return; }
  const player = state.players[state.currentPlayerIndex];
  const nextPosition = Math.min(TOTAL_CELLS, player.position + roll);
  const landedMiniGame = miniGames[nextPosition - 1];
  const completedEffects = state.activeEffects.filter(effect => effect.expiresAtTurnIndex === state.currentPlayerIndex);
  const stillActive = state.activeEffects.filter(effect => effect.expiresAtTurnIndex !== state.currentPlayerIndex);
  const newEffect = ROUND_EFFECT_CELLS.has(nextPosition) ? [{ id: uid(), playerId: player.id, playerName: player.name, text: landedMiniGame, startedAtCell: nextPosition, expiresAtTurnIndex: state.currentPlayerIndex }] : [];
  state.players = state.players.map((p, i) => i === state.currentPlayerIndex ? { ...p, position: nextPosition } : p);
  state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
  state.lastRoll = roll;
  state.realRollInput = '';
  state.activeEffects = [...stillActive, ...newEffect];
  state.expiredNotices = completedEffects.map(effect => `El efecto de ${effect.playerName} de la casilla ${effect.startedAtCell} ya no tiene efecto.`);
  state.log = [`${player.name} sacó ${roll}, llegó a la casilla ${nextPosition}: ${landedMiniGame}`, ...state.log].slice(0, 8);
  error = ''; saveState(); render();
}
function resetGame() {
  if (confirm('¿Seguro que quieres REINICIAR la partida? Se borrará todo el avance guardado.')) { localStorage.removeItem(STORAGE_KEY); state = { ...emptyState }; names = ['', '']; error = ''; render(); }
}
render();
