const fs = require("fs");
var sysmem = fs.readFileSync(process.argv[2],"UTF-8").replace("\n","").split(",");
var readlineSync = require('readline-sync'); i=0;
function operate(data) {
		if (data.opcode.toString().length > 1) {
			data.in1m = (data.opcode.toString().length > 2) ? parseInt(data.opcode.toString().substr(data.opcode.toString().length-3,1)) : 0
			data.in2m = (data.opcode.toString().length > 3) ? parseInt(data.opcode.toString().substr(data.opcode.toString().length-4,1)) : 0
			data.in3m = (data.opcode.toString().length > 4) ? parseInt(data.opcode.toString().substr(data.opcode.toString().length-5,1)) : 0
			data.opcode = parseInt(data.opcode.toString().substr(data.opcode.toString().length-1,1))
		}
		var i1, i2;
		i1 = (data.in1m == 1) ? data.in1 : sysmem[data.in1]
		i2 = (data.in2m == 1) ? data.in2 : sysmem[data.in2]

		if (data.opcode == 3 ) {
			sysmem[data.in1] = readlineSync.question('Input: ');
		} else if (data.opcode == 4) {
			console.log("> " + i1);
		} else if (data.opcode == 5) {
			i = (parseInt(i1) != 0) ? parseInt(i2) : parseInt(i+3)
		} else if (data.opcode == 6) {
			i = (i1 == 0) ? parseInt(i2) : parseInt(i+3)
		} else {
			sysmem[data.stor] = {1: parseInt(i1) + parseInt(i2),2: parseInt(i1) * parseInt(i2), 7: sysmem[data.stor] = (parseInt(i1) < parseInt(i2)) ? 1 : 0, 8: (parseInt(i1) == parseInt(i2)) ? 1 : 0}[data.opcode];
		}
}
function run() {
	for (i = 0; i < sysmem.length; i=i) {
		var testop = (sysmem[i] > 2) ? parseInt(sysmem[i].toString().substr(sysmem[i].toString().length-1,1)) : sysmem[i]
		if (parseInt(testop) == 99) {
			return(sysmem);
		} else if (parseInt(testop) == 3 || parseInt(testop) == 4) {
			operate({opcode:sysmem[i], in1:sysmem[i+1]});
			i=i+2
		} else if (parseInt(testop) == 5 || parseInt(testop) == 6) {
			operate({opcode:sysmem[i], in1:sysmem[i+1], in2:sysmem[i+2]});
		} else {
			operate({opcode:sysmem[i], in1:sysmem[i+1], in2:sysmem[i+2], stor:sysmem[i+3]});
			i += 4;
		}
	}
}
run();
