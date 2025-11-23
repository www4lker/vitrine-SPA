<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Meu Portfólio Experimental

Uma coleção de resumos interativos e aplicações de página única (SPA) geradas via IA. Estes são protótipos experimentais que exploram novas formas de visualizar informações complexas.

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
