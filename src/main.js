(function () {
  'use strict';

  var STORAGE_KEY = 'oca-game-state-v1';
  var TOTAL_CELLS = 111;
  var ROUND_EFFECT_CELLS = [8, 17, 29, 38, 47, 59, 66, 74, 83, 92, 101, 109];
  var templates = [
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
  var miniGames = [];
  var emptyState = { setupDone: false, players: [], currentPlayerIndex: 0, diceMode: 'virtual', diceFaces: 6, realRollInput: '', lastRoll: null, log: [], activeEffects: [], expiredNotices: [], gameFinished: false, winnerName: '' };
  var state;
  var names = ['', ''];
  var setupDiceMode = 'virtual';
  var setupDiceFaces = 6;
  var error = '';
  var APP_VERSION = 'final-ganador-20260716';

  for (var index = 0; index < TOTAL_CELLS; index += 1) {
    var cell = index + 1;
    if (cell === TOTAL_CELLS) miniGames.push('Meta final: celebra tu llegada y cuenta tu mejor momento de la partida.');
    else if (ROUND_EFFECT_CELLS.indexOf(cell) !== -1) miniGames.push('Efecto de ronda completa: hasta que vuelva tu turno, debes hablar rimando. Al cumplirse la ronda, este efecto deja de aplicar.');
    else miniGames.push(templates[index % templates.length]);
  }

  function cloneEmptyState() {
    return JSON.parse(JSON.stringify(emptyState));
  }

  function mergeState(saved) {
    var merged = cloneEmptyState();
    if (!saved || typeof saved !== 'object') return merged;
    Object.keys(saved).forEach(function (key) { merged[key] = saved[key]; });
    merged.players = (merged.players || []).map(function (player) {
      if (typeof player.drinkCount !== 'number') player.drinkCount = 0;
      return player;
    });
    return merged;
  }

  function loadState() {
    try {
      var raw = window.localStorage ? window.localStorage.getItem(STORAGE_KEY) : null;
      return mergeState(raw ? JSON.parse(raw) : null);
    } catch (loadError) {
      return cloneEmptyState();
    }
  }

  function saveState() {
    try {
      if (window.localStorage) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (saveError) {
      error = 'El navegador no permitió guardar automáticamente. Si puedes, abre la página desde http:// y no como archivo suelto.';
    }
  }

  function uid() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    return String(Date.now()) + '-' + String(Math.random()).slice(2);
  }

  function html(text) {
    return String(text).replace(/[&<>'"]/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character];
    });
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function renderErrorScreen(renderError) {
    byId('root').innerHTML = '<main class="app setup"><section class="card hero"><h1>Oca 111</h1><p>La aplicación no pudo arrancar.</p></section><section class="card"><h2>Qué hacer</h2><p>Abre la web desde un servidor local, no arrastrando el archivo al navegador. En el ordenador ejecuta <strong>npm start</strong> y en el móvil entra a <strong>http://IP-DE-TU-ORDENADOR:4173</strong>.</p><p class="error">Detalle técnico: ' + html(renderError && renderError.message ? renderError.message : renderError) + '</p></section></main>';
  }

  function render() {
    try {
      if (state.setupDone) renderGame();
      else renderSetup();
    } catch (renderError) {
      renderErrorScreen(renderError);
    }
  }

  function renderSetup() {
    var nameRows = names.map(function (name, nameIndex) {
      return '<label class="name-row">Jugador ' + (nameIndex + 1) + '<input value="' + html(name) + '" data-name-index="' + nameIndex + '" placeholder="Nombre"/><button type="button" data-remove="' + nameIndex + '" ' + (names.length <= 2 ? 'disabled' : '') + '>Quitar</button></label>';
    }).join('');
    byId('root').innerHTML = '<main class="app setup"><section class="card hero"><h1>Oca 111</h1><p>Configura participantes, dado y empieza una partida persistente desde cualquier navegador del móvil.</p><small class="app-version">Versión: ' + APP_VERSION + '</small></section><form class="card" id="setup-form"><h2>Participantes</h2><div id="name-list">' + nameRows + '</div><button type="button" class="secondary" id="add-player">Agregar participante</button><h2>Dado</h2><div class="radio-grid"><label><input type="radio" name="dice-mode" value="virtual" ' + (setupDiceMode === 'virtual' ? 'checked' : '') + '/> Virtual</label><label><input type="radio" name="dice-mode" value="real" ' + (setupDiceMode === 'real' ? 'checked' : '') + '/> Real</label></div><label id="faces-label" ' + (setupDiceMode === 'real' ? 'hidden' : '') + '>Caras del dado<select id="dice-faces"><option value="6">6</option><option value="12">12</option><option value="20">20</option></select></label>' + (error ? '<p class="error">' + html(error) + '</p>' : '') + '<button class="primary">Comenzar partida</button></form></main>';
    var faces = byId('dice-faces');
    var nameInputs = document.querySelectorAll('[data-name-index]');
    var removeButtons = document.querySelectorAll('[data-remove]');
    var modeInputs = document.querySelectorAll('[name="dice-mode"]');
    if (faces) faces.value = String(setupDiceFaces);
    Array.prototype.forEach.call(nameInputs, function (input) { input.addEventListener('input', function (event) { names[Number(event.target.getAttribute('data-name-index'))] = event.target.value; }); });
    Array.prototype.forEach.call(removeButtons, function (button) { button.addEventListener('click', function (event) { names.splice(Number(event.target.getAttribute('data-remove')), 1); render(); }); });
    byId('add-player').addEventListener('click', function () { names.push(''); render(); });
    Array.prototype.forEach.call(modeInputs, function (input) { input.addEventListener('change', function (event) { setupDiceMode = event.target.value; render(); }); });
    if (faces) faces.addEventListener('change', function (event) { setupDiceFaces = Number(event.target.value); });
    byId('setup-form').addEventListener('submit', startGame);
  }

  function startGame(event) {
    event.preventDefault();
    var cleanNames = names.map(function (name) { return name.trim(); }).filter(Boolean);
    if (cleanNames.length < 2) { error = 'Ingresa al menos dos participantes.'; render(); return; }
    state = cloneEmptyState();
    state.setupDone = true;
    state.players = cleanNames.map(function (name, playerIndex) { return { id: uid(), name: name, position: 1, drinkCount: 0, color: 'hsl(' + ((playerIndex * 71) % 360) + ' 80% 45%)' }; });
    state.diceMode = setupDiceMode;
    state.diceFaces = setupDiceFaces;
    state.log = ['Partida iniciada. El orden de turnos sigue el orden de ingreso de nombres.'];
    error = '';
    saveState();
    render();
  }

  function renderGame() {
    var currentPlayer = state.players[state.currentPlayerIndex];
    if (!currentPlayer) { state = cloneEmptyState(); saveState(); renderSetup(); return; }
    var sortedPlayers = state.players.slice().sort(function (a, b) { return b.position - a.position; });
    var effectsMarkup = state.activeEffects.length ? state.activeEffects.map(function (effect) { return '<div class="effect"><strong>' + html(effect.playerName) + '</strong><span>Casilla ' + effect.startedAtCell + ': ' + html(effect.text) + '</span></div>'; }).join('') : '<p>No hay efectos activos.</p>';
    var noticesMarkup = state.expiredNotices.map(function (notice) { return '<p class="notice">' + html(notice) + '</p>'; }).join('');
    var playersMarkup = sortedPlayers.map(function (player) { return '<div class="player"><span class="dot" style="background:' + player.color + '"></span><strong>' + html(player.name) + '</strong><meter min="1" max="' + TOTAL_CELLS + '" value="' + player.position + '"></meter><span>Casilla ' + player.position + '</span><span class="drink-count">Bebió: ' + (player.drinkCount || 0) + '</span></div>'; }).join('');
    var drinksSummaryMarkup = state.players.map(function (player) { return '<li><strong>' + html(player.name) + '</strong>: ' + (player.drinkCount || 0) + ' tragos</li>'; }).join('');
    var winnerModal = state.gameFinished ? '<div class="modal-backdrop" role="dialog" aria-modal="true"><div class="winner-modal"><h2>¡Felicidades, ' + html(state.winnerName) + '!</h2><p>Has llegado a la casilla 111 o la has sobrepasado. La partida ha terminado.</p><h3>Resumen de tragos</h3><ul class="drink-summary">' + drinksSummaryMarkup + '</ul><button class="danger modal-reset" id="modal-reset">REINICIAR</button></div></div>' : ''; 
    var cellsMarkup = '';
    for (var cellIndex = 0; cellIndex < TOTAL_CELLS; cellIndex += 1) {
      var boardCell = cellIndex + 1;
      var occupants = state.players.filter(function (player) { return player.position === boardCell; });
      cellsMarkup += '<div class="cell ' + (occupants.length ? 'occupied' : '') + '" title="' + html(miniGames[cellIndex]) + '"><span>' + boardCell + '</span>' + occupants.map(function (player) { return '<i style="background:' + player.color + '" title="' + html(player.name) + '"></i>'; }).join('') + '</div>';
    }
    byId('root').innerHTML = '<main class="app"><header class="topbar"><div><h1>Oca 111</h1><p class="turn-label">Turno de <strong>' + html(currentPlayer.name) + '</strong></p></div><button class="danger" id="reset">REINICIAR</button></header><section class="grid"><article class="card turn"><h2>Turno actual</h2><p class="position">Casilla ' + currentPlayer.position + ' / ' + TOTAL_CELLS + '</p><div class="mini-game-box"><strong>Minijuego actual</strong><p>' + html(miniGames[currentPlayer.position - 1]) + '</p></div>' + (state.diceMode === 'real' ? '<label>Resultado del dado real<input inputmode="numeric" id="real-roll" value="' + html(state.realRollInput) + '" placeholder="Ej. 5"/></label>' : '') + (error ? '<p class="error">' + html(error) + '</p>' : '') + '<div class="action-grid"><button class="drink-button square-action" id="drink">BEBER</button><button class="primary roll square-action" id="roll">' + (state.diceMode === 'virtual' ? 'Tirar dado' : 'Registrar tirada') + '</button></div>' + (state.lastRoll ? '<p>Última tirada: ' + state.lastRoll + '</p>' : '') + '</article><article class="card side-panel"><h2>Recordatorios de ronda</h2>' + effectsMarkup + noticesMarkup + '<div class="history-panel"><h2>Historial</h2><div class="history-scroll">' + state.log.map(function (item) { return '<p class="log">' + html(item) + '</p>'; }).join('') + '</div></div></article></section><section class="card"><h2>Posiciones y bebidas</h2><div class="players">' + playersMarkup + '</div></section><section class="card board"><h2>Tablero</h2><div class="cells">' + cellsMarkup + '</div></section>' + winnerModal + '</main>';
    byId('reset').addEventListener('click', resetGame);
    if (state.gameFinished) { byId('modal-reset').addEventListener('click', resetGame); return; }
    byId('roll').addEventListener('click', rollDice);
    byId('drink').addEventListener('click', registerDrink);
    var realRoll = byId('real-roll');
    if (realRoll) realRoll.addEventListener('input', function (event) { state.realRollInput = event.target.value; saveState(); });
  }


  function registerDrink() {
    if (state.gameFinished) return;
    var currentPlayer = state.players[state.currentPlayerIndex];
    state.players = state.players.map(function (player, playerIndex) {
      if (playerIndex !== state.currentPlayerIndex) return player;
      player.drinkCount = (player.drinkCount || 0) + 1;
      return player;
    });
    state.log = [currentPlayer.name + ' bebió. Total: ' + (currentPlayer.drinkCount || 0)].concat(state.log).slice(0, 30);
    saveState();
    render();
  }

  function rollDice() {
    if (state.gameFinished) return;
    var roll = state.diceMode === 'virtual' ? Math.floor(Math.random() * state.diceFaces) + 1 : Number(state.realRollInput);
    if (!Number.isInteger(roll) || roll < 1) { error = 'Ingresa un resultado válido del dado real.'; render(); return; }
    var player = state.players[state.currentPlayerIndex];
    var nextPosition = Math.min(TOTAL_CELLS, player.position + roll);
    var landedMiniGame = miniGames[nextPosition - 1];
    var completedEffects = state.activeEffects.filter(function (effect) { return effect.expiresAtTurnIndex === state.currentPlayerIndex; });
    var stillActive = state.activeEffects.filter(function (effect) { return effect.expiresAtTurnIndex !== state.currentPlayerIndex; });
    var newEffect = ROUND_EFFECT_CELLS.indexOf(nextPosition) !== -1 ? [{ id: uid(), playerId: player.id, playerName: player.name, text: landedMiniGame, startedAtCell: nextPosition, expiresAtTurnIndex: state.currentPlayerIndex }] : [];
    state.players = state.players.map(function (candidate, playerIndex) { return playerIndex === state.currentPlayerIndex ? { id: candidate.id, name: candidate.name, position: nextPosition, drinkCount: candidate.drinkCount || 0, color: candidate.color } : candidate; });
    if (nextPosition >= TOTAL_CELLS) {
      state.gameFinished = true;
      state.winnerName = player.name;
    }
    if (!state.gameFinished) state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
    state.lastRoll = roll;
    state.realRollInput = '';
    state.activeEffects = stillActive.concat(newEffect);
    state.expiredNotices = completedEffects.map(function (effect) { return 'El efecto de ' + effect.playerName + ' de la casilla ' + effect.startedAtCell + ' ya no tiene efecto.'; });
    state.log = [(state.gameFinished ? '🏆 ' : '') + player.name + ' sacó ' + roll + ', llegó a la casilla ' + nextPosition + ': ' + landedMiniGame].concat(state.log).slice(0, 30);
    error = '';
    saveState();
    render();
  }

  function resetGame() {
    if (window.confirm('¿Seguro que quieres REINICIAR la partida? Se borrará todo el avance guardado.')) {
      try { if (window.localStorage) window.localStorage.removeItem(STORAGE_KEY); } catch (resetError) {}
      state = cloneEmptyState();
      names = ['', ''];
      error = '';
      render();
    }
  }

  state = loadState();
  render();
}());
