# De Branca a Preta — Mapa interativo da jornada no Jiu-Jitsu

Aplicativo web estático (HTML + CSS + JavaScript vanilla), sem backend,
sem banco de dados e sem login. Todo o conteúdo vem exclusivamente dos
dois documentos-fonte do autor: o e-book "De Branca a Preta" (narrativa
e tabela-mestra) e o "Checkup técnico" (checklist estruturado por faixa).

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (público, ou privado com Pages
   habilitado no seu plano).
2. Faça upload de **todo o conteúdo desta pasta** para a raiz do
   repositório (mantendo a estrutura de pastas `css/`, `js/`, `assets/`).
3. No repositório, vá em **Settings → Pages**.
4. Em "Source", selecione a branch (geralmente `main`) e a pasta `/root`.
5. Salve. Em alguns minutos o GitHub fornecerá uma URL pública, algo como:
   `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`
6. Abra a URL — o aplicativo deve carregar sem nenhuma configuração
   adicional, pois todos os caminhos são relativos (`./css/...`, `./js/...`).

Nenhum passo de build é necessário: é HTML/CSS/JS puro.

## Estrutura de arquivos

```
de-branca-a-preta/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── data.js         ← fonte única de verdade de todo o conteúdo
│   ├── storage.js       ← persistência em localStorage (sem contas)
│   ├── checklist.js      ← lógica e renderização do checklist técnico
│   ├── feedback.js       ← regras determinísticas de feedback (sem IA)
│   ├── dashboard.js      ← radar, distribuição e "Meu Progresso"
│   └── app.js           ← roteamento (hash) e todas as telas
├── assets/
│   ├── images/          ← pasta para você adicionar fotos/ilustrações
│   └── icons/           ← pasta para ícones customizados (opcional)
└── README.md
```

## Persistência de dados

O progresso do usuário é salvo **somente no navegador** via
`localStorage`, sob as chaves prefixadas com `dbp_v1_`. Não há conta,
login ou envio de dados para qualquer servidor. Isso significa que:

- O progresso é local a cada navegador/dispositivo (não sincroniza entre
  aparelhos).
- Limpar os dados de navegação do navegador apaga o progresso.
- O botão "Resetar meu progresso" (na tela Meu Progresso) apaga tudo
  localmente, mediante confirmação.

## Fidelidade de conteúdo

Todo texto, critério, nível de domínio, tabela-mestra e checklist técnico
deste aplicativo foi extraído literalmente dos dois documentos fornecidos
pelo autor. Nenhuma técnica, critério de graduação, regra de federação ou
conhecimento externo de Jiu-Jitsu foi adicionado. A interface (cards,
slideshow, radar, tabela interativa) é criativa; o conteúdo não é.

O checkup é uma ferramenta de autoavaliação e **não constitui critério
oficial de graduação** — a definição de faixa é sempre uma decisão do
professor do praticante.

## Adicionando imagens

Veja `assets/images/README.txt` para instruções de como inserir imagens
de técnicas nas telas do aplicativo.
