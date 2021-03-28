Webcam.set({width: 350, height: 300, image_format: 'png', png_quality: 90});

var cameraVideo=document.querySelector('#camera');
var resultImg=document.querySelector('#result');

Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(dataURIStr){
        document.querySelector('#result').innerHTML='<img id="captured_img" src="'+dataURIStr+'"/>';
    });
    
};

console.log('ML5 Version:', ml5.version);

function onModelLoaded(){
    console.log('Model Loaded!');
}

var classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/T4GppfZyY/', onModelLoaded);

function displayResults(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.querySelector('#emotion_name').innerText=results[0].label;
        document.querySelector('#accuracy').innerText=results[0].confidence.toFixed(3);
    }
}

function checkEmotion(){
    var capturedImg=document.querySelector('#captured_img');
    classifier.classify(capturedImg, displayResults);
}