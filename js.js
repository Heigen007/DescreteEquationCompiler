String.prototype.replaceAt = function(index, replacement, add = 0) {
    return this.slice(0, index) + replacement + this.slice(index - add + replacement.length);
}

document.getElementById("button").onclick = drawTable

function drawTable() {
    var answer = []
    var logicalOperands = ['&','|','(',')','!','>','~']
    var set = new Set()
    var paramsArr, paramsNum
    var logicalExp = document.getElementById("input").value
    .replace(/ /g,"")
    .replace(/→/g,">")
    .replace(/↔/g,"~")
    .replace(/¬/g,"!")
    .replace(/∧/g,"&")
    .replace(/∨/g,"|")
    
    for (let i = 0; i < logicalExp.length; i++) {
        !logicalOperands.includes(logicalExp[i]) && set.add(logicalExp[i])
    }
    
    paramsArr = Array.from(set)
    paramsNum = paramsArr.length
   
    for (let i = 0; i < 2**paramsNum; i++) {
        let tmpStr = i.toString(2)
        let logicalExpCopy = logicalExp
        let currentNums = []
        for (let l = 0; l < paramsNum - i.toString(2).length; l++)
            tmpStr = "0" + tmpStr
        for (let b = 0; b < paramsArr.length; b++) {
            currentNums.push(Number(tmpStr[b]))
            logicalExpCopy = logicalExpCopy.replace(new RegExp(paramsArr[b], "g"), Number(tmpStr[b]))
        }
        currentNums.push(evaluate(logicalExpCopy))
        answer.push(currentNums)
    }
    loadTableData(paramsArr,answer)
}

function loadTableData(paramsArr, items) {
    paramsArr.push("Answer");
    let data = [
        paramsArr,
        ...items
    ];
      
    function getCells(data, type) {
        return data.map(cell => `<${type}>${cell}</${type}>`).join('');
    }
    
    function createBody(data) {
        return data.map(row => `<tr>${getCells(row, 'td')}</tr>`).join('');
    }
    
    function createTable(data) {
        const [headings, ...rows] = data;
        return `
            <table>
            <thead>${getCells(headings, 'th')}</thead>
            <tbody>${createBody(rows)}</tbody>
            </table>
        `;
    }
    document.querySelector("table")?.remove()

    document.body.insertAdjacentHTML('beforeend', createTable(data));
}