var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var synth = window.speechSynthesis;

currentFilter = "lipstick";

noseX = 0;
noseY = 0;

lipsX = 0;
lipsY = 0;

eyesX = 0;
eyesY = 0;

mX = 0;
mY = 0;

function preload() {
    clownNoseImg = loadImage('https://i.postimg.cc/Y4y8fyXs/clown-Nose.png')
    moustacheImg = loadImage('https://i.postimg.cc/622cHLg5/moustache.png')
    lipstickImg = loadImage('https://i.postimg.cc/tZK58nGd/lipstick.png')
    gogglesImg = loadImage('https://i.postimg.cc/G9DzGKvX/goggles.png')
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function lipstick() {
    currentFilter = "lipstick";
}

function moustache() {
    currentFilter = "moustache";
}

function clownNose() {
    currentFilter = "clownNose";
}

function goggles() {
    currentFilter = "goggles";
}

function draw() {
    image(video, 0, 0, 300, 300);
    if (currentFilter == "goggles") {
        image(gogglesImg, eyesX, eyesY, 80, 40);
    } else if (currentFilter == "lipstick") {
        image(lipstickImg, lipsX, lipsY, 50, 50);
    } else if (currentFilter == "moustache") {
        image(moustacheImg, mX, mY, 50, 50);
    } else {
        image(clownNoseImg, noseX, noseY, 30, 30);
    }
}

function takeSnapshot() {
    recognition.start();
}

recognition.onresult = recognize;

function recognize(event) {
    content = event.results[0][0].transcript;
    console.log(content);
    if (content == "take my selfie") {
        speak();
    }
}

function speak() {
    speakData = "Taking your selfie in 3 seconds";
    var utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
    setTimeout(function() {
        takeSnapshot2();
        save();
    }, 3000);
}

function takeSnapshot2() {
    save('myFilteredImage.png');
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        noseX = results[0].pose.nose.x - 15;
        noseY = results[0].pose.nose.y - 15;

        eyesX = results[0].pose.rightEye.x - 20;
        eyesY = results[0].pose.rightEye.y - 10;

        lipsX = results[0].pose.nose.x - 23;
        lipsY = results[0].pose.nose.y + 10;

        mX = results[0].pose.nose.x - 25;
        mY = results[0].pose.nose.y - 5;
    }
}