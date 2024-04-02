function getParam(p) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(p);
}

equation = getParam("equation");
balanced_equation = balanceEquation(
  equation.split("->")[0],
  equation.split("->")[1]
);
balanced_equation = balanced_equation.replace("->", "\\rightarrow")



fixed_equation = balanced_equation.replace(/[a-zA-Z]\d+/g, function (match) {
    return match.replace(/\d+/g, function (match) {
        return "_{" + match+"}";
      });
});
document.getElementById("balanced_equation").innerText = "$\\mathrm{"+fixed_equation+"}$"