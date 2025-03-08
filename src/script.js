const inputFileA = document.getElementById('inputFileA');
const inputFileB = document.getElementById('inputFileB');
const btnDiff = document.getElementById('btnDiff');
const unifiedoutput = document.getElementById('unifieddiff');

let delCount = 0;
let addCount = 0;

let contentA = "";
let contentB = "";

let linesFileA = []
let linesFileB = []
let unifiedDiffMap = new Map();


inputFileA.addEventListener('change', () => {
    
    console.log('fileadded A');

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader()
    reader.onload = function () {
        contentA = reader.result;
    }

    reader.readAsText(file);

})


inputFileB.addEventListener('change', () => {
    
    console.log('fileadded B');

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader()
    reader.onload = function () {
        contentB = reader.result; 
    }

    reader.readAsText(file);
})

btnDiff.onclick = () =>  { generateDiff() };



function generateDiff() {
    splitToLines();
    generateUnifiedDiffMap()
    renderUnifiedDiffDOM();
    
}

function splitToLines() {

    let startSpliceIdxA = 0;
    let startSpliceIdxB = 0;

    for (let i = 0; i < contentA.length; i++){
        
        if (contentA[i] == '\n') {
            linesFileA.push(contentA.slice(startSpliceIdxA, i))
            startSpliceIdxA = i + 1;
        }
        if (i == contentA.length - 1) {
            linesFileA.push(contentA.slice(startSpliceIdxA, i))
        }
        
    }
    console.log(linesFileA);
    for (let i = 0; i < contentB.length; i++){
        
        if (contentB[i] == '\n') {
            linesFileB.push(contentB.slice(startSpliceIdxB, i))
            startSpliceIdxB = i + 1;
        }
        if (i == contentB.length - 1) {
            linesFileB.push(contentB.slice(startSpliceIdxB, i))
        }
    }
    console.log(linesFileB);
}

function generateUnifiedDiffMap() {
    
    linesFileA.map((val, idx, arr) => {
        
        if (linesFileA[idx] == (linesFileB[idx])) {
            unifiedDiffMap.set(idx, val)
        }
        else {
            unifiedDiffMap.set(`${idx}-D`, val)
            unifiedDiffMap.set(`${idx}-A`, linesFileB[idx])
            delCount++;
            addCount++;
        }       
    })

    console.log(unifiedDiffMap);
}

function renderUnifiedDiffDOM() {
    


    unifiedDiffMap.forEach((value, key) => {
        const tr = document.createElement('tr');

        const td = document.createElement('td');
        td.innerHTML = `${key}:`
        if (key.toString().includes("-D")) {
            td.className = 'del'
        }
        else if (key.toString().includes("-A")) {
            td.className = 'add' 
        }
        td.setAttribute('colspan', '2');
        tr.appendChild(td);
        const td2 = document.createElement('td');
        td2.innerHTML = `${value}`
        if (key.toString().includes("-D")) {
            td2.className = 'del'
        }
        else if (key.toString().includes("-A")) {
            td2.className = 'add' 
        }
        tr.appendChild(td2);
        
        unifiedoutput.appendChild(tr);
    })

}