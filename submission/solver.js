function getParam(p) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(p);
}

equation = getParam("equation");
result_obj = balanceEquation(
  equation.split("->")[0],
  equation.split("->")[1]
);
console.log(result_obj)
console.log("Resultobj")
// parts = balanced_equation
//   .split(" -> ")[0]
//   .split(" + ")
//   .concat(balanced_equation.split(" -> ")[1].split(" + "));

console.log(parts);
result_obj = {};
parts.forEach((part) => {
    //https://regexr.com/7uc5a
   let matches = part.match(/(\d+)(\D\d+[a-zA-Z]*)/)
   if(matches){
    result_obj[matches[2]] = parseInt(matches[1]);
   }
   else{
    result_obj[part] = 1;
   }
});
console.log(result_obj);

firstMole = new Mole(getParam("stoichFromMolecule"));
dtype = getParam("stoichFromUnits");
if (dtype == "gas") {
  firstMole.from_stp(getParam("stoichFromAmt"));
} else if (dtype == "particles") {
  firstMole.from_particles(getParam("stoichFromAmt"));
} else if (dtype == "mass") {
  firstMole.from_mass(getParam("stoichFromAmt"));
} else if(dtype == "gas_general"){
    firstMole.from_arbitrary_gas(getParam("stoichFromAmt"), getParam("temp"),getParam("pressure"))
} else {
  firstMole.amt = new Decimal(getParam("stoichFromAmt"));
}

secondMole = new Mole(getParam("stoichToMolecule"));
console.log(secondMole)
console.log(getParam("stoichFromMolecule"))
console.log(result_obj[getParam("stoichFromMolecule")])
console.log(getParam("stoichToMolecule"))
console.log(result_obj[getParam("stoichToMolecule")])
firstMole.to_other_mole(
  secondMole,
  result_obj[getParam("stoichFromMolecule")],
  result_obj[getParam("stoichToMolecule")]
);
solved_result = "";
out_dtype = getParam("stoichToUnits");
if (out_dtype == "gas") {
  solved_result = secondMole.to_stp(getParam("stoichFromAmt"),getParam("stoichFromAmt"));
} else if (out_dtype == "particles") {
  solved_result = secondMole.to_particles(getParam("stoichFromAmt"),getParam("stoichFromAmt"));
} else if (out_dtype == "mass") {
  solved_result = secondMole.to_mass(getParam("stoichFromAmt"),getParam("stoichFromAmt"));
}else if (out_dtype=="gas_general"){
    solved_result = secondMole.to_arbitrary_gas(getParam("stoichFromAmt"),getParam("temp"), getParam("pressure"))
} else {
  solved_result = secondMole.amt + "\\ \\mathrm{mol}";
}

document.getElementById(
  "math"
).innerText = `$${secondMole.equ_prefix}=${solved_result}$`;

//alert(balanced_equation+"   "+parts)
