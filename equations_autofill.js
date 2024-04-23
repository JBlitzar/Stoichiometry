function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

let equation = choose(window.equations)

document.getElementById("equation").value = equation

equation = equation.replace("->", "+").split("+")

let compound1 = choose(equation)
document.getElementById("stoichFromMolecule").value = compound1
let compound2 = choose(equation)
document.getElementById("stoichToMolecule").value = compound2


function selectElement(id, valueToSelect) {    
    let element = document.getElementById(id);
    element.value = valueToSelect;
}
molemap_values = ["gas_general", "gas", "particles", "mass", "mol"]

selectElement("stoichToUnits", choose(molemap_values))
let fromUnits = choose(molemap_values)
selectElement("stoichFromUnits", fromUnits)

document.getElementById("stoichFromAmt").value = Math.ceil(Math.random()*20).toString()+".000"
if(fromUnits == "particles"){
    document.getElementById("stoichFromAmt").value = (Math.ceil(Math.random()*20)*1e23).toString()
}
