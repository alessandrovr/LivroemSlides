/* ==========================================================================
   storage.js — camada de persistencia local (localStorage), sem contas.
   ========================================================================== */

const Storage = (() => {
  const NS = "dbp_v1";
  const KEY_CURRENT = `${NS}_current`;      // respostas ativas {itemId: levelId}
  const KEY_HISTORY = `${NS}_history`;      // lista de snapshots [{id, date, answers}]
  const KEY_PREFS = `${NS}_prefs`;          // preferencias de interface

  function safeGet(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.warn("Storage: falha ao ler", key, e);
      return fallback;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn("Storage: falha ao salvar", key, e);
      return false;
    }
  }

  return {
    getAnswers() {
      return safeGet(KEY_CURRENT, {});
    },
    setAnswer(itemId, levelId) {
      const answers = this.getAnswers();
      answers[itemId] = levelId;
      safeSet(KEY_CURRENT, answers);
      return answers;
    },
    setAnswers(answers) {
      safeSet(KEY_CURRENT, answers);
    },
    getHistory() {
      return safeGet(KEY_HISTORY, []);
    },
    saveSnapshot(label) {
      const history = this.getHistory();
      const snapshot = {
        id: `checkup_${String(history.length + 1).padStart(2, "0")}`,
        label: label || `Checkup ${String(history.length + 1).padStart(2, "0")}`,
        date: new Date().toISOString(),
        answers: { ...this.getAnswers() }
      };
      history.push(snapshot);
      safeSet(KEY_HISTORY, history);
      return snapshot;
    },
    getPrefs() {
      return safeGet(KEY_PREFS, { lastView: "home" });
    },
    setPrefs(prefs) {
      safeSet(KEY_PREFS, { ...this.getPrefs(), ...prefs });
    },
    resetAll() {
      try {
        const prefs = this.getPrefs();
        localStorage.removeItem(KEY_CURRENT);
        localStorage.removeItem(KEY_HISTORY);
        // preserva a preferencia de onboarding ja concluido
        safeSet(KEY_PREFS, { onboarded: prefs.onboarded });
        return true;
      } catch (e) {
        console.warn("Storage: falha ao resetar", e);
        return false;
      }
    }
  };
})();
