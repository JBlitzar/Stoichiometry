function getParam(p){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(p)
}

equation = getParam("equation")
balanced_equation = balanceEquation(equation.split("->")[0], equation.split("->")[1])
parts = balanced_equation.split(" -> ")[0].split(" + ").concat(balanced_equation.split(" -> ")[0].split(" + "))

result_obj = {}
parts.forEach((part)=>{

    result_obj[part.slice(1)] = part[0]
})
console.log(result_obj)


firstMole = new Mole(getParam("stoichFromMolecule"))
dtype = getParam("stoichFromUnits")
if(dtype == "gas"){
    firstMole.from_stp(getParam("stoichFromAmt"))
}else if(dtype == "particles"){
    firstMole.from_particles(getParam("stoichFromAmt"))
}else if(dtype == "mass"){
    firstMole.from_mass(getParam("stoichFromAmt"))
}else{
    firstMole.amt = getParam("stoichFromAmt")
}


secondMole = new Mole(getParam("stoichToMolecule"))
firstMole.to_other_mole(secondMole, result_obj[getParam("stoichFromMolecule")], result_obj[getParam("stoichFromMolecule")])
solved_result = ""
out_dtype = getParam("stoichToUnits")
if(out_dtype == "gas"){
    solved_result = secondMole.to_stp(getParam("stoichFromAmt"))
}else if(out_dtype == "particles"){
    solved_result=secondMole.to_particles(getParam("stoichFromAmt"))
}else if(out_dtype == "mass"){
    solved_result=secondMole.to_mass(getParam("stoichFromAmt"))
}else{
    solved_result = secondMole.amt + " mol"
}

document.getElementById("math").innerText = `$${secondMole.equ_prefix}=${solved_result}$`

//alert(balanced_equation+"   "+parts)