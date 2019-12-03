const fs = require("fs");
input = fs.readFileSync(process.argv[2],"UTF8");
xgrid = []; grid = []; collisions = []; wireid = 1; collisionDistances = []; 
currentTravel = 0; traveldists = {}; minTravelDist = 999999999;

function runWire(dir,dist, wireID, colArr = null) {
	for (var i = 0; i < parseInt(dist); i++) {
		if (dir == "U") {
			p.y -= 1
		} else if (dir == "D") {
			p.y += 1
		} else if (dir == "L") {
			p.x -= 1
		} else if (dir == "R") {
			p.x += 1
		}
		currentTravel += 1;
		if (colArr == null) {
			if (wireID == 2) {
				if (xgrid.includes(p.y) && grid.includes(p.x + "," + p.y)) {
					collisions.push({"x":p.x,"y":p.y});
				}
			} else {
				grid.push(p.x + "," + p.y); xgrid.push(p.y);
			}
		} else {
			for (var j=0; j< colArr.length; j++) {
				if (colArr[j].x == p.x && colArr[j].y == p.y) {
					if (traveldists[p.x + "," + p.y] == null) {
						traveldists[p.x + "," + p.y] = currentTravel;
					} else {
						traveldists[p.x + "," + p.y] += currentTravel;
						minTravelDist = (traveldists[p.x + "," + p.y] < minTravelDist) ? traveldists[p.x + "," + p.y] : minTravelDist;
					}
				}
			}
		}
	}
}
function mapWire(wire, wireid, colArr) {
	p = {x:100000,y:100000};
	currentTravel = 0;
	ins = wire.split(",");
	for (i=0; i < ins.length; i++) {
		runWire(ins[i].substr(0,1), ins[i].substr(1), wireid, colArr);
	}
}
function findManhattenDistance(a,b) {
	var totalx = (a.x > b.x) ? (a.x + b.x) : (b.x - a.x);
	var totaly = (a.y > b.y) ? (a.y - b.y) : (b.y - a.y);
	return totalx + totaly;
}
function findLowestManhattenDistance(origin) {
	var smallest = 9999999;
	for (var i = 0; i < collisions.length; i++) {
				var distance = findManhattenDistance(origin, {"x":collisions[i].x,"y":collisions[i].y});
				collisionDistances.push(distance);
				smallest = (distance < smallest) ? distance : smallest
	}
	return smallest
}
function calculatePart2() {
	mapWire(input.split('\n')[0], 1, collisions)
	mapWire(input.split('\n')[1], 2, collisions)
	console.log("Part2: " + minTravelDist);
}

mapWire(input.split('\n')[0], 1)
mapWire(input.split('\n')[1], 2)
console.log("Part1: " + findLowestManhattenDistance({x:100000,y:100000}));
calculatePart2();
