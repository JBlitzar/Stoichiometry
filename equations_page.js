
window.equations.forEach((equation)=>{

    let newEl = document.createElement("li")
    let mathEl = document.createElement("math")
    equation = "$"+equation.replace(/\d+/g, function (match) {
        return "_{" + match+"}";
      })+"$";
    mathEl.innerText = equation
    newEl.appendChild(mathEl)
    document.getElementById("list").appendChild(newEl)
})
setTimeout(()=>{
    renderMathInElement(document.body);
},1000)
