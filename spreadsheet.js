const sheetId = '1RvSs9mEKyiIBi9JuAZlS5LJWjI9f2ThTe7ozMlFNUBk';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Financiamento - Legaliza o Abbey! (respostas)';
const query = encodeURIComponent("Select B, E, F, G, H, I, J, K")
const url = `${base}&sheet=${sheetName}&tq=${query}`
// Precos por coluna
const prices = [0, 20, 50, 80, 300, 200, 400, 500]

const data = []
document.addEventListener('DOMContentLoaded', init)
const output = document.querySelector('.output')
function init() {
  console.log("INIT!!!")
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            //Apaga textos adicionais e extrai so o JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            const colz = [];
            const tr = document.createElement('tr');
            //Extrai nome das colunas
            jsonData.table.cols.forEach((heading) => {
                let column = heading.label;
                colz.push(column);
                  // column = "valeu galera!"
                  const th = document.createElement('th');
                  // th.innerText = column;
                  tr.appendChild(th);
        
            })
            // output.appendChild(tr);
            //Extrai dados das linhas
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data.push(row);
            })
            processRows(data);
        })
}

function processRows(json) {
  var total = 0.0
  var progressBar = document.getElementById("myBar");
    json.forEach((row) => {
        const tr = document.createElement('tr');
        const keys = Object.keys(row);

        keys.forEach((key) => {
            const td = document.createElement('td');
            console.log("Key " + key + "Row " + row[key])
            td.textContent = row[key];
            tr.appendChild(td);
        })
        // output.appendChild(tr);
    })
}

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
} 