#!/bin/bash
modules="$(cat input.txt)"
fuelTotal=0
p1fuelTotal=0
function calcFuel() {
	wip=$1
	wip=$(($wip/3))
	wip=$(($wip-2))
	if [[ $wip -lt 1 ]]; then
		echo 0;
	else
		echo $wip
	fi
}

while read -r line; do
	echo "[MOD]: $line"
	wip=$(calcFuel $line)
	p1fuelTotal=$(($p1fuelTotal+$wip))
	echo "[REQ]: $wip"
	#Calculate fuel requirement for the fuel
	f=$(calcFuel $wip)
	if [[ $f -gt 0 ]]; then
		i=0
		ex="false"
		g=$f
		#This is really gross, but I couldn't get bash recursion to work for some reason. I blame myself for using bash here
		while [[ "$ex" != "true" ]]; do
			g=$(calcFuel $g)
			f=$(($f+$g))
			echo "[EFR$i]: $g"
			let i=i+1
			if [[ $g -lt 1 ]]; then ex="true"; fi
		done
	fi
	fuelTotal=$(($fuelTotal+$wip+$f))
done <<< "$modules"
echo "Part1: $p1fuelTotal"
echo "Part2: $fuelTotal"

