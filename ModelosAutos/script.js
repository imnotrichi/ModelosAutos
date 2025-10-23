const marcasSelect = document.getElementById('marcas');
const selectContainer = document.getElementById('select-container');
const modelosSelect = document.getElementById('modelos');

fetch('http://localhost:8888/marcas')
    .then(response => response.text())
    .then(data => {
        const marcas = data.split('\n');
        marcas.forEach(marca => {
            const option = document.createElement('option');
            option.value = marca;
            option.textContent = marca;
            marcasSelect.appendChild(option);
        });

        marcasSelect.addEventListener('change', () => {
            const selectedMarca = marcasSelect.value;
            cargarModelos(selectedMarca);
        });
    });

function cargarModelos(marca) {
    fetch(`http://localhost:8888/modelos/${marca}`)
        .then(response => response.text())
        .then(data => {
            const modelos = data.split('\n');
            modelosSelect.innerHTML = '<option value="">Seleccion un modelo</option>';
            modelos.forEach(modelo => {

                const option = document.createElement('option');
                option.value = modelo;
                option.textContent = modelo;

                const marcaSinEspacios = marca.trim();
                option.classList.add(`is-${marcaSinEspacios}`);
                modelosSelect.appendChild(option);
            });
        });
}

modelosSelect.addEventListener('change', () => {
    const modelo = modelosSelect.value;
    if (modelo) {
        alert(`Modelo seleccionado: ${modelo}`);
    }
});
