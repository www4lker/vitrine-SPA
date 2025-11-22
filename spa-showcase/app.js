document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.getElementById('projectGrid');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    const currentYear = document.getElementById('currentYear');

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
            renderProjects(projects);
        })
        .catch(error => {
            console.error('Erro ao carregar projetos:', error);
            projectGrid.innerHTML = '<p style="color: var(--color-text-secondary); padding: 2rem;">Erro ao carregar os projetos. Verifique o console para detalhes.</p>';
        });

    // Funcionalidade de busca com debounce leve
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const filteredProjects = allProjects.filter(project =>
                project.title.toLowerCase().includes(searchTerm) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                project.description.toLowerCase().includes(searchTerm)
            );
            renderProjects(filteredProjects);
        }, 150);
    });

    function renderProjects(projects) {
        projectGrid.innerHTML = '';

        if (projects.length === 0) {
            noResults.style.display = 'block';
            projectGrid.setAttribute('aria-live', 'polite');
            return;
        }

        noResults.style.display = 'none';

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

    function formatDate(dateString) {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
