/* ==========================================================================
   dashboard.js — "Meu Progresso": radar, distribuicao, prioridades, missoes.
   Graficos em SVG puro, sem bibliotecas externas.
   ========================================================================== */

const Dashboard = (() => {

  function radarSVG(groups) {
    const size = 320;
    const center = size / 2;
    const maxR = 120;
    const levels = 4;
    const n = groups.length;
    const angleStep = (Math.PI * 2) / n;

    function pointFor(i, value) {
      const angle = -Math.PI / 2 + i * angleStep;
      const r = (value / levels) * maxR;
      return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
    }

    // grade de fundo (niveis 1..4)
    let gridPolys = "";
    for (let lvl = 1; lvl <= levels; lvl++) {
      const pts = groups.map((g, i) => pointFor(i, lvl).join(",")).join(" ");
      gridPolys += `<polygon points="${pts}" class="radar-grid" />`;
    }

    // eixos
    let axes = "";
    groups.forEach((g, i) => {
      const [x, y] = pointFor(i, levels);
      axes += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" class="radar-axis" />`;
    });

    // labels
    let labels = "";
    groups.forEach((g, i) => {
      const [x, y] = pointFor(i, levels * 1.22);
      labels += `<text x="${x}" y="${y}" class="radar-label" text-anchor="middle" dominant-baseline="middle">${g.group}</text>`;
    });

    // area de dados
    const dataPts = groups.map((g, i) => pointFor(i, g.avg || 0).join(",")).join(" ");

    return `
      <svg viewBox="0 0 ${size} ${size}" class="radar-svg" role="img" aria-label="Radar de competências por área">
        ${gridPolys}
        ${axes}
        <polygon points="${dataPts}" class="radar-data" />
        ${labels}
      </svg>
    `;
  }

  function distributionBars(counts, total) {
    return appData.levels.map(l => {
      const n = counts[l.id] || 0;
      const pct = total ? Math.round((n / total) * 100) : 0;
      return `
        <div class="dist-row">
          <span class="dist-row__label">${l.label}</span>
          <div class="dist-row__track"><div class="dist-row__fill level-${l.id}" style="width:${pct}%"></div></div>
          <span class="dist-row__value">${n}</span>
        </div>
      `;
    }).join("");
  }

  function render() {
    const answers = Storage.getAnswers();
    const { counts, answered, total } = Feedback.stats(answers);
    const groups = Feedback.byRadarGroup(answers);
    const cats = Feedback.byCategory(answers).filter(c => c.answeredCount > 0);
    const strengths = [...cats].sort((a, b) => b.avg - a.avg).slice(0, 3);
    const attention = [...cats].sort((a, b) => a.avg - b.avg).slice(0, 3);
    const prios = Feedback.priorities(answers);
    const msgs = Feedback.messages(answers);
    const game = Feedback.myGame(answers);
    const history = Storage.getHistory();

    if (answered.length === 0) {
      return `
        <div class="empty-state">
          <p>Você ainda não respondeu nenhuma competência do checkup.</p>
          <a class="btn btn--primary" href="#/checkup/branca">Começar meu checkup</a>
        </div>
      `;
    }

    return `
      <div class="dash-grid">
        <section class="dash-card dash-card--wide">
          <h3>Visão geral</h3>
          <p class="muted">${answered.length} de ${total} competências avaliadas em todo o mapa.</p>
          ${distributionBars(counts, answered.length)}
        </section>

        <section class="dash-card">
          <h3>Radar do Jiu-Jitsu</h3>
          ${radarSVG(groups)}
          <p class="muted small">Distribuição das competências informadas por você — não representa "nível de faixa".</p>
        </section>

        <section class="dash-card">
          <h3>Feedback</h3>
          <ul class="feedback-list">
            ${msgs.map(m => typeof m === "string" ? `<li>${m}</li>` : `<li><strong>${m.tag}:</strong> ${m.text}</li>`).join("")}
          </ul>
          ${game ? `<p class="muted"><strong>Meu jogo:</strong> ${game}</p>` : ""}
        </section>

        <section class="dash-card">
          <h3>Pontos fortes</h3>
          ${strengths.length ? `<ul class="chip-list">${strengths.map(s => `<li class="chip chip--strong">${s.category} <span>(${s.beltName})</span></li>`).join("")}</ul>` : `<p class="muted">Ainda sem dados suficientes.</p>`}
        </section>

        <section class="dash-card">
          <h3>Pontos de atenção</h3>
          ${attention.length ? `<ul class="chip-list">${attention.map(s => `<li class="chip chip--attention">${s.category} <span>(${s.beltName})</span></li>`).join("")}</ul>` : `<p class="muted">Ainda sem dados suficientes.</p>`}
        </section>

        <section class="dash-card dash-card--wide">
          <h3>3 prioridades</h3>
          ${prios.length ? `
            <div class="mission-grid">
              ${Feedback.missions(answers).map(m => `
                <div class="mission-card">
                  <span class="mission-card__label">FOCO</span>
                  <h4>${m.foco}</h4>
                  <span class="mission-card__faixa">${m.faixa}</span>
                  <p><strong>Objetivo:</strong> ${m.objetivo}</p>
                  <p><strong>Próximo passo:</strong> ${m.proximoPasso}</p>
                </div>
              `).join("")}
            </div>
          ` : `<p class="muted">Nenhuma prioridade clara identificada ainda — continue o checkup.</p>`}
        </section>

        <section class="dash-card dash-card--wide">
          <h3>Histórico</h3>
          <p class="muted">Salve uma fotografia do seu checkup atual para comparar sua evolução depois.</p>
          <button class="btn btn--secondary" id="btn-save-snapshot">Salvar checkup atual</button>
          ${history.length ? `
            <ul class="history-list">
              ${history.slice().reverse().map(h => `<li>${h.label} — ${new Date(h.date).toLocaleDateString("pt-BR")}</li>`).join("")}
            </ul>
          ` : `<p class="muted small">Nenhum checkup salvo ainda.</p>`}
        </section>

        <section class="dash-card dash-card--wide reading-rule">
          <p>${appData.readingRule}</p>
        </section>

        <section class="dash-card dash-card--wide disclaimer">
          <p>${appData.disclaimer}</p>
        </section>

        <section class="dash-card dash-card--wide">
          <button class="btn btn--danger-ghost" id="btn-reset-progress">Resetar meu progresso</button>
        </section>
      </div>
    `;
  }

  return { render };
})();
