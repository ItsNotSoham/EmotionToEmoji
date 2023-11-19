Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");   
Webcam.attach("#camera");
function takepic(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="myimage" src="'+data_uri+'"/>'
    })
}
console.log("ml5 version ",ml5.version)
mymodel=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/TQT_uXkMs/model.json',modelLoaded)
function modelLoaded(){
    console.log("The model's loaded")
}
function speak(){
    api=window.speechSynthesis
    bol1="The first prediction is "+prediction1
    bol2="The second prediction is "+prediction2
    bolo=new SpeechSynthesisUtterance(bol1+bol2)
    api.speak(bolo)

}
function identify(){
    i=document.getElementById("myimage")
    mymodel.classify(i,gotResult)
}
function gotResult(error,results){
    if(error){console.log(error)}
    else{
    console.log(results)
    document.getElementById("result_emotion_name").innerHTML=results[0].label
    document.getElementById("result_emotion_name2").innerHTML=results[1].label
    prediction1=results[0].label
    prediction2=results[1].label
    speak()
    if(results[0].label=="Happy"){document.getElementById("update_emoji_name").innerHTML="&#128522;"}
    if(results[0].label=="Sad"){document.getElementById("update_emoji_name").innerHTML="&#128532;"}
    if(results[0].label=="Angry"){document.getElementById("update_emoji_name").innerHTML="&#128545;"}

    if(results[1].label=="Happy"){document.getElementById("update_emoji_name2").innerHTML="&#128522;"}
    if(results[1].label=="Sad"){document.getElementById("update_emoji_name2").innerHTML="&#128532;"}
    if(results[1].label=="Angry"){document.getElementById("update_emoji_name2").innerHTML="&#128545;"}


    }
}