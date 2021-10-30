"use strict";

setInterval(setClock, 1000);
let theClock = document.getElementById("theClock");

function createHandle(handle) {
    let createSpan = document.createElement("span");
    createSpan.classList.add("handler", handle);
    return createSpan;
}

theClock.prepend(createHandle("sec"));
theClock.prepend(createHandle("min"));
theClock.prepend(createHandle("hr"));

let defaultRatio = {
    numberPosition: 0,
    numberRotation: 0,
    stripeRotation: 0
}

for (let i = 1; i <= 12; i++) {
    let createSpan = document.createElement("span");
    createSpan.classList.add("number", `number${i}`);
    createSpan.innerHTML = `<span style="--rotation: ${(defaultRatio.numberRotation -= 30)}">${i}</span>`;
    createSpan.style.setProperty("--rotation", (defaultRatio.numberPosition += 30));
    theClock.prepend(createSpan);
}

let secondStripe = document.createElement("div");
secondStripe.id = "secondStripe";
theClock.append(secondStripe);

for (let i = 1; i <= 60; i++) {
    let createSpan = document.createElement("span");
    createSpan.classList.add("stripe");
    if (i % 5 == 0) {
        createSpan.classList.add("circle");
    }
    createSpan.style.setProperty("--rotation", (defaultRatio.stripeRotation += 6));
    secondStripe.append(createSpan);
}

let secHand = document.querySelector(".sec");
let minHand = document.querySelector(".min");
let hourHand = document.querySelector(".hr");

function setClock() {
    let currentDate = new Date();
    let currentSecs = currentDate.getSeconds() / 60;
    let currentMins = (currentSecs + currentDate.getMinutes()) / 60;
    let currentHrs = (currentMins + currentDate.getHours()) / 12;

    secRotation(secHand, currentSecs);
    secRotation(minHand, currentMins);
    secRotation(hourHand, currentHrs);
}

function secRotation(element, rotationRatio) {
    element.style.setProperty("--rotation", rotationRatio * 360);
}