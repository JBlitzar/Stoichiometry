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

  let matrix = [];
  for (const element of allElements) {
    let row = reactants
      .map((compound) => compound[element] || 0)
      .concat(products.map((compound) => -1 * (compound[element] || 0)));
    matrix.push(row);
  }

  let i = 0;
  while (!checkStackedSquare(matrix)) {
    let constraintRow = Array(reactants.length + products.length).fill(0);
    constraintRow[i] = 1;
    matrix.push(constraintRow);
    i += 1;
  }

  matrix = math.matrix(matrix);
  let b = Array(reactants.length + products.length).fill(0);
  b.fill(1, b.length - i);

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

  let result = "";
  x.forEach((coef, idx) => {
    let amountStr = Math.round(coef).toString();
    if (Math.floor(coef) === 1) {
      amountStr = "";
    }
    result += amountStr + ogCombined[idx] + " ";
    if (idx === reactants.length - 1) {
      result += "-> ";
    } else if (idx !== x.length - 1) {
      result += "+ ";
    }
  });

  return result;
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

  let matrix = [];
  for (const element of allElements) {
    let row = reactants
      .map((compound) => compound[element] || 0)
      .concat(products.map((compound) => -1 * (compound[element] || 0)));
    matrix.push(row);
  }

  let i = 0;
  while (!checkStackedSquare(matrix)) {
    let constraintRow = Array(reactants.length + products.length).fill(0);
    constraintRow[i] = 1;
    matrix.push(constraintRow);
    i += 1;
  }

  matrix = math.matrix(matrix);
  let b = Array(reactants.length + products.length).fill(0);
  b.fill(1, b.length - i);

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

  let result = {};
  x.forEach((coef, idx) => {
    result[ogCombined[idx]] = coef
    
  });

  return result;
}

// const result = balanceEquation("S+HNO3", "H2SO4+NO2+H2O");
// console.log(result);
