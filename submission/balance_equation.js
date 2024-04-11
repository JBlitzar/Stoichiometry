function checkStackedSquare(a) {
  const m = a.length;
  const n = a[0].length;
  if (m !== n) {
    return false;
  }
  return true;
}

function isInt(a) {
  const epsilon = 0.001;
  const remainder = a % 1;
  if (a % 1 === 0) {
    return true;
  }
  if (Math.abs(1 - remainder) < epsilon) {
    return true;
  }
  if (remainder < epsilon) {
    return true;
  }
  return false;
}
function splitIntoCapitalSections(str) {
  // Hi2AbcL235G -> ["Hi", "Abc", "L235", "G"]
  const sections = [];
  let currentSection = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = char;
    } else {
      currentSection += char;
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

function stringToDict(chemicalFormula) {
  elementDict = {};
  chemicalFormula = splitIntoCapitalSections(chemicalFormula);
  chemicalFormula.forEach((atom) => {
    element = atom.replace(/[0-9]/g, "");
    amt = parseInt(atom.replace(/[^0-9]/g, "")) || 1;
    elementDict[element] = amt;
  });
  return elementDict;
}

function balanceEquation(reactants, products) {
  result_balanced = balanceEquationMachineReadable(reactants, products)
  reactants = reactants.split("+").map(stringToDict)
  products = products.split("+").map(stringToDict);
  x = result_balanced[0]
  let result = "";
  idx = 0

  for (const [name, coef] of Object.entries(result_balanced)) {
    idx += 1;

    
    let amountStr = Math.round(coef).toString();
    if (Math.floor(coef) === 1) {
      amountStr = "";
    }
    result += amountStr + name + " ";
    if (idx === reactants.length) {
      result += "-> ";
    } else if (idx !== (reactants.length + products.length)) {
      result += "+ ";
    }
    
    
  }
  if(result.endsWith(" 0undefined + ")){
    result =  result.slice(0, -" 0undefined + ".length)
  }
  console.log(result)

  return result;
}

function bruteForce(a, b, maxtries, l){
  function* generateCombinations(n) {
    let length = n; // Initial length of the sequence
    let maxDigit = 1; // Maximum digit value

    while (true) {
        for (let i = 0; i < Math.pow(maxDigit + 1, length); i++) {
            yield i.toString(maxDigit + 1)
                .padStart(length, '0')
                .split('')
                .map(digit => parseInt(digit, maxDigit + 1));
        }
        length++; // Increase length
        maxDigit++; // Increase maximum digit value
    }
}
  function checkCriterion(a,x,b){
    return math.multiply(a, x) == b
  }

  n = math.size(a)[0]//b.length
  var stop_ = false
  const generator = generateCombinations(n);
  i = 0
  while(!stop_){
    if(i != 0){
      val = generator.next().value
      if(checkCriterion(a, val, b)){
        stop_ = true
        return val
      }
    }else if(i > maxtries){
      return False
    }
    i ++;
    
  }
}



function balanceEquationMachineReadable(reactants, products) {
  let ogReactants = reactants;
  let ogProducts = products;
  let ogCombined = ogReactants.split("+").concat(ogProducts.split("+"));

  reactants = reactants.split("+").map(stringToDict);
  products = products.split("+").map(stringToDict);

  let allElements = new Set();
  for (const compound of [...reactants, ...products]) {
    for (const element of Object.keys(compound)) {
      allElements.add(element);
    }
  }
  console.log(reactants)
  console.log(products)
  let matrix = [];
  for (const element of allElements) {
    let row = reactants
      .map((compound) => compound[element] || 0)
      .concat(products.map((compound) => (-1 * (compound[element] || 0))+1-1));//+1-1 turns -0 into 0
    matrix.push(row);
  }
  console.log(matrix)
  let append1AtTheEndOfB = false
  if(checkStackedSquare(matrix)){
    console.log("Rectangularifying")
    let newMatrix = []
    for(const row of matrix){
      row.push(0)
      newMatrix.push(row)
    }

    matrix = newMatrix
    append1AtTheEndOfB = true;
    console.log(matrix)
  }
  

  let i = 0;
  while (!checkStackedSquare(matrix)) {
    console.log('Adding constrings')
    let constraintRow = Array(reactants.length + products.length).fill(0);
    constraintRow[i] = 1;
    if(append1AtTheEndOfB){
      constraintRow.push(0)
    }
    matrix.push(constraintRow);
    i += 1;
  }

  console.log(matrix)
  matrix = math.matrix(matrix);
  
  let b = Array(reactants.length + products.length).fill(0);
  b.fill(1, b.length - (i-Number(append1AtTheEndOfB)));
  if(append1AtTheEndOfB){
    b.push(1)
  }
  console.log(b)

  let x = math.lusolve(matrix, b)._data;
  let commonMult = 1;
  x.forEach((val)=>{

    if(!isInt(val * commonMult)){
      console.log((val * commonMult) % 1)
      frac = math.fraction((val * commonMult) % 1)

      
      commonMult *= frac.d
      
      console.log(commonMult)
      
    }
  })
  x = x.map((val) => val * commonMult);
  // if (x.some((val) => !isInt(val))) {
  //   x = x.map((val) => val * 2);
  // }
  // if (x.some((val) => !isInt(val))) {
  //   x = x.map((val) => val * 3);
  // }
  if (x.some((val) => !isInt(val))) {
    console.log("red flag", x);
  }
  // if(x.reduce((accumulator, currentValue) => accumulator + currentValue, 0) == 0){
  //   console.log("bruteforcing...")
  //   x = bruteForce(matrix, b, 1000, x.length)
  // }


  let result = {};
  x.forEach((coef, idx) => {
    result[ogCombined[idx]] = coef
    
  });
  console.log(result);
  console.log("Result^^")

  return result;
}

// const result = balanceEquation("S+HNO3", "H2SO4+NO2+H2O");
// console.log(result);
