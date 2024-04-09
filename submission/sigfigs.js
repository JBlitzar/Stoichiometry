function getSignificantDigitCount(n) {
  n = n.replace(".", "");
  const num_nonzero_matches = n.match(/[1-9]/g);
  const num_nonzero = num_nonzero_matches ? num_nonzero_matches.length : 0;
  //https://regexr.com/7ul19
  const pattern = /(?<=[1-9])0*$/;
  let match = pattern.exec(n);
  const num_significant_zeros = match ? match[0].length : 0;
  return num_nonzero + num_significant_zeros;
}

function matchPrecision(inNum, outNum) {
  outNum = Number(outNum);
  return outNum.toPrecision(getSignificantDigitCount(inNum));
}
