/* ==========================================================================
   checklist.js — utilitarios de checklist compartilhados por todo o app.
   Uma unica fonte de verdade (appData) alimenta slideshow, checklist,
   radar, tabela, comparacao e dashboard.
   ========================================================================== */

const Checklist = (() => {

  // Gera um id estavel para cada item tecnico: belt-catIndex-itemIndex
  function itemId(beltCode, catIndex, itemIndex) {
    return `${beltCode}-${catIndex}-${itemIndex}`;
  }

  // Retorna todos os itens tecnicos "achatados" com metadados (faixa, categoria, radarGroup)
  function allItems() {
    const out = [];
    appData.beltOrder.forEach(beltCode => {
      const belt = appData.belts[beltCode];
      if (!belt.categories) return; // faixa preta e qualitativa, sem checklist tecnico
      belt.categories.forEach((cat, ci) => {
        cat.items.forEach((label, ii) => {
          out.push({
            id: itemId(beltCode, ci, ii),
            belt: beltCode,
            beltName: belt.name,
            category: cat.name,
            radarGroup: cat.radarGroup,
            label
          });
        });
      });
    });
    return out;
  }

  function itemsForBelt(beltCode) {
    return allItems().filter(i => i.belt === beltCode);
  }

  // IDs qualitativos da faixa preta (binario: ainda-nao / sim)
  function pretaCriteriaId(index) {
    return `preta-criterio-${index}`;
  }

  function levelById(id) {
    return appData.levels.find(l => l.id === id);
  }

  // Renderiza um card de item do checklist tecnico (4 niveis)
  function renderItemRow(item, answers) {
    const current = answers[item.id];
    const options = appData.levels.map(l => {
      const active = current === l.id ? "is-active" : "";
      return `<button type="button" class="level-btn ${active}" data-item="${item.id}" data-level="${l.id}" aria-pressed="${current === l.id}" title="${l.desc}">${l.label}</button>`;
    }).join("");
    return `
      <div class="check-row" data-item-row="${item.id}">
        <div class="check-row__label">${item.label}</div>
        <div class="check-row__levels">${options}</div>
      </div>
    `;
  }

  // Renderiza o checklist tecnico completo de uma faixa, agrupado por categoria
  function renderBeltChecklist(beltCode) {
    const belt = appData.belts[beltCode];
    const answers = Storage.getAnswers();
    if (!belt.categories) {
      return renderPretaChecklist();
    }
    const groups = belt.categories.map((cat, ci) => {
      const rows = cat.items.map((label, ii) => {
        const item = { id: itemId(beltCode, ci, ii), label };
        return renderItemRow(item, answers);
      }).join("");
      return `
        <section class="check-group">
          <h3 class="check-group__title">${cat.name}</h3>
          <div class="check-group__rows">${rows}</div>
        </section>
      `;
    }).join("");

    return `
      <div class="checklist-legend">
        ${appData.levels.map(l => `<span class="legend-pill"><strong>${l.label}</strong> — ${l.desc}</span>`).join("")}
      </div>
      ${groups}
    `;
  }

  // Faixa preta: checklist qualitativo (binario), conforme criterio de saida do doc.
  function renderPretaChecklist() {
    const belt = appData.belts.preta;
    const answers = Storage.getAnswers();
    const rows = belt.exitCriteria.map((label, i) => {
      const id = pretaCriteriaId(i);
      const current = answers[id];
      const yes = current === 4 ? "is-active" : "";
      const no = current === 1 ? "is-active" : "";
      return `
        <div class="check-row" data-item-row="${id}">
          <div class="check-row__label">${label}</div>
          <div class="check-row__levels check-row__levels--binary">
            <button type="button" class="level-btn ${no}" data-item="${id}" data-level="1">Ainda não</button>
            <button type="button" class="level-btn ${yes}" data-item="${id}" data-level="4">Sim</button>
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="preta-note">
        <p><strong>${belt.notAChecklistNote}</strong> Em vez de marcar técnicas, reflita sobre os critérios reais que o documento estabelece para esta fase.</p>
      </div>
      <section class="check-group">
        <h3 class="check-group__title">Critério real de faixa-preta</h3>
        <div class="check-group__rows">${rows}</div>
      </section>
    `;
  }

  return { itemId, allItems, itemsForBelt, pretaCriteriaId, levelById, renderBeltChecklist };
})();
