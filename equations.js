window.equations_types = {
  Combustion: [
    "CH4+O2->CO2+H2O",
    "C3H8+O2->CO2+H2O",
    "C8H18+O2->CO2+H2O",
    "C6H12O6+O2->CO2+H2O",
    "C3H6O2+O2->CO2+H2O",
    "C2H2+O2->H2O+CO2",
  ],
  Combination: [
    "Al+O2->Al2O3",
    "CO+O2->CO2",
    "H2+O2->H2O",
    "Na+Cl->NaCl",
    "S+H2->H2S",
  ],

  Decomposition: [
    "AgBr->Ag+Br2",
    "NaHCO3->Na2CO3+H2O+CO2",
    "H2CO3->CO2+H2O",
    "H2O->H2+O2",
  ],

  "Single or Double replacement": [
    "Na2S2O3+Cl2H2O->NaHSO4+HCl",
    "Cu+HNO3->CuN2O6+NO+H2O",
    "S+HNO3->H2SO4+NO2+H2O",
    "Al+Fe3O4->Al2O3+Fe",
    "Li3N+H2O->NH3+LiOH",
    "MnO2+Al->Mn+Al2O3",
  ],
};

window.equations = [].concat(...Object.values(window.equations_types));
