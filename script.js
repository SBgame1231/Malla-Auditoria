// Datos de los cursos (también podrían cargarse desde un JSON externo)
const cursosData = {
    semestres: [
        {
            numero: 1,
            cursos: [
                { nombre: "Microeconomía", requisitos: [] },
                { nombre: "Tecnologías de la información", requisitos: [] },
                { nombre: "Matemática esencial", requisitos: [] },
                { nombre: "Administración de empresas I", requisitos: [] },
                { nombre: "Derecho civil y material", requisitos: [] }
            ]
        },
        {
            numero: 2,
            cursos: [
                { nombre: "Macroeconomía", requisitos: ["Microeconomía"] },
                { nombre: "Álgebra", requisitos: ["Matemática esencial"] },
                { nombre: "Comunicación oral y escrita", requisitos: [] },
                { nombre: "Contabilidad esencial", requisitos: [] },
                { nombre: "Administración de empresas II", requisitos: ["Administración de empresas I"] },
                { nombre: "Derecho laboral y provisional", requisitos: ["Administración de empresas I"] }
            ]
        },
        // Agrega los demás semestres según sea necesario
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const mallaContainer = document.getElementById('malla-container');
    const tooltip = document.getElementById('tooltip');
    
    let scale = 1;
    
    // Renderizar malla
    function renderMalla() {
        mallaContainer.innerHTML = '';
        
        cursosData.semestres.forEach((semestre, semIndex) => {
            const semestreEl = document.createElement('div');
            semestreEl.className = 'semestre';
            semestreEl.style.left = `${100 + semIndex * 300}px';
            semestreEl.style.top = '50px';
            
            const titleEl = document.createElement('div');
            titleEl.className = 'semestre-title';
            titleEl.textContent = `Semestre ${semestre.numero}`;
            semestreEl.appendChild(titleEl);
            
            semestre.cursos.forEach((curso, cursoIndex) => {
                const cursoEl = document.createElement('div');
                cursoEl.className = `curso ${curso.requisitos.length === 0 ? 'sin-requisitos' : 'con-requisitos'}`;
                cursoEl.textContent = curso.nombre;
                cursoEl.style.top = `${50 + cursoIndex * 60}px`;
                
                // Eventos para tooltip
                cursoEl.addEventListener('mouseenter', (e) => {
                    tooltip.textContent = `${curso.nombre}${curso.requisitos.length > 0 ? 
                        '\nRequisitos: ' + curso.requisitos.join(', ') : '\nSin requisitos'}`;
                    tooltip.style.left = `${e.pageX + 10}px`;
                    tooltip.style.top = `${e.pageY + 10}px`;
                    tooltip.style.opacity = '1';
                });
                
                cursoEl.addEventListener('mouseleave', () => {
                    tooltip.style.opacity = '0';
                });
                
                semestreEl.appendChild(cursoEl);
            });
            
            mallaContainer.appendChild(semestreEl);
        });
        
        // Aplicar zoom
        mallaContainer.style.transform = `scale(${scale})`;
    }
    
    // Controles de zoom
    document.getElementById('zoom-in').addEventListener('click', () => {
        scale += 0.1;
        mallaContainer.style.transform = `scale(${scale})`;
    });
    
    document.getElementById('zoom-out').addEventListener('click', () => {
        if (scale > 0.5) {
            scale -= 0.1;
            mallaContainer.style.transform = `scale(${scale})`;
        }
    });
    
    document.getElementById('reset-view').addEventListener('click', () => {
        scale = 1;
        mallaContainer.style.transform = `scale(${scale})`;
    });
    
    // Renderizar inicialmente
    renderMalla();
});
