document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.getElementById('projectGrid');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    const currentYear = document.getElementById('currentYear');
    const indexContainer = document.getElementById('conceptualIndex');

    let allProjects = [];

    // Define o ano atual no rodapé
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Carrega projetos
    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(projects => {
            allProjects = projects;
            renderConceptualIndex(projects);
            renderProjects(projects);
        })
        .catch(error => {
            console.error('Erro ao carregar projetos:', error);
            if (projectGrid) {
                projectGrid.innerHTML = '<p style="color: var(--color-text-secondary); padding: 2rem;">Erro ao carregar os projetos. Verifique o console para detalhes.</p>';
            }
        });

    // Índice Conceitual
    function renderConceptualIndex(projects) {
        if (!indexContainer) return;

        const conceptCounts = {};
        projects.forEach(p => {
            if (p.concepts) {
                p.concepts.forEach(c => {
                    conceptCounts[c] = (conceptCounts[c] || 0) + 1;
                });
            }
        });

        // Ordenar conceitos por contagem
        const sortedConcepts = Object.entries(conceptCounts)
            .sort((a, b) => b[1] - a[1]);

        let html = `<button class="concept-pill active" data-concept="all">Todos <span class="count">${projects.length}</span></button>`;

        sortedConcepts.forEach(([concept, count]) => {
            html += `<button class="concept-pill" data-concept="${concept}">${concept} <span class="count">${count}</span></button>`;
        });

        indexContainer.innerHTML = html;

        // Event listeners para filtro
        indexContainer.querySelectorAll('.concept-pill').forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                indexContainer.querySelectorAll('.concept-pill').forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                const selectedConcept = btn.dataset.concept;
                filterProjects(selectedConcept, searchInput ? searchInput.value : '');
            });
        });
    }

    function filterProjects(concept, searchTerm) {
        searchTerm = (searchTerm || '').toLowerCase().trim();

        const filtered = allProjects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchTerm) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                project.description.toLowerCase().includes(searchTerm);

            const matchesConcept = concept === 'all' || (project.concepts && project.concepts.includes(concept));

            return matchesSearch && matchesConcept;
        });

        renderProjects(filtered);
    }

    // Funcionalidade de busca com debounce leve
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const activeConceptBtn = document.querySelector('.concept-pill.active');
                const activeConcept = activeConceptBtn ? activeConceptBtn.dataset.concept : 'all';
                filterProjects(activeConcept, e.target.value);
            }, 150);
        });
    }

    function renderProjects(projects) {
        if (!projectGrid) return;

        projectGrid.innerHTML = '';

        if (projects.length === 0) {
            if (noResults) noResults.style.display = 'block';
            projectGrid.setAttribute('aria-live', 'polite');
            return;
        }

        if (noResults) noResults.style.display = 'none';

        projects.forEach(project => {
            const card = document.createElement('a');
            card.href = `viewer.html?id=${project.id}`;
            card.className = 'project-card';
            card.setAttribute('role', 'listitem');
            card.setAttribute('aria-label', `Abrir projeto: ${project.title}`);

            const emoji = project.emoji || '🧪';

            card.innerHTML = `
        <div class="card-header">
          <div class="project-emoji" aria-hidden="true">${emoji}</div>
        </div>
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-desc">${escapeHtml(project.description)}</p>
        <div class="card-footer">
          ${project.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
      `;

            projectGrid.appendChild(card);
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
