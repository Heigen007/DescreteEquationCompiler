function evaluate(expression){
    expression = expression.replace(new RegExp("!1", "g"), 0)
    expression = expression.replace(new RegExp("!0", "g"), 1)

    while(expression.includes("(")) {
        for (let i = 0; i < expression.length; i++) {
            if(expression[i] == "("){
                inner: for (let b = i; b < expression.length; b++) {
                    if(expression[b] == "(") {
                        i = b;
                        continue;
                    }
                    if(expression[b] == ")") {
                        let tmp = expression.slice(i, b+1)
                        expression = expression.replace(tmp, replaceExp(tmp))
                        break inner;
                    }
                }
            }
        }
        expression = expression.replace(new RegExp("!1", "g"), 0)
        expression = expression.replace(new RegExp("!0", "g"), 1)
    }
    expression = replaceExp("(" + expression + ")")
    return expression
}

function replaceExp(expression){
    var [,a,operation,b,] = expression
    a = Number(a)
    b = Number(b)
    switch(operation) {
        case "&":
            return a & b
        case "|":
            return a | b
        case ">":
            return !a | b
        case "~":
            return (a == b) ? 1 : 0
    }
    alert("Вы ввели неправильную формулу. Проверьте скобки и операторы")
    throw new Error("Вы ввели неправильную формулу. Проверьте скобки и операторы")
}