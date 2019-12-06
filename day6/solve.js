const fs = require("fs");
var orbits = fs.readFileSync(process.argv[2],"UTF-8").split('\n');
var totals = {};
function countTotal(orbitArray, add) {
  var total = 0;
  for (var i = 0; i < orbitArray.length; i++) {
    total += parseInt(totals[totals[orbitArray[i]].parent].level) + 1;
    totals[orbitArray[i]].level = parseInt(totals[totals[orbitArray[i]].parent].level) + 1;
    total += countTotal(totals[orbitArray[i]].orbits, 1);
  }
  return total
}
for (var i = 0; i < orbits.length; i++) {
    var a = orbits[i].split(")")[0]
    var b = orbits[i].split(")")[1]
    totals[a] = (totals[a] == null) ? {"orbits": [], "level": 0, "parent": null} : totals[a]
    if (totals[b] == null) {
      totals[b] = {"parent": a, "orbits": [], "level": 0}
    } else {
      totals[b].parent = a
    }
    totals[a].orbits.push(b)
}
function calcPart2() {
  var x = "SAN"; spath = []; scount = {}; i = 0; mpath = []; via = null;
  while (x != "COM") {
    spath.push(x.toString());
    scount[x] = i;
    i += 1;
    x = totals[x].parent;
  }
  x = "YOU"; i=0
  while (via == null) {
    i += 1;
    x = totals[x].parent;
    if (spath.includes(x)) { via = x }
  }
  console.log("Part 2: " + parseInt(i + scount[via] - 2))
}
console.log("Part 1: " + countTotal(totals["COM"].orbits, 1))
calcPart2();
