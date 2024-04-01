function getParam(p){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(p)
}

equation = getParam("equation")
balanced_equation = balanceEquation(equation.split("->")[0], equation.split("->")[1])
parts = balanced_equation.split(" -> ")[0].split(" + ").concat(balanced_equation.split(" -> ")[0].split(" + "))

result_obj = {}
parts.forEach((part)=>{

    result_obj[part[0]] = part.slice(1)
})



first = getParam()

//alert(balanced_equation+"   "+parts)