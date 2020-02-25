let campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];

let tbody = document.querySelector('table tbody');

document.querySelector('.form').addEventListener('submit', function (event) {
    
    event.preventDefault();

    let tr = document.createElement('tr');
    campos.forEach((c) =>{
        let td = document.createElement('td');
        td.textContent = c.value;
        tr.appendChild(td);
    });

    let tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;
    
    tr.appendChild(tdVolume);
    
    tbody.appendChild(tr);
    this.reset();

    //da o foco para a data
    campos[0].focus();
});