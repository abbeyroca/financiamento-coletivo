// const sheetId = '1AU5DP5U2MBoTe-uJm5tI2yRV_G2fZHTG-hUjUtxwSpk';
const sheetId = '1qIkY4wpea9GL9ww6WpL_OFMLSripNDET7-sJ6vvSMf4';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Teste (respostas)';
const query = encodeURIComponent("Select *")
// const sheetName = 'Esquadrão da Roça Vol. 2 (respostas)';
// const query = encodeURIComponent("Select *")
const url = `${base}&sheet=${sheetName}&tq=${query}`

const data = []
document.addEventListener('DOMContentLoaded', init)
const output = document.querySelector('.output')
function init() {
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            //Apaga textos adicionais e extrai so o JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            const colz = [];
            const tr = document.createElement('tr');
            //Extrai nome das colunas
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                  colz.push(column);
                  let column = heading.label;
                  if (column === "Nome completo") {
                    console.log(column)
                    column = "valeu galera!"
                    const th = document.createElement('th');
                    th.innerText = column;
                    tr.appendChild(th);
                  }
                }
            })
            output.appendChild(tr);
            //Extrai dados das linhas
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                  console.log('ele', ele, 'ind',  ind)
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data.push(row);
            })
            processRows(data);
        })
}

function processRows(json) {
    json.forEach((row) => {
        const tr = document.createElement('tr');
        const keys = Object.keys(row);

        keys.forEach((key) => {
            const td = document.createElement('td');
            td.textContent = row[key];
            tr.appendChild(td);
        })
        output.appendChild(tr);
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