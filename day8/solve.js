const fs = require("fs");
var img = fs.readFileSync(process.argv[2],"UTF-8").replace("\n","");
var imgw = 25; var imgh = 6; var c = {"x": 0, "y": 0, "l": 1, "d": ""}; i = 0; var image = {};
var res0 = 9999999; var res1;
while (i <= img.length) {
	if (c.x >= imgw) { c.x = 0; c.y +=1;}
	if (c.y >= imgh) { 
		c.x = 0; c.y = 0; c.l += 1; 
		if (parseInt((c.d.match(/0/g) || []).length) < res0) {
			res1 = parseInt((c.d.match(/1/g) || []).length) * parseInt((c.d.match(/2/g) || []).length)
			res0 = parseInt((c.d.match(/0/g) || []).length)
		}
		c.d = ""
	}
	if (image[`${c.x},${c.y}`] != 1 && image[`${c.x},${c.y}`] != 0) { image[`${c.x},${c.y}`] = img[i]; }
	c.d += img[i]
	c.cl += img[i]
	i += 1;	c.x += 1;
}
console.log("Part 1: " + res1);
console.log("Part 2:");
for (var y=0; y < imgh; y++) {
	for (var x=0; x < imgw; x++) {
		process.stdout.write(image[`${x},${y}`].toString().replace("1","■").replace("0","\x1b[30m■\x1b[0m"))
	}
	console.log();
}
