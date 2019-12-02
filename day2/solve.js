const fs = require("fs");
var sysmem = fs.readFileSync("input.txt","UTF-8").split(",");
function operate(data) {
		sysmem[data.stor] = {1: parseInt(sysmem[data.in1]) + parseInt(sysmem[data.in2]),2: parseInt(sysmem[data.in1]) * parseInt(sysmem[data.in2])}[data.opcode];
}
function run(noun, verb) {
	sysmem[1]=noun; sysmem[2]=verb;
	for (var i = 0; i < sysmem.length; i+=4) {
		if (parseInt(sysmem[i]) == 99) {
			return(sysmem);
		} else {
			operate({opcode:sysmem[i], in1:sysmem[i+1], in2:sysmem[i+2], stor:sysmem[i+3]});
		}
	}
}
console.log("Part 1: " + run(12,2)[0]);
sysmem = fs.readFileSync("input.txt","UTF-8").split(",");
for (var x = 0; x < 100; x++) {
	for (var y = 0; y < 100; y++) {
		if (parseInt(run(x,y)[0]) == 19690720) {
			console.log("Part 2: " + x + y);
		} 
		sysmem = fs.readFileSync("input.txt","UTF-8").split(",");
	}
}
