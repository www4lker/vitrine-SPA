# Experimentos em SPA: Curiosidade Automatizada

Este portfólio documenta uma jornada experimental com IA generativa aplicada à criação de páginas web de conteúdo denso.

## 🧪 Sobre Este Projeto

Este pesquisador, inicialmente atraído pelas capacidades de codificação da IA, rapidamente se desinteressou pela geração de imagens (que consome muita energia, produz pouca novidade e pode ser antiética). Ele migrou para a criação de **Single Page Applications (SPAs)**, motivado por:

1. **Curiosidade pelo "vibe coding"** — a experiência de co-criar código com ferramentas generativas.
2. **Fascínio pela automação** — usar ferramentas como Deep Research do Google Gemini para transformar ideias e pesquisas em páginas web interativas.
3. **Liberdade criativa** — poder explorar virtualmente qualquer ideia, qualquer lampejo de curiosidade, sem julgamento de qualidade ou veracidade absoluta.

> **Importante**: Os conteúdos aqui apresentados **não são avaliados quanto à qualidade ou veracidade dos fatos**, nem são atestados pelo autor. Trata-se de um **experimento metodológico** sobre o uso de IA para exploração de ideias.

## 🔬 Metodologia

Muitos destes sites foram gerados com a assistência do Gemini, do **Deep Research**, e do **Canvas**, ferramenta que integra pesquisa e documentos densos (10+ páginas) em geração automática de SPAs. 

Sempre que possível (mas não em todos os casos), o pesquisador tentou incluir **links para os documentos originais no rodapé** das páginas e até mesmo os prompts usados, permitindo verificação por parte de interessados.

## 📬 Transparência e Responsabilidade

O autor está **aberto a remover ou retificar qualquer fato que estiver incorreto e for danoso**. 

Para correções, sugestões ou dúvidas:
- **Email**: [barros@mdcc.walker.eco.br](mailto:barros@mdcc.walker.eco.br)
- **Bluesky**: [@walker.eco.br](https://bsky.app/profile/walker.eco.br)

## 🌐 Manifesto

> Que possamos usar essas ferramentas para **florescer nossa criatividade** e tornar a web, novamente, um lugar de **descoberta e esquisitice**.

---

## 📘 Guia de Uso e Atualização

Para manter o site organizado e funcionando, siga esta **Regra de Ouro**:
> **Sempre mexa na pasta `CORPUS`, nunca na pasta `projects`.**

A pasta `projects` é gerada automaticamente. Se você mudar algo lá, perderá as alterações na próxima sincronização.

### 1. Como Adicionar um Novo Projeto
1.  Copie a pasta do seu projeto para dentro de `CORPUS/`.
2.  Abra o terminal na pasta raiz do portfólio.
3.  Rode o comando de sincronização:
    ```bash
    node scripts/sync-projects.js
    ```
4.  Pronto! O script vai copiar o projeto para o lugar certo, identificar o tema (IA, Neurociência, etc.) e atualizar o site.

### 2. Como Remover um Projeto
1.  Apague a pasta do projeto de dentro de `CORPUS/`.
2.  Rode o comando de sincronização novamente:
    ```bash
    node scripts/sync-projects.js
    ```
3.  O projeto sumirá do site e da pasta pública.

### 3. Como Editar um Projeto Existente
1.  Faça as alterações nos arquivos dentro de `CORPUS/SeuProjeto/`.
2.  Rode o comando de sincronização:
    ```bash
    node scripts/sync-projects.js
    ```
    *(Isso garante que suas edições sejam publicadas corretamente)*.

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
