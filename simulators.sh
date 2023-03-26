#!/bin/bash
declare -a simulators=("D5510394-7310-421E-A885-6C8BB5187522" "B61090B7-E0B7-45A7-8B7E-4032EB7B5F8E")

for i in "${simulators[@]}"
do
    xcrun simctl boot $i
    xcrun simctl install $i ~/.expo/ios-simulator-app-cache/Exponent-2.23.2.tar.app
    xcrun simctl openurl $i exp://127.0.0.1:19000
done
