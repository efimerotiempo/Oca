(function () {
  'use strict';

  var STORAGE_KEY = 'oca-game-state-v1';
  var TOTAL_CELLS = 111;
    var providedMiniGames = [
    'Tararea una canción hasta que los demás la adivinen o bebes.',
    'Enseña tus últimos 3 mensajes de la última conversación de whatsapp o bebe.',
    'Llama a la última persona que llamaste y dile que has perdido la cartera o bebe.',
    'Beben los solteros.',
    'ESCUDO: eres inmune al siguiente castigo.',
    'Casar matar o follar o bebe.',
    'Todos me dáis un besito en la mejilla, quien no quiera bebe.',
    'Di dos personas de los presentes que pegan como pareja o bebe.',
    'Habla solo con vocales durante una ronda entera, y si no lo consigues bebes.',
    'Llama a tu madre y dile que te han multado por exceso de velocidad y que no puedes coger el coche o bebe.',
    'Darle me gusta a una foto de hace mínimo 4 meses de alguien que sigas en instagram que decidan tus compañeros o bebes.',
    'TERREMOTO. Cambio de sitios.',
    'Cámbiate una prenda con el de tu derecha o bebéis los dos.',
    'Adivinar la película o bebes.',
    'Que te hagan una pregunta de cultura general, si no la aciertas bebes.',
    'DOBLE: el siguiente reto vale doble.',
    'Subir una historia que decidan tus compañeros y dejarla las 24h o bebes.',
    'Pon una norma durante una ronda entera.',
    '“¿Qué probabilidad hay de que…?”. Adivina la probabilidad, quien quede más lejos bebe.',
    'Todos beben menos tú.',
    'Di un trabalenguas hasta que lo digas bien o bebes.',
    'Durante una ronda entera, tienes que terminar todas las frases diciendo “mi rey”.',
    'Todos decimos un nombre de chico con la letra M y el que se quede sin ideas bebe.',
    'El último en tocar algo rojo bebe.',
    'Mándale a alguien un mensaje que contenga 3 palabras que elijan tus compañeros o bebe.',
    'Elige a alguien con quien hacer piedra papel o tijeras y el que pierda bebe.',
    '10 sentadillas/flexiones o bebes.',
    'CONGELADO: el primero que se mueva antes de que vuelvas a hablar bebe.',
    'Votación: Quién prefiere arriba y quién prefiere abajo. La minoría bebe.',
    'Reparte 3, 2 y 1 chupito en orden a los que creas que más han follado en su vida o bebes.',
    'Los demás eligen a quien le tocas el culo con los ojos cerrados. Si no adivinas bebes, y si no lo haces también.',
    'Elige la casilla en la que caer en un radio de 5 casillas.',
    'Bebe el último que haya vomitado por borracho.',
    'ESCUDO: eres inmune al siguiente castigo.',
    'Todos tiramos los dados. Quien saque 6 bebe.',
    'Copia al animal que te indique cada uno o bebe.',
    'Deja que el grupo elija una palabra prohibida. Si la dices durante una ronda entera, bebes.',
    'Di el abecedario al revés. Si te equivocas, bebes.',
    'Todos señalan al jugador que creen que cocina peor. El más votado bebe.',
    'MIMICA. Bebes cada vez que beba la tercera persona hacia tu derecha durante una ronda entera.',
    'Elige una categoría (frutas, películas, países...). Cada jugador dice una; quien falle bebe.',
    'Haz una imitación de un famoso. Si nadie lo adivina, bebes.',
    'Hazle un cumplido que pienses de verdad a alguien del grupo o bebe.',
    'No puedes decir "sí" ni "no" durante una ronda entera.',
    'Di en voz alta las últimas 3 búsquedas que hayas hecho en google o bebes.',
    'Di una mentira y una verdad sobre ti. Si la aciertan, bebes.',
    'Todos dicen una marca de algo (Moda, coches, moviles…). El primero que repita bebe.',
    '“¿Qué probabilidad hay de que…?”. Adivina la probabilidad, quien quede más lejos bebe.',
    'Di el nombre de 10 países en menos de 15 segundos o bebe.',
    'Cada vez que alguien mire su móvil mientras se juega a la Oca Borracha durante una ronda entera, bebe.',
    'Di el último capricho caro que te compraste o bebe.',
    'Todos señaláis a alguien. El que más dedos le señalen bebe.',
    'Que te hagan una pregunta de cultura general, si no la aciertas bebes.',
    'Durante una ronda entera, cada vez que alguien diga tu nombre tienes que levantarte/sentarte.',
    'Todos enseñan la última foto del carrete. El grupo vota la más rara, quien gane bebe.',
    'Di el nombre y el primer apellido de alguien de los presentes o bebe.',
    'Habla susurrando durante una ronda entera o bebe.',
    'Se te atan las manos tras la espalda durante una ronda entera.',
    'Di tres cosas que nunca harías por dinero o bebe.',
    'CONGELADO: el primero que se mueva antes de que vuelvas a hablar bebe.',
    'Enseña la foto más antigua que tengas en tu galería o bebe.',
    'Todos ponéis una mano en la mesa. El último en quitarla tira el dado y bebe lo que indique.',
    'Nadie puede cruzar las piernas durante una ronda entera. Quien lo haga bebe.',
    'Di el nombre de 8 animales en 10 segundos o bebe.',
    'Todos dicen un objeto que haya en una cocina. El primero que repita bebe.',
    'Di una palabra en inglés. El siguiente tiene que decir otra. El primero que falle bebe.',
    'Durante una ronda entera, el último en decir "salud" cuando alguien beba, bebe.',
    'Haz un dibujo en el aire y que lo adivinen o bebes.',
    'Durante una ronda entera tienes que hablar en tercera persona o bebes.',
    'Todos eligen en secreto piedra, papel o tijera. Quien pierda contra más personas bebe.',
    'Señalad quién sería mejor presidente. El elegido bebe.',
    'Elige un jugador. Debéis estar cogidos de la mano durante una ronda entera o ambos bebéis.',
    'REVERSA: devuelve el siguiente castigo al jugador que tú elijas.',
    'Mantén un objeto sobre la cabeza durante una ronda entera, si se te cae bebes.',
    'Elige una letra al azar con IA. Di 5 palabras que empiecen por ella en 10 segundos o bebe.',
    '“¿Qué probabilidad hay de que…?”. Adivina la probabilidad, quien quede más lejos bebe.',
    'Decid colores, quien repita uno bebe.',
    'Tienes 3 intentos para hacer un bottleflip, si no lo consigues bebes.',
    'Los demás eligen 3 palabras que tienes que deletrear. Por cada intento hasta conseguirlo bebes.',
    'Cada uno pone una mano encima del hombro de alguno de los que estén a su lado. Quien tenga dos manos en sus hombros bebe.',
    'Di tres cosas azules en menos de 5 segundos o bebes.',
    'IMPOSTOR. Durante una ronda entera tienes que colar una mentira. Si alguien la detecta, bebes. Al final de la partida cuentas la mentira.',
    'Repite las dos últimas palabras que diga cualquier jugador durante una ronda entera.',
    'Cuenta una manía que tengas o bebes.',
    'Elige una acción sencilla (rascarse la cabeza, aplaudir, toser...). Cada vez que tú la hagas durante una ronda entera, todos deben copiarte. El último en hacerlo bebe.',
    'Si adivinas el número que va a sacar el próximo jugador, eliges en qué casilla ponerle.Tienes 3 intentos.',
    'Juega tu siguiente turno junto con otro jugador. Compartís el castigo.',
    'Jugad a contar entre todos. Quienes coincidan diciendo el mismo número beben.',
    'Cierra los ojos. Alguien da una palmada. Adivina quién ha sido o bebes.',
    'MIMICA. Bebes cada vez que beba la tercera persona hacia tu derecha durante una ronda entera.',
    'Que te hagan una pregunta de cultura general, si no la aciertas bebes.',
    'Elige con quién hacer un pulso. Quien pierde bebe.',
    'Verdad o reto?',
    '“¿Qué probabilidad hay de que…?”. Intenta adivinar, quien quede más lejos bebe.',
    'A la de tres todos dicen un país. Si coincides con alguien, bebéis ambos.',
    'Durante una ronda entera, no se pueden usar nombres. Quien lo haga bebe.',
    'El más probable que desaparezca sin avisar bebe.',
    'Responde una pregunta con una sola palabra.',
    'Entre todos elegís un apodo para cada uno. Tienes que adivinar el apodo de cada uno. Si te equivocas bebes.',
    'Di cuántas flexiones puedes hacer. Si exageras y fallas, bebes.',
    'Dile a la IA que te haga una pregunta personal y elige quien responda por ti. Si falla bebes.',
    'Habla susurrando durante una ronda entera.',
    'Ordenaos por edad sin hablar. Si falláis bebéis todos.',
    'Con los ojos cerrados, poned un cronómetro de X minutos. Durante ese tiempo tenéis que conseguir aplaudir sin turnos y de uno en uno. Si coincidís bebéis los que coincidís y volvéis a empezar hasta conseguirlo.',
    'El resto del grupo te hacen una bebida mezclando 3 ingredientes de lo que les dé la gana. Si no lo pruebas vuelves a la casilla 1.',
    'Cada uno escribe un dato curioso sobre sí mismo. Se mezclan y tienes que adivinar de quién es cada uno. Por cada error es un trago.',
    'Inventa un nuevo deporte. Si la mayoría votan que sí lo practicarían te salvas.',
    'El que encuentre una moneda se salva. El resto bebe.',
    'Comparad el color de vuestra ropa interior. Si alguien coincide beben los dos.',
    'Debes hablar con la lengua fuera durante una ronda entera.'
  ];
  var miniGames = [];
  var emptyState = { setupDone: false, players: [], currentPlayerIndex: 0, diceMode: 'virtual', diceFaces: 6, realRollInput: '', lastRoll: null, turnRolled: false, diceModalOpen: false, log: [], activeEffects: [], pendingTurnReminders: [], expiredNotices: [], roundNotice: '', turnReminderNotice: '', detailPrompt: null, gameFinished: false, winnerName: '' };
  var state;
  var names = ['', ''];
  var setupDiceMode = 'virtual';
  var setupDiceFaces = 6;
  var error = '';
  var APP_VERSION = 'salida-cero-20260721';

  for (var index = 0; index < TOTAL_CELLS; index += 1) {
    if (providedMiniGames[index]) miniGames.push(providedMiniGames[index]);
    else if (index + 1 === TOTAL_CELLS) miniGames.push('Meta final: celebra tu llegada y cuenta tu mejor momento de la partida.');
    else miniGames.push('Casilla libre: inventad un reto rápido entre todos o bebed una vez.');
  }

  function isRoundEffect(miniGameText) {
    var text = miniGameText.toLowerCase();
    return text.indexOf('durante una ronda entera') !== -1 ||
      text.indexOf('durante toda la ronda') !== -1 ||
      text.indexOf('durante esta ronda') !== -1 ||
      text.indexOf('hasta tu siguiente turno') !== -1 ||
      text.indexOf('hasta tu próximo turno') !== -1 ||
      text.indexOf('hasta vuestro siguiente turno') !== -1 ||
      text.indexOf('hasta la siguiente ronda') !== -1 ||
      text.indexOf('antes de tu siguiente turno') !== -1;
  }


  function isNextTurnReminder(miniGameText) {
    return miniGameText === 'ESCUDO: eres inmune al siguiente castigo.' ||
      miniGameText === 'DOBLE: el siguiente reto vale doble.' ||
      miniGameText === 'REVERSA: devuelve el siguiente castigo al jugador que tú elijas.' ||
      miniGameText === 'Juega tu siguiente turno junto con otro jugador. Compartís el castigo.';
  }

  function getDetailPromptType(miniGameText) {
    if (miniGameText === 'Pon una norma durante una ronda entera.') return 'norma';
    if (miniGameText === 'Deja que el grupo elija una palabra prohibida. Si la dices durante una ronda entera, bebes.') return 'palabra prohibida';
    return '';
  }

  function showPendingTurnReminder() {
    var pending = state.pendingTurnReminders || [];
    var currentReminders = pending.filter(function (reminder) { return reminder.expiresAtTurnIndex === state.currentPlayerIndex; });
    if (!currentReminders.length || state.turnReminderNotice) return;
    state.pendingTurnReminders = pending.filter(function (reminder) { return reminder.expiresAtTurnIndex !== state.currentPlayerIndex; });
    state.turnReminderNotice = currentReminders.map(function (reminder) { return reminder.playerName + ': recuerda que tienes activo "' + reminder.text + '"'; }).join(' ');
    saveState();
  }

  function expireEffectsForCurrentTurn() {
    var completedEffects = state.activeEffects.filter(function (effect) { return effect.expiresAtTurnIndex === state.currentPlayerIndex; });
    if (!completedEffects.length) return;
    state.activeEffects = state.activeEffects.filter(function (effect) { return effect.expiresAtTurnIndex !== state.currentPlayerIndex; });
    var finishedMessages = completedEffects.map(function (effect) { return 'El efecto de ' + effect.playerName + ' de la casilla ' + effect.startedAtCell + ' ya no tiene efecto.'; });
    state.expiredNotices = [];
    state.roundNotice = finishedMessages.join(' ');
    saveState();
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
    state.players = cleanNames.map(function (name, playerIndex) { var colors = ['#ca8a04', '#a16207', '#854d0e', '#facc15', '#eab308', '#713f12']; return { id: uid(), name: name, position: 0, drinkCount: 0, color: colors[playerIndex % colors.length] }; });
    state.diceMode = setupDiceMode;
    state.diceFaces = setupDiceFaces;
    state.log = [];
    error = '';
    saveState();
    render();
  }

  function renderGame() {
    if (!state.gameFinished && !state.turnRolled && !state.diceModalOpen) { expireEffectsForCurrentTurn(); showPendingTurnReminder(); }
    var currentPlayer = state.players[state.currentPlayerIndex];
    if (!currentPlayer) { state = cloneEmptyState(); saveState(); renderSetup(); return; }
    var sortedPlayers = state.players.slice().sort(function (a, b) { return b.position - a.position; });
    var effectsMarkup = state.activeEffects.length ? state.activeEffects.map(function (effect) { return '<div class="effect"><strong>' + html(effect.playerName) + '</strong><span>Casilla ' + effect.startedAtCell + ': ' + html(effect.text) + '</span></div>'; }).join('') : '<p>No hay efectos activos.</p>';
    var noticesMarkup = state.expiredNotices.map(function (notice) { return '<p class="notice">' + html(notice) + '</p>'; }).join('');
    var drinksSummaryMarkup = state.players.map(function (player) { return '<li><strong>' + html(player.name) + '</strong>: ' + (player.drinkCount || 0) + ' tragos</li>'; }).join('');
    var winnerModal = state.gameFinished ? '<div class="modal-backdrop" role="dialog" aria-modal="true"><div class="winner-modal"><h2>¡Felicidades, ' + html(state.winnerName) + '!</h2><p>Has llegado a la casilla 111 o la has sobrepasado. La partida ha terminado.</p><h3>Resumen de tragos</h3><ul class="drink-summary">' + drinksSummaryMarkup + '</ul><button class="danger modal-reset" id="modal-reset">REINICIAR</button></div></div>' : '';
    var roundNoticeModal = state.roundNotice ? '<button class="round-notice-modal" id="round-notice" aria-label="Cerrar aviso de ronda">' + html(state.roundNotice) + '</button>' : '';
    var turnReminderModal = state.turnReminderNotice ? '<button class="round-notice-modal" id="turn-reminder" aria-label="Cerrar recordatorio">' + html(state.turnReminderNotice) + '</button>' : '';
    var detailPromptModal = state.detailPrompt ? '<div class="modal-backdrop dice-backdrop" role="dialog" aria-modal="true"><form class="dice-modal detail-modal" id="detail-form"><label>Escribe la ' + html(state.detailPrompt.type) + '<input id="detail-input" required placeholder="Escribe aquí"/></label><button class="primary">Guardar</button></form></div>' : '';
    var diceModal = state.diceModalOpen ? '<div class="modal-backdrop dice-backdrop" role="dialog" aria-modal="true"><div class="dice-modal"><button class="dice-face" id="dice-face" aria-label="Tirar dado">⚂</button>' + (state.diceMode === 'real' ? '<label>Resultado del dado real<input inputmode="numeric" id="modal-real-roll" placeholder="Ej. 5"/></label>' : '<p>Toca el dado para tirar.</p>') + '</div></div>' : ''; 
    var cellsMarkup = '';
    for (var cellIndex = 0; cellIndex <= TOTAL_CELLS; cellIndex += 1) {
      var boardCell = cellIndex;
      var occupants = state.players.filter(function (player) { return player.position === boardCell; });
      cellsMarkup += '<div class="cell ' + (occupants.length ? 'occupied' : '') + '" title="' + html(boardCell === 0 ? 'Salida' : miniGames[cellIndex - 1]) + '"><span>' + (boardCell === 0 ? '0' : boardCell) + '</span>' + occupants.map(function (player) { return '<b class="occupant">' + html(player.name) + ' · ' + (player.drinkCount || 0) + '</b>'; }).join('') + '</div>';
    }
    byId('root').innerHTML = '<main class="app"><header class="topbar"><div><h1>Oca 111</h1><p class="turn-label">Turno de <strong>' + html(currentPlayer.name) + '</strong></p></div><button class="danger" id="reset">REINICIAR</button></header><section class="grid"><article class="card side-panel">' + effectsMarkup + noticesMarkup + '</article><article class="card turn"><div class="mini-game-box"><p>' + (state.turnRolled ? html(currentPlayer.position === 0 ? 'Pulsa DADO para tirar y descubrir el minijuego de este turno.' : miniGames[currentPlayer.position - 1]) : 'Pulsa DADO para tirar y descubrir el minijuego de este turno.') + '</p></div>' + (error ? '<p class="error">' + html(error) + '</p>' : '') + '<div class="action-grid"><button class="drink-button square-action" id="drink">BEBER</button><button class="primary roll square-action" id="roll">DADO</button></div>' + (state.turnRolled && state.lastRoll ? '<p>Última tirada: ' + state.lastRoll + '</p>' : '') + '</article></section><section class="card board"><div class="cells">' + cellsMarkup + '</div></section>' + winnerModal + roundNoticeModal + turnReminderModal + detailPromptModal + diceModal + '</main>';
    byId('reset').addEventListener('click', resetGame);
    if (state.roundNotice) byId('round-notice').addEventListener('click', dismissRoundNotice);
    if (state.turnReminderNotice) byId('turn-reminder').addEventListener('click', dismissTurnReminder);
    if (state.detailPrompt) byId('detail-form').addEventListener('submit', saveDetailPrompt);
    if (state.gameFinished) { byId('modal-reset').addEventListener('click', resetGame); return; }
    if (state.diceModalOpen) byId('dice-face').addEventListener('click', rollDice);
    byId('roll').addEventListener('click', openDiceFlow);
    byId('drink').addEventListener('click', registerDrink);
  }


  function dismissRoundNotice() {
    state.roundNotice = '';
    saveState();
    render();
  }

  function dismissTurnReminder() {
    state.turnReminderNotice = '';
    saveState();
    render();
  }

  function saveDetailPrompt(event) {
    event.preventDefault();
    var value = byId('detail-input').value.trim();
    if (!value) return;
    var prompt = state.detailPrompt;
    state.activeEffects = state.activeEffects.map(function (effect) {
      if (effect.id !== prompt.effectId) return effect;
      return { id: effect.id, playerId: effect.playerId, playerName: effect.playerName, text: effect.text + ' (' + prompt.type + ': ' + value + ')', startedAtCell: effect.startedAtCell, expiresAtTurnIndex: effect.expiresAtTurnIndex };
    });
    state.detailPrompt = null;
    saveState();
    render();
  }

  function registerDrink() {
    if (state.gameFinished) return;
    var currentPlayer = state.players[state.currentPlayerIndex];
    state.players = state.players.map(function (player, playerIndex) {
      if (playerIndex !== state.currentPlayerIndex) return player;
      player.drinkCount = (player.drinkCount || 0) + 1;
      return player;
    });
    saveState();
    render();
  }

  function openDiceFlow() {
    if (state.gameFinished) return;
    if (state.turnRolled) {
      state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
      state.turnRolled = false;
      state.lastRoll = null;
      state.realRollInput = '';
      expireEffectsForCurrentTurn();
    }
    state.diceModalOpen = !state.roundNotice && !state.turnReminderNotice;
    saveState();
    render();
  }

  function rollDice() {
    if (state.gameFinished || !state.diceModalOpen) return;
    var realInput = byId('modal-real-roll');
    var roll = state.diceMode === 'virtual' ? Math.floor(Math.random() * state.diceFaces) + 1 : Number(realInput ? realInput.value : state.realRollInput);
    if (!Number.isInteger(roll) || roll < 1) { error = 'Ingresa un resultado válido del dado real.'; render(); return; }
    var player = state.players[state.currentPlayerIndex];
    var nextPosition = Math.min(TOTAL_CELLS, player.position + roll);
    var landedMiniGame = miniGames[nextPosition - 1];
    var stillActive = state.activeEffects.slice();
    var effectId = uid();
    var newEffect = isRoundEffect(landedMiniGame) ? [{ id: effectId, playerId: player.id, playerName: player.name, text: landedMiniGame, startedAtCell: nextPosition, expiresAtTurnIndex: state.currentPlayerIndex }] : [];
    state.players = state.players.map(function (candidate, playerIndex) { return playerIndex === state.currentPlayerIndex ? { id: candidate.id, name: candidate.name, position: nextPosition, drinkCount: candidate.drinkCount || 0, color: candidate.color } : candidate; });
    if (nextPosition >= TOTAL_CELLS) {
      state.gameFinished = true;
      state.winnerName = player.name;
    }
    state.lastRoll = roll;
    state.turnRolled = true;
    state.diceModalOpen = false;
    state.realRollInput = '';
    state.activeEffects = stillActive.concat(newEffect);
    if (isNextTurnReminder(landedMiniGame)) {
      state.pendingTurnReminders = (state.pendingTurnReminders || []).concat([{ id: uid(), playerId: player.id, playerName: player.name, text: landedMiniGame, expiresAtTurnIndex: state.currentPlayerIndex }]);
    }
    var detailType = getDetailPromptType(landedMiniGame);
    if (detailType && newEffect.length) state.detailPrompt = { effectId: effectId, type: detailType };
    state.expiredNotices = [];
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
