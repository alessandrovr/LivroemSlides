/* ==========================================================================
   feedback.js — feedback automatico, 100% determinístico (regras JS).
   Nenhuma chamada de IA ou API. Todas as mensagens derivam da logica dos
   documentos-fonte (niveis de dominio e regra de leitura do checkup).
   ========================================================================== */

const Feedback = (() => {

  function stats(answers) {
    const items = Checklist.allItems();
    const answered = items.filter(i => answers[i.id]);
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    answered.forEach(i => counts[answers[i.id]]++);
    return { items, answered, counts, total: items.length };
  }

  // Estatisticas por categoria (para prioridades e radar)
  function byCategory(answers) {
    const items = Checklist.allItems();
    const map = {};
    items.forEach(i => {
      const key = `${i.belt}::${i.category}`;
      if (!map[key]) map[key] = { belt: i.belt, beltName: i.beltName, category: i.category, radarGroup: i.radarGroup, items: [] };
      map[key].items.push(i);
    });
    return Object.values(map).map(cat => {
      const answered = cat.items.filter(i => answers[i.id]);
      const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
      answered.forEach(i => counts[answers[i.id]]++);
      const avg = answered.length ? answered.reduce((s, i) => s + answers[i.id], 0) / answered.length : 0;
      return { ...cat, answeredCount: answered.length, total: cat.items.length, counts, avg };
    });
  }

  // Estatisticas por radarGroup (para o dashboard "Radar do Jiu-Jitsu")
  function byRadarGroup(answers) {
    const items = Checklist.allItems();
    const map = {};
    appData.radarGroups.forEach(g => map[g] = { group: g, items: [] });
    items.forEach(i => { if (map[i.radarGroup]) map[i.radarGroup].items.push(i); });
    return appData.radarGroups.map(g => {
      const cat = map[g];
      const answered = cat.items.filter(i => answers[i.id]);
      const avg = answered.length ? answered.reduce((s, i) => s + answers[i.id], 0) / answered.length : 0;
      return { group: g, answeredCount: answered.length, total: cat.items.length, avg };
    });
  }

  // Mensagens de feedback (secao 13 do prompt-mestre)
  function messages(answers) {
    const { answered, counts } = stats(answers);
    const out = [];
    if (answered.length === 0) {
      return ["Responda ao checkup para receber seu feedback automático."];
    }

    // FUNDAMENTOS: competencias da faixa branca predominantemente em niveis altos?
    const branca = answered.filter(i => i.belt === "branca");
    if (branca.length >= 5) {
      const highBranca = branca.filter(i => answers[i.id] >= 3).length;
      if (highBranca / branca.length >= 0.7) {
        out.push({ tag: "Fundamentos", text: "Seus fundamentos apresentam boa consolidação." });
      }
    }

    // APLICACAO: muitas em "Sei" (2), poucas em "Faço" (3) ou mais
    const seiCount = counts[2];
    const facoOuMais = counts[3] + counts[4];
    if (seiCount >= 5 && seiCount > facoOuMais) {
      out.push({ tag: "Aplicação", text: "Seu conhecimento parece estar mais consolidado no nível de demonstração do que na aplicação em treinamento." });
    }

    // RESISTENCIA: diferenca grande entre "Faço" (3) e "Faço contra resistência" (4)
    if (counts[3] >= 5 && counts[3] > counts[4] * 1.5) {
      out.push({ tag: "Resistência", text: "Um próximo passo importante é transformar conhecimento aplicado em competência contra resistência." });
    }

    // CONEXAO: niveis avancados (roxa/marrom/preta) com media alta
    const avancados = answered.filter(i => ["roxa", "marrom"].includes(i.belt));
    if (avancados.length >= 5) {
      const avgAvancados = avancados.reduce((s, i) => s + answers[i.id], 0) / avancados.length;
      if (avgAvancados >= 3) {
        out.push({ tag: "Conexão", text: "Seu próximo desafio pode não ser aprender mais técnicas, mas conectar soluções diante das reações do adversário." });
      }
    }

    if (out.length === 0) {
      out.push({ tag: "Início", text: "Continue respondendo ao checkup — o feedback fica mais preciso conforme mais competências são avaliadas." });
    }
    return out;
  }

  // Ate 3 prioridades (secao 14): regras claras e transparentes
  function priorities(answers) {
    const cats = byCategory(answers).filter(c => c.answeredCount > 0);
    const scored = cats.map(c => {
      let score = 0;
      // Muitas respostas "Não sei" pesam mais
      score += c.counts[1] * 3;
      // "Sei" sem "Faço"/"Faço contra resistência" indica necessidade de pratica
      score += Math.max(0, c.counts[2] - (c.counts[3] + c.counts[4])) * 2;
      // Categorias ja predominantemente "Faço contra resistência" nao sao prioridade
      const resistenciaShare = c.counts[4] / c.answeredCount;
      if (resistenciaShare >= 0.7) score = 0;
      return { ...c, score };
    });
    return scored
      .filter(c => c.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }

  // Missoes / "Proximo treino" (secao 15) — apenas objetivos de atencao, sem inventar exercicios
  function missions(answers) {
    const prios = priorities(answers);
    return prios.map(p => ({
      foco: p.category,
      faixa: p.beltName,
      objetivo: `Levar as competências de "${p.category}" (${p.beltName}) ao próximo nível de domínio.`,
      proximoPasso: "Praticar, observar ou aplicar essas competências em treino, conforme descrito no checkup — sem pular etapas de domínio."
    }));
  }

  // "Meu jogo" (secao 16) — padrao derivado das proprias categorias, sem inventar conceitos
  function myGame(answers) {
    const groups = byRadarGroup(answers).filter(g => g.answeredCount >= 3);
    if (groups.length === 0) return null;
    const top = groups.reduce((a, b) => (b.avg > a.avg ? b : a));
    if (top.avg < 2.5) return null;
    return `Seu checkup mostra maior desenvolvimento relativo em competências relacionadas a ${top.group.toLowerCase()}.`;
  }

  return { stats, byCategory, byRadarGroup, messages, priorities, missions, myGame };
})();
