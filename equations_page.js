function addEquation(equation, parent) {
  let newEl = document.createElement("li");
  let mathEl = document.createElement("math");
  equation_n =
    "$\\mathrm{" +
    equation
      .replace(/\d+/g, function (match) {
        return "_{" + match + "}";
      })
      .replace("->", "\\rightarrow ") +
    "}$";
  mathEl.innerText = equation;
  newEl.appendChild(mathEl);
  parent.appendChild(newEl);
}

for (const [key, value] of Object.entries(window.equations_types)) {
  console.log(`${key}: ${value}`);
  let sublistContainer = document.createElement("li");
  sublistContainer.innerText = key;
  let sublist = document.createElement("ul");
  sublistContainer.appendChild(sublist);

  value.forEach((equation) => {
    addEquation(equation, sublist);
  });
  document.getElementById("list").appendChild(sublistContainer);
}
setTimeout(() => {
  renderMathInElement(document.body);
}, 1000);
