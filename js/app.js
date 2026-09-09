/* ==========================================================================
   app.js — roteamento e orquestracao das telas. SPA leve, sem framework.
   ========================================================================== */

const App = (() => {
  const root = document.getElementById("app");
  const beltOrder = appData.beltOrder;

  function beltColorVar(code) {
    return appData.belts[code].colorHex;
  }

  function navHTML(active) {
    return `
      <nav class="topnav">
        <a href="#/" class="topnav__brand ${active === "home" ? "is-active" : ""}">DE BRANCA A PRETA</a>
        <div class="topnav__links">
          <a href="#/tabela-mestra" class="${active === "tabela" ? "is-active" : ""}">Tabela-mestra</a>
          <a href="#/comparar" class="${active === "comparar" ? "is-active" : ""}">Comparar faixas</a>
          <a href="#/progresso" class="${active === "progresso" ? "is-active" : ""}">Meu progresso</a>
        </div>
      </nav>
    `;
  }

  /* ---------------------------- HOME --------------------------------- */
  function renderHome() {
    const cards = [
      { href: "#/faixa/branca", title: "EXPLORAR MINHA FAIXA", desc: "Conheça a lógica e as competências de uma faixa.", color: "var(--pop-red)" },
      { href: "#/checkup/branca", title: "FAZER MEU CHECKUP", desc: "Preencha o checklist interativo.", color: "var(--pop-orange)" },
      { href: "#/tabela-mestra", title: "VER A TABELA-MESTRA", desc: "Explore a evolução transversal entre as faixas.", color: "var(--pop-teal)" },
      { href: "#/comparar", title: "COMPARAR FAIXAS", desc: "Visualize como muda a maturidade entre faixas.", color: "var(--pop-purple)" },
      { href: "#/progresso", title: "MEU PROGRESSO", desc: "Veja o resultado pessoal do seu checkup.", color: "var(--pop-green)" }
    ];

    root.innerHTML = `
      <header class="hero">
        <p class="hero__eyebrow">Mapa interativo da jornada no Jiu-Jitsu</p>
        <h1 class="hero__title">DE BRANCA A PRETA</h1>
        <p class="hero__subtitle">Descubra em que faixa você está e o que fazer para evoluir.</p>
        <p class="book-banner">📘 Este app é parte integrante do livro <strong>“De Branca a Preta”</strong>, de Alessandro Vieira dos Reis, e apresenta apenas uma parte do conteúdo do livro.</p>
      </header>

      <section class="journey-strip" aria-label="A jornada">
        <h2 class="section-title">A JORNADA</h2>
        <div class="journey-track">
          ${beltOrder.map((code, i) => {
            const belt = appData.belts[code];
            const verb = code === "branca" ? "Sobreviver" : code === "azul" ? "Vencer posições" : code === "roxa" ? "Conectar" : code === "marrom" ? "Refinar" : "Resolver problemas";
            return `
              <a class="journey-node belt-${code}" href="#/faixa/${code}">
                <span class="journey-node__dot"></span>
                <span class="journey-node__name">${belt.name}</span>
                <span class="journey-node__verb">${verb}</span>
              </a>
              ${i < beltOrder.length - 1 ? '<span class="journey-arrow">→</span>' : ""}
            `;
          }).join("")}
        </div>
      </section>

      <section class="home-grid">
        ${cards.map(c => `
          <a class="home-card" style="--card-color:${c.color}" href="${c.href}">
            <h3>${c.title}</h3>
            <p>${c.desc}</p>
          </a>
        `).join("")}
      </section>

      <footer class="app-footer">
        <p>${appData.disclaimer}</p>
      </footer>
    `;
    prependNav("home");
  }

  function prependNav(active) {
    root.insertAdjacentHTML("afterbegin", navHTML(active));
  }

  /* ------------------------ EXPLORAR FAIXA (slideshow) ----------------- */
  function renderBeltSlideshow(code, slideIndex) {
    const belt = appData.belts[code];
    if (!belt) return renderHome();
    const idx = beltOrder.indexOf(code);
    const isPreta = code === "preta";
    const slides = isPreta
      ? ["intro", "principios", "criterio", "salto", "checkup"]
      : ["intro", "foco", "salto", "checkup-preview", "checkup"];
    const total = slides.length;
    const cur = Math.max(0, Math.min(slideIndex, total - 1));
    const slideKey = slides[cur];

    let slideContent = "";
    if (slideKey === "intro") {
      slideContent = `
        <p class="slide-eyebrow">FAIXA ${belt.name.toUpperCase()}</p>
        <h2 class="slide-title">${belt.epigraph}</h2>
        <p class="slide-question">“${belt.centralQuestion}”</p>
        <p class="slide-theme">${belt.theme}</p>
      `;
    } else if (slideKey === "principios") {
      slideContent = `
        <h2 class="slide-title">O QUE VOCÊ DEVE SABER</h2>
        <p class="muted">Não é mais uma lista de técnicas.</p>
        <ul class="bullet-list">${belt.knowledgePrinciples.map(p => `<li>${p}</li>`).join("")}</ul>
      `;
    } else if (slideKey === "criterio") {
      slideContent = `
        <h2 class="slide-title">O critério real de faixa-preta</h2>
        <ul class="bullet-list">${belt.realCriteria.map(p => `<li>${p}</li>`).join("")}</ul>
      `;
    } else if (slideKey === "foco") {
      slideContent = `
        <h2 class="slide-title">O FOCO</h2>
        <p>${belt.intro}</p>
        <div class="module-grid">
          ${belt.modules.map(m => `
            <div class="module-card">
              <h4>${m.label}</h4>
              <p>${m.desc}</p>
            </div>
          `).join("")}
        </div>
      `;
    } else if (slideKey === "salto") {
      slideContent = `
        <h2 class="slide-title">O QUE MUDA?</h2>
        <div class="leap-box">
          <p class="leap-box__quote">${belt.maturityLeap}</p>
        </div>
        ${belt.promotionCriteria ? `<p class="muted"><strong>Critério de promoção:</strong> ${belt.promotionCriteria}</p>` : ""}
      `;
    } else if (slideKey === "checkup-preview") {
      const catList = belt.categories.map(c => `<li>${c.name} <span class="muted">(${c.items.length})</span></li>`).join("");
      slideContent = `
        <h2 class="slide-title">O CHECKUP</h2>
        <p class="muted">${belt.checklistIntro}</p>
        <ul class="bullet-list">${catList}</ul>
      `;
    } else if (slideKey === "checkup") {
      slideContent = `
        <h2 class="slide-title">TESTE-SE</h2>
        <p class="muted">Comece agora seu checklist interativo desta faixa.</p>
        <a class="btn btn--primary" href="#/checkup/${code}">Fazer checkup da faixa ${belt.name}</a>
      `;
    }

    root.innerHTML = `
      <section class="slideshow belt-${code}">
        <div class="slideshow__progress">
          <span>${String(cur + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>
          <div class="progress-track"><div class="progress-fill" style="width:${((cur + 1) / total) * 100}%"></div></div>
        </div>
        <div class="slideshow__body">${slideContent}</div>
        <div class="slideshow__nav">
          <a class="btn btn--ghost" href="#/">MENU</a>
          <div class="slideshow__nav-arrows">
            ${cur > 0 ? `<a class="btn btn--ghost" href="#/faixa/${code}/${cur - 1}">← Voltar</a>` : ""}
            ${cur < total - 1 ? `<a class="btn btn--primary" href="#/faixa/${code}/${cur + 1}">Próximo →</a>` : ""}
          </div>
        </div>
        <div class="belt-switch">
          ${beltOrder.map(b => `<a class="belt-dot belt-${b} ${b === code ? "is-active" : ""}" href="#/faixa/${b}" title="Faixa ${appData.belts[b].name}"></a>`).join("")}
        </div>
      </section>
    `;
    prependNav("home");
  }

  /* ------------------------------ CHECKUP ------------------------------ */
  function renderCheckup(code) {
    const belt = appData.belts[code];
    if (!belt) return renderHome();

    root.innerHTML = `
      <section class="checkup-view belt-${code}">
        <div class="checkup-header">
          <p class="slide-eyebrow">CHECKUP — FAIXA ${belt.name.toUpperCase()}</p>
          <h2>${belt.checklistIntro || belt.notAChecklistNote || ""}</h2>
        </div>
        <div class="belt-tabs">
          ${beltOrder.map(b => `<a class="belt-tab belt-${b} ${b === code ? "is-active" : ""}" href="#/checkup/${b}">${appData.belts[b].name}</a>`).join("")}
        </div>
        <div id="checklist-container">${Checklist.renderBeltChecklist(code)}</div>
        <div class="checkup-footer">
          <a class="btn btn--ghost" href="#/">MENU</a>
          <a class="btn btn--primary" href="#/progresso">Ver meu progresso</a>
        </div>
      </section>
    `;
    prependNav("home");
    wireChecklistEvents();
  }

  function wireChecklistEvents() {
    root.querySelectorAll(".level-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const itemId = btn.dataset.item;
        const level = Number(btn.dataset.level);
        const answers = Storage.getAnswers();
        // toggle off se clicar no mesmo nivel de novo
        const newLevel = answers[itemId] === level ? undefined : level;
        if (newLevel === undefined) {
          delete answers[itemId];
          Storage.setAnswers(answers);
        } else {
          Storage.setAnswer(itemId, newLevel);
        }
        // atualiza visualmente apenas a linha afetada
        const row = btn.closest(".check-row");
        row.querySelectorAll(".level-btn").forEach(b => {
          const isActive = Number(b.dataset.level) === newLevel;
          b.classList.toggle("is-active", isActive);
          b.setAttribute("aria-pressed", String(isActive));
        });
      });
    });
  }

  /* --------------------------- TABELA-MESTRA ---------------------------- */
  function renderMasterTable() {
    const beltLabels = ["Branca", "Azul", "Roxa", "Marrom", "Preta"];
    root.innerHTML = `
      <section class="master-table-view">
        <h2 class="section-title">TABELA-MESTRA</h2>
        <p class="muted">${appData.masterTableNote}</p>
        <div class="mt-header-row">
          <div class="mt-cell mt-cell--axis"></div>
          ${beltLabels.map((b, i) => `<div class="mt-cell mt-cell--belthead belt-${beltOrder[i]}">${b}</div>`).join("")}
        </div>
        ${appData.masterTable.map(axis => `
          <div class="mt-axis-group">
            <h3 class="mt-axis-title">${axis.axis}</h3>
            ${axis.rows.map(row => `
              <div class="mt-row">
                <div class="mt-cell mt-cell--theme">${row.theme}</div>
                ${row.values.map((v, i) => `<button type="button" class="mt-cell mt-cell--value belt-${beltOrder[i]}" data-axis="${axis.axis}" data-theme="${row.theme}" data-belt="${beltLabels[i]}" data-value="${v}">${v}</button>`).join("")}
              </div>
            `).join("")}
          </div>
        `).join("")}
        <div id="mt-detail" class="mt-detail" hidden></div>
        <a class="btn btn--ghost" href="#/">MENU</a>
      </section>
    `;
    prependNav("tabela");

    root.querySelectorAll(".mt-cell--value").forEach(cell => {
      cell.addEventListener("click", () => {
        const detail = document.getElementById("mt-detail");
        detail.hidden = false;
        detail.innerHTML = `
          <p><strong>${cell.dataset.theme}</strong> — Faixa ${cell.dataset.belt}: <em>${cell.dataset.value}</em></p>
        `;
        detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });
  }

  /* ----------------------------- COMPARAR ------------------------------- */
  function renderCompare(beltA, beltB) {
    beltA = beltA || "branca";
    beltB = beltB || "roxa";

    function rowsFor(axisTheme) {
      const axis = appData.masterTable.find(a => a.rows.some(r => r.theme === axisTheme));
      const row = axis.rows.find(r => r.theme === axisTheme);
      const ia = beltOrder.indexOf(beltA);
      const ib = beltOrder.indexOf(beltB);
      return { a: row.values[ia], b: row.values[ib] };
    }

    const highlightThemes = ["Estrategia", "Integracao", "Autonomia"];
    const rows = highlightThemes.map(t => ({ theme: t, ...rowsFor(t) }));

    root.innerHTML = `
      <section class="compare-view">
        <h2 class="section-title">COMPARAR FAIXAS</h2>
        <div class="compare-selectors">
          <select id="select-belt-a">${beltOrder.map(b => `<option value="${b}" ${b === beltA ? "selected" : ""}>${appData.belts[b].name}</option>`).join("")}</select>
          <span>×</span>
          <select id="select-belt-b">${beltOrder.map(b => `<option value="${b}" ${b === beltB ? "selected" : ""}>${appData.belts[b].name}</option>`).join("")}</select>
        </div>

        <div class="compare-heads">
          <div class="compare-head belt-${beltA}">${appData.belts[beltA].name}<br><span class="muted small">${appData.belts[beltA].centralQuestion}</span></div>
          <div class="compare-head belt-${beltB}">${appData.belts[beltB].name}<br><span class="muted small">${appData.belts[beltB].centralQuestion}</span></div>
        </div>

        <table class="compare-table">
          <thead><tr><th>Dimensão</th><th>${appData.belts[beltA].name}</th><th>${appData.belts[beltB].name}</th></tr></thead>
          <tbody>
            ${rows.map(r => `<tr><td>${r.theme}</td><td>${r.a}</td><td>${r.b}</td></tr>`).join("")}
          </tbody>
        </table>

        <div class="compare-full">
          <h3>Tabela-mestra completa entre as duas faixas</h3>
          ${appData.masterTable.map(axis => `
            <div class="mt-axis-group">
              <h4 class="mt-axis-title">${axis.axis}</h4>
              ${axis.rows.map(row => {
                const ia = beltOrder.indexOf(beltA);
                const ib = beltOrder.indexOf(beltB);
                return `<div class="mt-row mt-row--compare">
                  <div class="mt-cell mt-cell--theme">${row.theme}</div>
                  <div class="mt-cell belt-${beltA}">${row.values[ia]}</div>
                  <div class="mt-cell belt-${beltB}">${row.values[ib]}</div>
                </div>`;
              }).join("")}
            </div>
          `).join("")}
        </div>

        <a class="btn btn--ghost" href="#/">MENU</a>
      </section>
    `;
    prependNav("comparar");

    document.getElementById("select-belt-a").addEventListener("change", (e) => {
      location.hash = `#/comparar/${e.target.value}/${beltB}`;
      route();
    });
    document.getElementById("select-belt-b").addEventListener("change", (e) => {
      location.hash = `#/comparar/${beltA}/${e.target.value}`;
      route();
    });
  }

  /* ---------------------------- MEU PROGRESSO ---------------------------- */
  function renderProgress() {
    root.innerHTML = `
      <section class="progress-view">
        <h2 class="section-title">MEU PROGRESSO</h2>
        <div id="dashboard-container">${Dashboard.render()}</div>
        <a class="btn btn--ghost" href="#/">MENU</a>
      </section>
    `;
    prependNav("progresso");

    const saveBtn = document.getElementById("btn-save-snapshot");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        Storage.saveSnapshot();
        renderProgress();
      });
    }
    const resetBtn = document.getElementById("btn-reset-progress");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Isso vai apagar todas as suas respostas e histórico salvos neste navegador. Deseja continuar?")) {
          Storage.resetAll();
          renderProgress();
        }
      });
    }
  }

  /* ------------------------------- ONBOARDING ---------------------------- */
  function renderOnboarding() {
    root.innerHTML = `
      <section class="onboarding">
        <h1>DE BRANCA A PRETA</h1>
        <p>Este aplicativo transforma o conteúdo de “De Branca a Preta” em um mapa interativo de progressão e autoavaliação.</p>
        <button class="btn btn--primary" id="btn-start">Começar</button>
      </section>
    `;
    document.getElementById("btn-start").addEventListener("click", () => {
      Storage.setPrefs({ onboarded: true });
      location.hash = "#/";
      route();
    });
  }

  /* --------------------------------- ROUTER ------------------------------ */
  function route() {
    const prefs = Storage.getPrefs();
    if (!prefs.onboarded) {
      renderOnboarding();
      return;
    }
    const hash = location.hash.replace(/^#\/?/, "");
    const parts = hash.split("/").filter(Boolean);

    if (parts.length === 0) {
      renderHome();
    } else if (parts[0] === "faixa" && parts[1]) {
      renderBeltSlideshow(parts[1], parts[2] ? Number(parts[2]) : 0);
    } else if (parts[0] === "checkup" && parts[1]) {
      renderCheckup(parts[1]);
    } else if (parts[0] === "tabela-mestra") {
      renderMasterTable();
    } else if (parts[0] === "comparar") {
      renderCompare(parts[1], parts[2]);
    } else if (parts[0] === "progresso") {
      renderProgress();
    } else {
      renderHome();
    }
    window.scrollTo(0, 0);
  }

  function init() {
    window.addEventListener("hashchange", route);
    route();
  }

  return { init, route };
})();

document.addEventListener("DOMContentLoaded", App.init);
