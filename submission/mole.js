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

  function symbol2name(symbol){
    for (const [key, value] of Object.entries(window.PTABLE)) {
        if(value.symbol == symbol){
            return key
        }
      }
   
  }



class Mole{
    constructor(name, amt=0, equ_prefix=""){
        this.name = name
        this.amt = amt
        this.equ_prefix = equ_prefix
        this.elementDict = {}
        this.parse_name()
        console.log(this.elementDict)
        this.molar_mass = 0
        this.calc_molar_mass()
    }

    calc_molar_mass(){

        for (const [key, value] of Object.entries(this.elementDict)) {
            //console.log(`${key}: ${value}`);
            this.molar_mass += window.PTABLE[symbol2name(key)].atomic_mass * value
          }
    }

    parse_name(){
        this.elementDict = stringToDict(this.name)
    }

    from_particles(num_particles){
        this.amt = num_particles / (6.022 * Math.pow(10,23))
        this.equ_prefix += `${num_particles} particles ${this.name}\\cdot\\frac{1 mol ${this.name}}{6.022*10^{23} particles}`
    }
    from_stp(liters){
        this.amt = liters / 22.4
        this.equ_prefix += `${liters} L STP ${this.name}\\cdot\\frac{1 mol ${this.name}}{22.4 L STP}`
    }
    from_mass(mass){
        this.amt = mass / this.molar_mass
        this.equ_prefix += `${mass} g ${this.name}\\cdot\\frac{1 mol ${this.name}}{${this.molar_mass} g}`
    }


    to_particles(){
        this.equ_prefix += `\\cdot\\frac{6.022*10^{23} particles}{1 mol ${this.name}}`
        return `${this.amt * 6.022 * Math.pow(10,23)} particles`
    }


    to_mass(){
        this.equ_prefix += `\\cdot\\frac{${this.molar_mass} g}{1 mol ${this.name}}`
        return `${this.molar_mass * this.amt} g`
    }

    to_stp(){
        
        this.equ_prefix += `\\cdot\\frac{22.4 L STP}{1 mol ${this.name}}`
        return `${this.amt * 22.4} L STP`
    }


    to_other_mole(other, me_amount, other_amount){
        this.equ_prefix += `\\cdot\\frac{${other_amount} mol ${other.name}}{${me_amount} mol ${this.name}}`
        var other_moles = this.amt * other_amount / me_amount
        other.amt = other_moles
        other.equ_prefix = this.equ_prefix

        return `${other.amt} mol ${other.name}`

    }



}


CO2 = new Mole("CO2")
CO2.from_mass(1000)
//result = CO2.to_stp()

H2O = new Mole("H2O")
result = CO2.to_other_mole(H2O, 1, 2)

document.getElementById("math").innerText = `$${H2O.equ_prefix}=${result}$`
