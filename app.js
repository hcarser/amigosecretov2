let nombres = [];
        let todosVisibles = false;

        function agregarNombre() {
            const input = document.getElementById('nombreInput');
            const nombre = input.value.trim();
            
            if (nombre && !nombres.includes(nombre)) {
                nombres.push(nombre);
                actualizarListaNombres();
                input.value = '';

                if (nombres.length >= 2) {
                    document.getElementById('sortearBtn').classList.remove('hidden');
                }
            } else if (nombres.includes(nombre)) {
                alert('Este nombre ya ha sido agregado');
            }
        }

        function eliminarNombre(index) {
            nombres.splice(index, 1);
            actualizarListaNombres();
            if (nombres.length < 2) {
                document.getElementById('sortearBtn').classList.add('hidden');
            }
            document.getElementById('resultadosContainer').classList.add('hidden');
        }

        function actualizarListaNombres() {
            const lista = document.getElementById('nombres');
            lista.innerHTML = '';
            nombres.forEach((nombre, index) => {
                const li = document.createElement('li');
                li.className = 'flex justify-between items-center py-1';
                li.innerHTML = `
                    <span class="text-gray-700">${nombre}</span>
                    <button 
                        onclick="eliminarNombre(${index})" 
                        class="text-red-500 hover:text-red-700 ml-2 font-bold text-lg"
                        title="Eliminar"
                    >
                        ×
                    </button>
                `;
                lista.appendChild(li);
            });
        }

        function toggleResultado(index, forzarEstado = null) {
            const resultado = document.getElementById(`resultado-${index}`);
            const pareja = resultado.querySelector('.pareja');
            const boton = resultado.querySelector('button');
            
            const nuevoEstado = forzarEstado !== null ? forzarEstado : pareja.style.display === 'none';
            
            pareja.style.display = nuevoEstado ? 'inline' : 'none';
            boton.textContent = nuevoEstado ? 'Ocultar' : 'Mostrar';
        }

        function toggleTodosResultados() {
            todosVisibles = !todosVisibles;
            const toggleTodosBtn = document.getElementById('toggleTodosBtn');
            toggleTodosBtn.textContent = todosVisibles ? 'Ocultar Todos' : 'Mostrar Todos';
            
            nombres.forEach((_, index) => {
                toggleResultado(index, todosVisibles);
            });
        }

        function sortearNombres() {
            if (nombres.length < 2) {
                alert('Debe agregar al menos 2 nombres');
                return;
            }

            const resultadosContainer = document.getElementById('resultadosContainer');
            const resultados = document.getElementById('resultados');
            resultadosContainer.classList.remove('hidden');
            resultados.innerHTML = '';
            todosVisibles = false;
            document.getElementById('toggleTodosBtn').textContent = 'Mostrar Todos';

            let disponibles = [...nombres];

            nombres.forEach((nombre, index) => {
                if (disponibles.length === 0) return;

                const posiblesParejas = disponibles.filter(n => n !== nombre);
                
                if (posiblesParejas.length === 0) return;

                const indexPareja = Math.floor(Math.random() * posiblesParejas.length);
                const pareja = posiblesParejas[indexPareja];

                const parResult = document.createElement('div');
                parResult.id = `resultado-${index}`;
                parResult.className = 'flex justify-between items-center mb-2';
                parResult.innerHTML = `
                    <div>
                        <strong>${nombre}</strong> → 
                        <span class="pareja text-blue-600" style="display: none">${pareja}</span>
                    </div>
                    <button 
                        onclick="toggleResultado(${index})" 
                        class="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                        Mostrar
                    </button>
                `;
                resultados.appendChild(parResult);

                disponibles = disponibles.filter(n => n !== pareja);
            });
        }

        document.getElementById('nombreInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                agregarNombre();
            }
        });