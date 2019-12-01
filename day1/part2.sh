#!/bin/bash

#Get modules
modules="$(cat day1input.txt)"
oldifs="$IFS"
IFS="$(echo -e \n)"

fuelTotal=0

function calcFuel() {
	wip=$1
	#Divide by 3
	wip=$(($wip/3))
	#Bash always rounds down anyway
	#Sub 2
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
			if [[ $g -lt 1 ]]; then
				ex="true"
			fi
				
		done
	fi
	
	fuelTotal=$(($fuelTotal+$wip+$f))

done <<< "$modules"

echo ""
echo "Required Fuel: $fuelTotal"
