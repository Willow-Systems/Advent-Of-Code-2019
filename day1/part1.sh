#!/bin/bash

#Get modules
modules="$(cat day1input.txt)"
oldifs="$IFS"
IFS="$(echo -e \n)"

fuelTotal=0

while read -r line; do

echo "[MOD]: $line"
wip=$line
#Divide by 3
wip=$(($wip/3))
#Bash always rounds down anyway
#Sub 2
wip=$(($wip-2))
echo "[REQ]: $wip"
fuelTotal=$(($fuelTotal+$wip))

done <<< "$modules"
echo ""
echo "Required Fuel: $fuelTotal"
