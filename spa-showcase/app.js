document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.getElementById('projectGrid');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    const currentYear = document.getElementById('currentYear');

    let allProjects = [];

    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Fetch projects
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            allProjects = projects;
            renderProjects(projects);
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            projectGrid.innerHTML = '<p class="error-message">Error loading projects. Please check console.</p>';
        });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProjects = allProjects.filter(project =>
            project.title.toLowerCase().includes(searchTerm) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        renderProjects(filteredProjects);
    });

    function renderProjects(projects) {
        projectGrid.innerHTML = '';

        if (projects.length === 0) {
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';

        projects.forEach(project => {
            const card = document.createElement('a');
            card.href = `viewer.html?id=${project.id}`;
            card.className = 'project-card';

            const emoji = project.emoji || '🧪';

            card.innerHTML = `
        <div class="card-header">
          <div class="project-emoji">${emoji}</div>
          <span class="project-date">${formatDate(project.date)}</span>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="card-footer">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      `;

            projectGrid.appendChild(card);
        });
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' });
    }
});
