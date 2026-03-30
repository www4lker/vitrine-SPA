# Experimentos em SPA: Curiosidade Automatizada

Este portfólio documenta uma jornada experimental com IA generativa aplicada à criação de páginas web de conteúdo denso.

## 🧪 Sobre Este Projeto

Este pesquisador, inicialmente atraído pelas capacidades de codificação da IA, rapidamente se desinteressou pela geração de imagens (que consome muita energia, produz pouca novidade e pode ser antiética). Ele migrou para a criação de **Single Page Applications (SPAs)**, motivado por:

1. **Curiosidade pelo "vibe coding"** — a experiência de co-criar código com ferramentas generativas.
2. **Fascínio pela automação** — usar ferramentas como Deep Research do Google Gemini para transformar ideias e pesquisas em páginas web interativas.
3. **Liberdade criativa** — poder explorar virtualmente qualquer ideia, qualquer lampejo de curiosidade, sem julgamento de qualidade ou veracidade absoluta.

> **Importante**: Os conteúdos aqui apresentados **não são avaliados quanto à qualidade ou veracidade dos fatos**, posto que foram gerados com recursos experimentais de pesquisa com IA, e nem são atestados pelo autor. Trata-se de um **experimento metodológico** sobre o uso de IA para exploração de ideias, pesquisa e criação de páginas HTML standalone.

## 🔬 Metodologia

Muitos destes sites foram gerados com a assistência do Gemini, do **Deep Research**, e do **Canvas**, ferramenta que integra pesquisa e documentos densos (10+ páginas) em geração automática de SPAs. 

Sempre que possível (mas não em todos os casos), o pesquisador tentou incluir **links para os documentos originais no rodapé** das páginas e até mesmo os prompts usados, permitindo verificação por parte de interessados.

## 📬 Transparência e Responsabilidade

O autor está **aberto a remover ou retificar qualquer fato que estiver incorreto e for danoso**. 

Para correções, sugestões ou dúvidas:
- **Email**: [walker.dantas@sou.ufmt.br](mailto:walker.dantas@sou.ufmt.br)
- **Bluesky**: [@walker.eco.br](https://bsky.app/profile/walker.eco.br)

## 🌐 Manifesto

> Que possamos usar essas ferramentas para **florescer nossa criatividade** e tornar a web, novamente, um lugar de **descoberta e esquisitice**.

---

## 📘 Guia de Uso e Atualização

Para manter o site organizado e funcionando, siga esta **Regra de Ouro**:
> **Sempre mexa na pasta `CORPUS`, nunca na pasta `projects`.**

A pasta `projects` é gerada automaticamente. Se você mudar algo lá, perderá as alterações na próxima sincronização.

### 🔄 Script de Sincronização: `sync-projects.js`

Este script é o coração do sistema de atualização. Ele:

1. **Copia** todos os projetos de `CORPUS/` → `projects/` (pasta pública)
2. **Escaneia** cada projeto procurando por `index.html` ou outros arquivos HTML
3. **Extrai metadados** automaticamente:
   - Título (do `<title>` do HTML)
   - Descrição (da meta tag `description`)
   - Tags/conceitos (análise semântica: IA, Neurociência, Humanidades, etc.)
   - Emoji temático (🧠, 📚, 🤖, etc.)
4. **Gera** o arquivo `projects.json` com todos os metadados
5. **Limpa** a pasta `projects/` antes de copiar (evita projetos órfãos)

**Quando rodar o script:**
- ✅ Sempre que adicionar um novo projeto no `CORPUS/`
- ✅ Sempre que editar o conteúdo de um projeto existente
- ✅ Sempre que remover um projeto do `CORPUS/`

### 1. Como Adicionar um Novo Projeto
1.  Copie a pasta do seu projeto para dentro de `CORPUS/`.
2.  Certifique-se de que existe um arquivo HTML (preferencialmente `index.html`) dentro da pasta.
3.  Abra o terminal na pasta raiz do portfólio.
4.  Rode o comando de sincronização:
    ```bash
    node scripts/sync-projects.js
    ```
5.  Pronto! O script vai:
    - Copiar o projeto para `projects/`
    - Identificar automaticamente o tema (IA, Neurociência, etc.)
    - Atualizar o `projects.json`
    - Gerar um emoji temático

**Exemplo de saída:**
```
🔄 Syncing projects from CORPUS...
   Copying novo-projeto...
   Copying outro-projeto...
✅ Synced 40 projects to projects.json
```

### 2. Como Remover um Projeto
1.  Apague a pasta do projeto de dentro de `CORPUS/`.
2.  Rode o comando de sincronização novamente:
    ```bash
    node scripts/sync-projects.js
    ```
3.  O projeto sumirá do site e da pasta pública automaticamente.

### 3. Como Editar um Projeto Existente
1.  Faça as alterações nos arquivos dentro de `CORPUS/SeuProjeto/`.
2.  Rode o comando de sincronização:
    ```bash
    node scripts/sync-projects.js
    ```
3.  As alterações serão copiadas para `projects/` e refletidas no site.

### 4. Trabalhando em Múltiplos Dispositivos (Importante)

> **Por que isso importa?** A pasta `CORPUS/` é ignorada pelo Git (ver `.gitignore`). Isso significa que ela **não é sincronizada** entre máquinas via `git pull`. Se você clonar o repositório em um novo computador, o `CORPUS/` estará presente (como pasta vazia visível pelo `.gitkeep`) — mas sem conteúdo. Rodar o sync sem restaurar primeiro **apagaria todos os projetos públicos**.

**Ao configurar uma nova máquina, faça isso UMA vez antes de qualquer edição:**

```bash
# 1. Clone o repositório normalmente
git clone <url-do-repositorio>
cd vitrine-SPA

# 2. Reconstitua o CORPUS a partir dos arquivos públicos já rastreados
node scripts/restore-corpus.js
```

O script copia todos os projetos de `projects/` → `CORPUS/`, sem sobrescrever pastas que já existam. Use `--force` para forçar sobrescrita:

```bash
node scripts/restore-corpus.js --force
```

A partir daí, o fluxo normal de edição volta a funcionar: edite em `CORPUS/`, rode o sync, faça commit.

> ⚠️ **Atenção**: se você fizer alterações num dispositivo A (sem commitar a versão atualizada do projeto em `projects/`), elas **não chegarão** ao dispositivo B. O Git rastreia a pasta `projects/`, não o `CORPUS/`. Então sempre rode o sync e faça commit antes de trocar de máquina.

---

## 🏗️ Arquitetura Simples

Este é um site estático leve. Não precisa de "build" complexo.

- **index.html**: A página principal (Vitrine).
- **viewer.html**: O visualizador seguro para os projetos.
- **CORPUS/**: Onde seus projetos originais vivem.
- **projects/**: Pasta gerada automaticamente para o site.
- **scripts/sync-projects.js**: O "robô" que organiza tudo para você.

## 🚀 Como Rodar Localmente

1.  **Apenas Visualizar:**
    Abra o arquivo `index.html` no seu navegador (Chrome, Edge, etc.).

2.  **Para Atualizar (Requer Node.js):**
    Você precisa do Node.js instalado apenas para rodar o script de sincronização.
