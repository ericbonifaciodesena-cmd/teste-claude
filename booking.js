/* ============================================================
   SOORA BUBBLE — booking.js
   Sistema de reservas configurável. Sem dependências externas.

   COMO EDITAR:
   ► Altere BOOKING_CONFIG para ajustar preços e datas.
   ► Altere ACOMODACOES para adicionar/remover comodidades.
   ============================================================ */

/* ============================================================
   ██████  CONFIGURAÇÕES — EDITE AQUI  ██████
   ============================================================ */

const BOOKING_CONFIG = {
  // ── Preços ──────────────────────────────────────────────
  // Valor em reais por noite (segunda a quinta-feira)
  valorDiariaBase: 700,

  // Valor em reais por noite (sexta, sábado e domingo)
  valorDiariaFimDeSemana: 900,

  // Estadia mínima em noites
  minimoNoites: 1,

  // ── Datas indisponíveis ──────────────────────────────────
  // Formato: "YYYY-MM-DD"
  // Adicione ou remova datas conforme a ocupação real.
  // Datas neste array ficam bloqueadas no calendário.
  datasIndisponiveis: [
    '2026-04-25',
    '2026-04-26',
    '2026-05-01',
    '2026-05-02',
    '2026-05-03',
    '2026-05-23',
    '2026-05-24',
    '2026-06-12',
    '2026-06-13',
    '2026-06-20',
    '2026-06-21',
  ],
};

/* ============================================================
   ██████  ACOMODAÇÕES — EDITE AQUI  ██████
   Para adicionar uma nova comodidade, copie um objeto do array
   e preencha: icon (SVG string), titulo e descricao.
   ============================================================ */

const ACOMODACOES = [
  {
    id: 'bolha',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="M7 9a5 5 0 0 1 5-3"/>
      <path d="M17 15a5 5 0 0 1-5 3"/>
    </svg>`,
    titulo: 'Bubble Transparente',
    descricao: 'Durma sob um céu estrelado e desperte cercado pela Mata Atlântica, com conforto e privacidade.',
  },
  {
    id: 'cama',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 16h20M7 8v8"/>
    </svg>`,
    titulo: 'Cama Premium na Floresta',
    descricao: 'Cama de casal com colchão premium e roupa de cama de alta qualidade. Adormeça olhando para as estrelas através do teto transparente.',
  },
  {
    id: 'jacuzzi',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 16 0"/>
      <path d="M2 12h20"/>
      <path d="M6 12v4a6 6 0 0 0 12 0v-4"/>
      <path d="M8 7c0-1.1.9-2 2-2s2 .9 2 2"/>
      <path d="M14 5c0-1.1.9-2 2-2"/>
    </svg>`,
    titulo: 'Jacuzzi Aquecida',
    descricao: 'Banheira de hidromassagem aquecida ao ar livre com vista para a mata. Relaxe com o som da floresta ao redor.',
  },
  {
    id: 'firepit',
    icon: `<img src="MASHMALLOW@300x-8.png" alt="Fogueira com marshmallow" width="28" height="28" style="object-fit:contain;" />`,
    titulo: 'Firepit com Marshmallow',
    descricao: 'Fogueira a céu aberto para aquecer as noites frias da mata. Marshmallow cortesia da casa para assar junto ao fogo.',
  },
  {
    id: 'rede',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <path d="M3 17c5-2 13-2 18 0"/>
      <path d="M3 7c5 2 13 2 18 0"/>
      <path d="M3 7c0 4 0 6 0 10"/>
      <path d="M21 7c0 4 0 6 0 10"/>
      <path d="M3 17c2-3 3-6 3-10"/>
      <path d="M21 17c-2-3-3-6-3-10"/>
    </svg>`,
    titulo: 'Rede Suspensa na Mata',
    descricao: 'Rede aérea estendida entre as árvores sobre a floresta. O lugar perfeito para ler, meditar ou simplesmente existir.',
  },
  {
    id: 'cafe',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="1" x2="6" y2="4"/>
      <line x1="10" y1="1" x2="10" y2="4"/>
      <line x1="14" y1="1" x2="14" y2="4"/>
    </svg>`,
    titulo: 'Café da Manhã',
    descricao: 'Comece o dia com um café da manhã completo, servido na privacidade da sua bubble. Pães, frutas, bebidas e uma seleção de itens preparados para tornar o despertar ainda mais especial.',
  },
];

/* ============================================================
   LÓGICA INTERNA — não é necessário editar abaixo desta linha
   ============================================================ */

(function () {
  'use strict';

  /* ── RENDER DAS ACOMODAÇÕES ── */
  function renderAcomodacoes() {
    const grid = document.getElementById('acomodacoesGrid');
    if (!grid) return;

    grid.innerHTML = ACOMODACOES.map((item, i) => `
      <article class="acomodo-card reveal-item" style="transition-delay:${i * 0.08}s">
        <div class="acomodo-card__icon">${item.icon}</div>
        <h3 class="acomodo-card__titulo">${item.titulo}</h3>
        <p class="acomodo-card__desc">${item.descricao}</p>
      </article>
    `).join('');

    // Registra os novos cards para scroll-reveal
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        }),
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      grid.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));
    } else {
      grid.querySelectorAll('.reveal-item').forEach(el => el.classList.add('visible'));
    }
  }

  /* ── CALENDÁRIO ── */

  // Estado do booking
  const state = {
    currentStep: 1,
    viewDate: new Date(), // mês visualizado
    checkIn: null,        // Date object
    checkOut: null,       // Date object
    selecting: 'checkin', // qual data estamos selecionando
    guest: {},
  };

  // Converte "YYYY-MM-DD" → Date local (sem fuso)
  function parseDate(str) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  // Formata Date → "YYYY-MM-DD"
  function fmtISO(date) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-');
  }

  // Formata Date → "DD/MM/YYYY"
  function fmtBR(date) {
    return [
      String(date.getDate()).padStart(2, '0'),
      String(date.getMonth() + 1).padStart(2, '0'),
      date.getFullYear(),
    ].join('/');
  }

  // Formata Date → "Dom, 15 mai"
  function fmtShort(date) {
    const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    return `${dias[date.getDay()]}, ${date.getDate()} ${meses[date.getMonth()]}`;
  }

  const unavailSet = new Set(BOOKING_CONFIG.datasIndisponiveis);

  function isUnavailable(date) {
    return unavailSet.has(fmtISO(date));
  }

  function isPast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }

  function isWeekend(date) {
    const d = date.getDay();
    return d === 0 || d === 5 || d === 6; // domingo, sexta ou sábado
  }

  // Verifica se há alguma data indisponível no range
  function rangeHasUnavailable(from, to) {
    const cur = new Date(from);
    cur.setDate(cur.getDate() + 1); // o check-in em si pode ser qualquer dia
    while (cur < to) {
      if (isUnavailable(cur)) return true;
      cur.setDate(cur.getDate() + 1);
    }
    return false;
  }

  // Calcula preço total entre check-in e check-out
  function calcPrice(from, to) {
    let total = 0;
    let nights = 0;
    let nightsWeekend = 0;
    let nightsWeek = 0;
    const cur = new Date(from);

    while (cur < to) {
      if (isWeekend(cur)) {
        total += BOOKING_CONFIG.valorDiariaFimDeSemana;
        nightsWeekend++;
      } else {
        total += BOOKING_CONFIG.valorDiariaBase;
        nightsWeek++;
      }
      nights++;
      cur.setDate(cur.getDate() + 1);
    }
    return { total, nights, nightsWeekend, nightsWeek };
  }

  // Renderiza o calendário para o mês em state.viewDate
  function renderCalendar() {
    const container = document.getElementById('calendarContainer');
    if (!container) return;

    const year  = state.viewDate.getFullYear();
    const month = state.viewDate.getMonth();

    const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                   'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const DIAS_NOME = ['D','S','T','Q','Q','S','S'];

    // Primeiro dia da semana do mês
    const firstDay = new Date(year, month, 1).getDay();
    // Total de dias no mês
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Não permite navegar para meses passados
    const today = new Date();
    today.setHours(0,0,0,0);
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

    // Gera células dos dias
    let cellsHTML = DIAS_NOME.map(d => `<span class="calendar-day-name">${d}</span>`).join('');

    // Células vazias antes do dia 1
    for (let i = 0; i < firstDay; i++) {
      cellsHTML += `<span class="cal-day empty" aria-hidden="true"></span>`;
    }

    // Células dos dias
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const iso  = fmtISO(date);
      let classes = 'cal-day';
      let ariaLabel = `${d} de ${MESES[month]}`;
      let ariaDisabled = 'false';

      const isCheckoutSelected = state.checkOut && fmtISO(state.checkOut) === iso;

      if (isPast(date)) {
        classes += ' past';
        ariaDisabled = 'true';
        ariaLabel += ' — passado';
      } else if (isCheckoutSelected) {
        // Checkout selecionado — mostra como tal mesmo se a data estiver bloqueada
        classes += ' checkout';
        ariaLabel += ' — check-out selecionado';
      } else if (isUnavailable(date)) {
        // Permite selecionar como checkout se o check-in já foi escolhido e a data é posterior
        const canBeCheckout = state.selecting === 'checkout' && state.checkIn && date > state.checkIn;
        if (canBeCheckout) {
          classes += ' unavailable-checkout';
          ariaLabel += ' — indisponível para check-in';
        } else {
          classes += ' unavailable';
          ariaDisabled = 'true';
          ariaLabel += ' — indisponível';
        }
      } else {
        // Check-in selecionado
        if (state.checkIn && fmtISO(state.checkIn) === iso) {
          classes += ' checkin';
          ariaLabel += ' — check-in selecionado';
        }
        // Range intermediário
        if (
          state.checkIn && state.checkOut &&
          date > state.checkIn && date < state.checkOut
        ) {
          classes += ' in-range';
        }
      }

      cellsHTML += `
        <button
          class="${classes}"
          data-date="${iso}"
          aria-label="${ariaLabel}"
          aria-disabled="${ariaDisabled}"
          tabindex="${ariaDisabled === 'true' ? -1 : 0}"
        >${d}</button>
      `;
    }

    container.innerHTML = `
      <div class="calendar" role="grid" aria-label="${MESES[month]} ${year}">
        <div class="calendar-header">
          <button class="calendar-nav-btn" id="calPrev" aria-label="Mês anterior" ${isCurrentMonth ? 'disabled' : ''}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span class="calendar-month-label">${MESES[month]} ${year}</span>
          <button class="calendar-nav-btn" id="calNext" aria-label="Próximo mês">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
        <div class="calendar-grid" role="rowgroup">
          ${cellsHTML}
        </div>
      </div>
    `;

    // Eventos de navegação
    document.getElementById('calPrev').addEventListener('click', () => {
      state.viewDate = new Date(year, month - 1, 1);
      renderCalendar();
    });
    document.getElementById('calNext').addEventListener('click', () => {
      state.viewDate = new Date(year, month + 1, 1);
      renderCalendar();
    });

    // Cliques nos dias
    container.querySelectorAll('.cal-day:not(.past):not(.unavailable):not(.empty)').forEach(btn => {
      btn.addEventListener('click', () => selectDate(new Date(btn.dataset.date + 'T00:00:00')));
    });
    container.querySelectorAll('.cal-day.unavailable-checkout').forEach(btn => {
      btn.addEventListener('click', () => selectCheckout(new Date(btn.dataset.date + 'T00:00:00')));
    });

    // Força células quadradas após layout completo
    setTimeout(function() {
      var grid = container.querySelector('.calendar-grid');
      if (!grid) return;
      var w = Math.floor(grid.getBoundingClientRect().width / 7);
      if (w > 0) {
        container.querySelectorAll('.cal-day').forEach(function(d) {
          d.style.height = w + 'px';
        });
      }
    }, 100);
  }

  // Seleciona diretamente como checkout (usado em datas bloqueadas para check-in)
  function selectCheckout(date) {
    if (!state.checkIn || date <= state.checkIn) return;
    const { nights } = calcPrice(state.checkIn, date);
    if (nights < BOOKING_CONFIG.minimoNoites) {
      alert(`A estadia mínima é de ${BOOKING_CONFIG.minimoNoites} noite(s).`);
      return;
    }
    if (rangeHasUnavailable(state.checkIn, date)) {
      alert('Existe uma data indisponível dentro do período selecionado. Por favor, escolha outro período.');
      return;
    }
    state.checkOut  = date;
    state.selecting = 'checkin';
    updateDateBoxes();
    updatePricePreview();
    updateStep1Button();
    renderCalendar();
    document.getElementById('checkinBox').classList.remove('active-input');
    document.getElementById('checkoutBox').classList.remove('active-input');
  }

  // Lida com a seleção de uma data no calendário
  function selectDate(date) {
    if (state.selecting === 'checkin' || !state.checkIn) {
      // Primeiro clique = check-in
      state.checkIn    = date;
      state.checkOut   = null;
      state.selecting  = 'checkout';
      updateDateBoxes();
      updatePricePreview();
      updateStep1Button();
      renderCalendar();
      document.getElementById('checkoutBox').classList.add('active-input');
      document.getElementById('checkinBox').classList.remove('active-input');

    } else {
      // Segundo clique = check-out
      if (date <= state.checkIn) {
        // Clicou em data anterior ao check-in → reinicia
        state.checkIn   = date;
        state.checkOut  = null;
        state.selecting = 'checkout';
        updateDateBoxes();
        updatePricePreview();
        updateStep1Button();
        renderCalendar();
        return;
      }

      // Verifica estadia mínima
      const { nights } = calcPrice(state.checkIn, date);
      if (nights < BOOKING_CONFIG.minimoNoites) {
        alert(`A estadia mínima é de ${BOOKING_CONFIG.minimoNoites} noite(s).`);
        return;
      }

      // Verifica se há datas indisponíveis no range
      if (rangeHasUnavailable(state.checkIn, date)) {
        alert('Existe uma data indisponível dentro do período selecionado. Por favor, escolha outro período.');
        return;
      }

      state.checkOut  = date;
      state.selecting = 'checkin';
      updateDateBoxes();
      updatePricePreview();
      updateStep1Button();
      renderCalendar();
      document.getElementById('checkinBox').classList.remove('active-input');
      document.getElementById('checkoutBox').classList.remove('active-input');
    }
  }

  function updateDateBoxes() {
    const checkinText  = document.getElementById('checkinText');
    const checkoutText = document.getElementById('checkoutText');
    checkinText.textContent  = state.checkIn  ? fmtShort(state.checkIn)  : 'Selecionar';
    checkoutText.textContent = state.checkOut ? fmtShort(state.checkOut) : 'Selecionar';
  }

  function updatePricePreview() {
    const preview   = document.getElementById('pricePreview');
    const breakdown = document.getElementById('priceBreakdown');
    const totalEl   = document.getElementById('priceTotal');

    if (state.checkIn && state.checkOut) {
      const { total, nights, nightsWeekend, nightsWeek } = calcPrice(state.checkIn, state.checkOut);
      let parts = [];
      if (nightsWeek > 0)
        parts.push(`${nightsWeek} noite${nightsWeek > 1 ? 's' : ''} × R$ ${BOOKING_CONFIG.valorDiariaBase.toLocaleString('pt-BR')}`);
      if (nightsWeekend > 0)
        parts.push(`${nightsWeekend} noite${nightsWeekend > 1 ? 's' : ''} × R$ ${BOOKING_CONFIG.valorDiariaFimDeSemana.toLocaleString('pt-BR')} (fim de semana)`);
      breakdown.textContent = parts.join(' + ');
      totalEl.textContent   = `R$ ${total.toLocaleString('pt-BR')}`;
      preview.hidden = false;
    } else {
      preview.hidden = true;
    }
  }

  function updateStep1Button() {
    const btn = document.getElementById('step1Next');
    if (btn) btn.disabled = !(state.checkIn && state.checkOut);
  }

  /* ── CONTROLE DE PASSOS ── */

  function goToStep(n) {
    // Oculta todos os painéis
    document.querySelectorAll('.booking-panel').forEach(p => {
      p.classList.remove('booking-panel--active');
    });

    // Mostra o painel alvo
    const panel = n === 'success'
      ? document.getElementById('stepSuccess')
      : document.getElementById(`step${n}`);
    if (panel) panel.classList.add('booking-panel--active');

    // Atualiza indicadores de passo
    document.querySelectorAll('.step').forEach(s => {
      const sn = Number(s.dataset.step);
      s.classList.remove('step--active', 'step--done');
      if (typeof n === 'number') {
        if (sn === n) s.classList.add('step--active');
        if (sn < n)  s.classList.add('step--done');
      }
    });

    state.currentStep = n;

    // Scrolla até a seção de reservas suavemente
    const section = document.getElementById('reservas');
    if (section) {
      const offset = document.getElementById('navbar').offsetHeight + 16;
      window.scrollTo({ top: section.offsetTop - offset, behavior: 'smooth' });
    }
  }

  /* ── VALIDAÇÃO DO FORM ── */
  function validateGuestForm() {
    const name  = document.getElementById('guestName');
    const email = document.getElementById('guestEmail');
    const phone = document.getElementById('guestPhone');
    let valid = true;

    function setError(input, errorId, msg) {
      const el = document.getElementById(errorId);
      if (!input.value.trim() || (msg && !validateField(input, msg))) {
        input.classList.add('invalid');
        el.textContent = msg || 'Campo obrigatório.';
        valid = false;
      } else {
        input.classList.remove('invalid');
        el.textContent = '';
      }
    }

    function validateField(input, msg) {
      if (input.type === 'email') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      }
      if (input.type === 'tel') {
        return input.value.replace(/\D/g,'').length >= 10;
      }
      return !!input.value.trim();
    }

    // Nome
    if (!name.value.trim()) {
      name.classList.add('invalid');
      document.getElementById('errorName').textContent = 'Nome é obrigatório.';
      valid = false;
    } else {
      name.classList.remove('invalid');
      document.getElementById('errorName').textContent = '';
    }

    // Email
    if (!email.value.trim()) {
      email.classList.add('invalid');
      document.getElementById('errorEmail').textContent = 'E-mail é obrigatório.';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.classList.add('invalid');
      document.getElementById('errorEmail').textContent = 'E-mail inválido.';
      valid = false;
    } else {
      email.classList.remove('invalid');
      document.getElementById('errorEmail').textContent = '';
    }

    // Telefone
    if (!phone.value.trim()) {
      phone.classList.add('invalid');
      document.getElementById('errorPhone').textContent = 'Telefone é obrigatório.';
      valid = false;
    } else if (phone.value.replace(/\D/g,'').length < 10) {
      phone.classList.add('invalid');
      document.getElementById('errorPhone').textContent = 'Telefone incompleto.';
      valid = false;
    } else {
      phone.classList.remove('invalid');
      document.getElementById('errorPhone').textContent = '';
    }

    return valid;
  }

  /* ── RESUMO DA RESERVA ── */
  function renderSummary() {
    const container = document.getElementById('bookingSummary');
    if (!container) return;

    const { total, nights } = calcPrice(state.checkIn, state.checkOut);

    const rows = [
      { label: 'Check-in',   value: fmtBR(state.checkIn) },
      { label: 'Check-out',  value: fmtBR(state.checkOut) },
      { label: 'Estadia',    value: `${nights} noite${nights > 1 ? 's' : ''}` },
      { label: 'Hóspedes',   value: document.getElementById('guestGuests').value + ' pessoa(s)' },
      { label: 'Nome',       value: document.getElementById('guestName').value },
      { label: 'E-mail',     value: document.getElementById('guestEmail').value },
      { label: 'WhatsApp',   value: document.getElementById('guestPhone').value },
    ];

    const notes = document.getElementById('guestNotes').value.trim();
    if (notes) rows.push({ label: 'Observações', value: notes });

    container.innerHTML = `
      ${rows.map(r => `
        <div class="summary-row">
          <span>${r.label}</span>
          <strong>${r.value}</strong>
        </div>
      `).join('')}
      <div class="summary-row summary-row--total">
        <span>Total</span>
        <strong>R$ ${total.toLocaleString('pt-BR')}</strong>
      </div>
    `;
  }

  /* ── CONFIRMAÇÃO FINAL ── */
  function submitBooking() {
    const { total, nights } = calcPrice(state.checkIn, state.checkOut);
    const name    = document.getElementById('guestName').value;
    const email   = document.getElementById('guestEmail').value;
    const phone   = document.getElementById('guestPhone').value;
    const guests  = document.getElementById('guestGuests').value;
    const notes   = document.getElementById('guestNotes').value.trim();

    const msg = [
      `Olá! Gostaria de reservar uma experiência na Sora Bubble. 🌿`,
      ``,
      `*Check-in:* ${fmtBR(state.checkIn)}`,
      `*Check-out:* ${fmtBR(state.checkOut)}`,
      `*Estadia:* ${nights} noite${nights > 1 ? 's' : ''}`,
      `*Hóspedes:* ${guests} pessoa(s)`,
      ``,
      `*Nome:* ${name}`,
      `*E-mail:* ${email}`,
      `*Telefone:* ${phone}`,
      ``,
      `*Total estimado:* R$ ${total.toLocaleString('pt-BR')}`,
      notes ? `\n*Observações:* ${notes}` : '',
    ].filter(l => l !== undefined && !(l === '' && false)).join('\n');

    const waUrl = `https://wa.me/5548984484135?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');

    goToStep('success');
  }

  /* ── INICIALIZAÇÃO ── */
  function init() {
    renderAcomodacoes();

    // Garante que o mês inicial nunca seja passado
    const now = new Date();
    state.viewDate = new Date(now.getFullYear(), now.getMonth(), 1);

    renderCalendar();
    updateDateBoxes();

    // Carrega datas bloqueadas do Airbnb (via disponibilidade.json)
    fetch('disponibilidade.json?v=' + Date.now())
      .then(function (r) { return r.json(); })
      .then(function (data) {
        (data.bloqueados || []).forEach(function (range) {
          var cur = new Date(range.inicio + 'T00:00:00');
          var end = new Date(range.fim    + 'T00:00:00');
          while (cur <= end) {
            unavailSet.add(fmtISO(cur));
            cur.setDate(cur.getDate() + 1);
          }
        });
        renderCalendar();
      })
      .catch(function () {});

    // Clique no box de check-in
    document.getElementById('checkinBox').addEventListener('click', () => {
      state.checkIn   = null;
      state.checkOut  = null;
      state.selecting = 'checkin';
      updateDateBoxes();
      updatePricePreview();
      updateStep1Button();
      renderCalendar();
      document.getElementById('checkinBox').classList.add('active-input');
      document.getElementById('checkoutBox').classList.remove('active-input');
    });

    // Clique no box de check-out
    document.getElementById('checkoutBox').addEventListener('click', () => {
      if (state.checkIn) {
        state.checkOut  = null;
        state.selecting = 'checkout';
        renderCalendar();
        document.getElementById('checkoutBox').classList.add('active-input');
        document.getElementById('checkinBox').classList.remove('active-input');
      }
    });

    // Step 1 → 2
    document.getElementById('step1Next').addEventListener('click', () => {
      if (state.checkIn && state.checkOut) goToStep(2);
    });

    // Step 2: voltar
    document.getElementById('step2Back').addEventListener('click', () => goToStep(1));

    // Step 2: avançar
    document.getElementById('step2Next').addEventListener('click', () => {
      if (validateGuestForm()) {
        state.guest = {
          name:   document.getElementById('guestName').value,
          email:  document.getElementById('guestEmail').value,
          phone:  document.getElementById('guestPhone').value,
          guests: document.getElementById('guestGuests').value,
          notes:  document.getElementById('guestNotes').value,
        };
        renderSummary();
        goToStep(3);
      }
    });

    // Step 3: voltar
    document.getElementById('step3Back').addEventListener('click', () => goToStep(2));

    // Termos → habilita botão confirmar
    document.getElementById('termsCheck').addEventListener('change', function () {
      document.getElementById('step3Confirm').disabled = !this.checked;
    });

    // Confirmar reserva
    document.getElementById('step3Confirm').addEventListener('click', submitBooking);

    // Máscara leve no telefone
    const phoneInput = document.getElementById('guestPhone');
    phoneInput.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) {
        v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      } else if (v.length > 2) {
        v = `(${v.slice(0,2)}) ${v.slice(2)}`;
      } else if (v.length > 0) {
        v = `(${v}`;
      }
      this.value = v;
    });
  }

  // Aguarda DOM pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
