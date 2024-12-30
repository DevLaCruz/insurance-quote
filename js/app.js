// Constructor para insurance
function Insurance(brand, year, type) {
    this.brand = brand;
    this.year = year;
    this.type = type;
}
Insurance.prototype.quoteInsurance = function () {
    /*
         1 = americano 1.15
         2 = asiatico 1.05
         3 = europeo 1.35
    */
    let quantity;
    const base = 2000;

    switch (this.brand) {
        case '1':
            quantity = base * 1.15;
            break;
        case '2':
            quantity = base * 1.05;
            break;
        case '3':
            quantity = base * 1.35;
            break;
    }

    // Leer el año
    const diferencia = new Date().getFullYear() - this.year;
    // Cada año de diferencia hay que reducir 3% el valor del insurance
    quantity -= ((diferencia * 3) * quantity) / 100;
    /*
         Si el insurance es básico se múltiplica por 30% mas
         Si el insurance es completo 50% mas
    */
    if (this.type === 'basico') {
        quantity *= 1.30;
    } else {
        quantity *= 1.50;
    }

    return quantity;

}

// Todo lo que se muestra
function Interfaz() { }

// Mensaje que se imprime en el HTML
Interfaz.prototype.showMessage = function (mensaje, type) {
    const div = document.createElement('div');

    if (type === 'error') {
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add('mensaje', 'correcto');
    }
    div.classList.add('mt-10');
    div.innerHTML = `${mensaje}`;
    form.insertBefore(div, document.querySelector('#resultado')); // Nuevo Nodo y referencia... // Si la referencia no existe se añadira al final

    setTimeout(() => {
        document.querySelector('.mensaje').remove();
    }, 3000);
}

// Imprime el resultado de la cotización
Interfaz.prototype.mostrarResultado = function (insurance, total) {
    const resultado = document.querySelector('#resultado');
    let brand;
    switch (insurance.brand) {
        case '1':
            brand = 'Americano';
            break;
        case '2':
            brand = 'Asiatico';
            break;
        case '3':
            brand = 'Europeo';
            break;
    }
    // Crear un div
    const div = document.createElement('div');
    div.classList.add('mt-10')
    // Insertar la informacion
    div.innerHTML = `
         <p class='header'>Tu Resumen: </p>
         <p class="font-bold">brand: <span class="font-normal"> ${brand} </span> </p>
         <p class="font-bold">Año: <span class="font-normal"> ${insurance.year} </span> </p>
         <p class="font-bold">type: <span class="font-normal"> ${insurance.type} </span> </p>
         <p class="font-bold"> Total: <span class="font-normal"> $ ${total} </span> </p>
    `;

    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 3000);

}

Interfaz.prototype.fillOptions = function () {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectyears = document.querySelector('#year');
    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        selectyears.appendChild(option);
    }
}

// Crear instancia de Interfaz
const interfaz = new Interfaz();

document.addEventListener('DOMContentLoaded', () => {
    interfaz.fillOptions()
});

// DOM Operaciones
const form = document.querySelector('#cotizar-seguro');

form.addEventListener('submit', e => {
    e.preventDefault();

    // leer la brand seleccionada del selectMarca
    const brand = document.querySelector('#marca').value;

    // leer el año seleccionado del <select>
    const year = document.querySelector('#year').value

    // lee el valor del radio button
    const type = document.querySelector('input[name="tipo"]:checked').value;



    // Revisamos que los campos no esten vacios
    if (brand === '' || year === '' || type === '') {
        // Interfaz imprimiendo un error
        interfaz.showMessage('Faltan datos, revisar el form y prueba de nuevo', 'error');
    } else {
        // Limpiar results anteriores
        const results = document.querySelector('#resultado div');
        if (results != null) {
            results.remove();
        }

        // Instanciar insurance y mostrar interfaz
        const insurance = new Insurance(brand, year, type);
        // Cotizar el insurance
        const quantity = insurance.quoteInsurance();
        // Mostrar el resultado
        interfaz.mostrarResultado(insurance, quantity);
        interfaz.showMessage('Cotizando...', 'exito');
    }

});
