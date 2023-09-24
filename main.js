objects=[]
video=""
flag=""
function preload() {
    video=createVideo("video.mp4")
    video.hide()
}
function setup() {
    canvas=createCanvas(1000, 500)
    canvas.center()
}
function start() {
    obj_det=ml5.objectDetector("cocossd", model_loaded)
    document.getElementById("status").innerHTML="status: Detecting Objects..."
}
function draw() {
    image(video, 0, 0, 1000, 500)
    console.log(flag)
    if (flag!="") {
        obj_det.detect(video, got_results)
        console.log(objects.length)
        for ( i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="status: Objects Detected"
            document.getElementById("number_of_objects").innerHTML="Number of Objects: "+ objects.length
            fill("blue")
            percent= floor(objects[i].confidence*100)
            text(objects[i].label+" "+percent+"%", objects[i].x+50, objects[i].y)
            noFill()
            stroke("black")
            rect(objects[i].x+50, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}
function got_results(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        objects=results
    }
}
function model_loaded() {
    console.log("model is LOADED.")
    flag=true
    video.loop()
    video.speed(1.25)
    video.volume(0.0)
}