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

function symbol2name(symbol) {
  for (const [key, value] of Object.entries(window.PTABLE)) {
    if (value.symbol == symbol) {
      return key;
    }
  }
}

function mathify(num) {
  if (num.toString().includes("e")) {
    let exponent = num.toString().split("e")[1].slice(1);
    let base = num.toString().split("e")[0].slice(undefined, 5);
    return `${base}\\cdot 10^{${exponent}}`;
  }
  return num.toString();
}

class Mole {
  constructor(name, amt = 0, equ_prefix = "") {
    this.name = name;
    this.amt = new Decimal(amt);
    this.equ_prefix = equ_prefix;
    this.elementDict = {};
    this.parse_name();
    console.log(this.elementDict);
    this.molar_mass = 0;
    this.calc_molar_mass();
    this.lname = this.name.replace(/\d+/g, function (match) {
      return "_{" + match+"}";
    });
  }

  calc_molar_mass() {
    for (const [key, value] of Object.entries(this.elementDict)) {
      //console.log(`${key}: ${value}`);
      this.molar_mass += window.PTABLE[symbol2name(key)].atomic_mass * value;
    }
  }

  parse_name() {
    this.elementDict = stringToDict(this.name);
  }

  from_particles(num_particles) {
    this.amt = new Decimal(num_particles).div(6.022 * Math.pow(10, 23));
    this.equ_prefix += `${mathify(num_particles)}\\ \\mathrm{particles\\ ${
      this.lname
    }}\\cdot\\frac{1 \\mathrm{mol\\ ${
      this.lname
    }}}{6.022\\cdot10^{23}\\ \\mathrm{particles}}`;
  }
  from_stp(liters) {
    this.amt = new Decimal(liters).div(22.4);
    this.equ_prefix += `${liters}\\ \\mathrm{L\\ STP\\ ${this.lname}}\\cdot\\frac{1 \\mathrm{mol\\ ${this.lname}}}{22.4 \\mathrm{L\\ STP}}`;
  }
  from_arbitrary_gas(liters, temperature, pressure){
    let denom = new Decimal(0.08205).mul(temperature).mul(pressure)
    this.amt = new Decimal(liters).div(denom)
    this.equ_prefix += `${liters}\\ \\mathrm{L\\ ${this.lname}}\\cdot\\frac{1\\ \\mathrm{mol\\ ${this.lname}}}{\\frac{(0.08205\\ \\frac{\\mathrm{L}\\cdot\\mathrm{atm}}{\\mathrm{mol}\\cdot\\mathrm{K}} \\cdot ${temperature}\\ \\mathrm{K})}{${pressure}\\ \\mathrm{atm}} \\mathrm{L}}`;

  }
  from_mass(mass) {
    this.amt = new Decimal(mass).div(this.molar_mass);
    this.equ_prefix += `${mass}\\ \\mathrm{g\\ ${this.lname}}\\cdot\\frac{1 \\mathrm{mol\\ ${this.lname}}}{${this.molar_mass}\\ \\mathrm{g}}`;
  }

  to_particles(inp) {
    this.equ_prefix += `\\cdot\\frac{6.022\\cdot10^{23}\\ \\mathrm{particles}}{1\\ \\mathrm{mol\\ ${this.lname}}}`;
    return `${mathify(
        matchPrecision(inp, this.amt * 6.022 * Math.pow(10, 23))
    )}\\ \\mathrm{particles\\ ${this.lname}}`;
  }

  to_mass(inp) {
    this.equ_prefix += `\\cdot\\frac{${this.molar_mass} g}{1 \\mathrm{mol\\ ${this.lname}}}`;
    return `${matchPrecision(inp, this.molar_mass * this.amt)}\\ \\mathrm{g\\ ${this.lname}}`;
  }

  to_stp(inp) {
    this.equ_prefix += `\\cdot\\frac{22.4 \\mathrm{L\\ STP}}{1 \\mathrm{mol\\ ${this.lname}}}`;
    return `${matchPrecision(inp, this.amt * 22.4)}\\ \\mathrm{L\\ ${this.lname}\\ STP}`;
  }

  to_arbitrary_gas(inp, temperature, pressure) {
    this.equ_prefix += 
    `\\cdot\\frac{\\frac{(0.08205\\ \\frac{\\mathrm{L}\\cdot\\mathrm{atm}}{\\mathrm{mol}\\cdot\\mathrm{K}} \\cdot ${temperature}\\ \\mathrm{K})}{${pressure}\\ \\mathrm{atm}} \\mathrm{L}}{1\\ \\mathrm{mol\\ ${this.lname}}}`;
    return `${matchPrecision(inp, this.amt * 0.08205 * temperature / pressure)}\\ \\mathrm{L\\ ${this.lname}}`;
  }


  to_other_mole(other, me_amount, other_amount) {
    this.equ_prefix += `\\cdot\\frac{${other_amount}\\ \\mathrm{mol\\ ${other.lname}}}{${me_amount}\\ \\mathrm{mol\\ ${this.lname}}}`;
    var other_moles = (this.amt.times(other_amount)).div(me_amount);
    other.amt = other_moles;
    other.equ_prefix = this.equ_prefix;

    return `${other.amt}\\ \\mathrm{mol\\ ${other.name}}`;
  }
}

// CO2 = new Mole("CO2");
// CO2.from_mass(1000);
// //result = CO2.to_stp()

// H2O = new Mole("H2O");
// result = CO2.to_other_mole(H2O, 1, 2);

// document.getElementById("math").innerText = `$${H2O.equ_prefix}=${result}$`;
