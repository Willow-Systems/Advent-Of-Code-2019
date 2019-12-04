input="356261-846303"
num=0; numTwo = 0;
function hasDoubleDigitsAndDoesntDecrease(inp) {
	p = 0; dp = 0; r = false; a = true;
	for (var i=0; i < inp.length; i++) {
		r = (inp[i] == p) ? true : r
		a = (parseInt(inp[i]) < parseInt(p)) ? false : a
		dp=p; p=inp[i];
	}
	return (r && a);
}
function atLeastOneSetOfOnlyTwo(inp) {
	var o = false;
	for (var i=0; i < inp.length; i++) {
		m = true;
		if (inp[i] == inp[i-1]) {
			m = (inp[i] == inp[i-2]) ? false : m;
			o = (m)
		} else {
			if (o) { return true }
		}
	}
	return o
}

for (var i = parseInt(input.split("-")[0]); i < parseInt(input.split("-")[1]); i++) {
	if (i.toString().length == 6 && hasDoubleDigitsAndDoesntDecrease(i.toString())) {
		num += 1;
		numTwo = (atLeastOneSetOfOnlyTwo(i.toString())) ? numTwo+1 : numTwo
	}
}
console.log("Part1: " + num);
console.log("Part2: " + numTwo);
