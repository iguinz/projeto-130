song1 = ""
song2 = ""
video;
poseNet;
poses = [];
pulsoEsquerdoX = 0;
pulsoEsquerdoY = 0;
pulsoDireitoX = 0;
pulsoDireitoY = 0;
pontuacaoPulsoEsquerdo = 0;
statusMusica1 = '';
statusMusica2 = '';

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video,0,0,600,500);
}


function setup() {
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('Modelo Posenet carregado!');
}

function gotPoses(results) {
  if (results.length > 0) {
    poses = results;
    pulsoEsquerdoX = poses[0].pose.leftWrist.x;
    pulsoEsquerdoY = poses[0].pose.leftWrist.y;
    pulsoDireitoX = poses[0].pose.rightWrist.x;
    pulsoDireitoY = poses[0].pose.rightWrist.y;
  }
}

function preload() {
    musica1 = loadSound('caminho/para/sua/musica1.mp3');
    musica2 = loadSound('caminho/para/sua/musica2.mp3');
  }
  
  function setup() {
    video = createCapture(VIDEO);
    video.size(640, 480); 
    video.hide(); 
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
  }
  
  function modelLoaded() {
    console.log('Modelo Posenet carregado!');
  }
  
  function gotPoses(results) {
    if (results.length > 0) {
      poses = results;
      pontuacaoPulsoEsquerdo = poses[0].pose.keypoints[9].score;
    }
  }
  
  function draw() {
    fill(255, 0, 0);
    stroke(255);
    let statusMusica1 = musica1.isPlaying();
    if (pontuacaoPulsoEsquerdo > 0.2) {
      ellipse(poses[0].pose.keypoints[9].position.x, poses[0].pose.keypoints[9].position.y, 50, 50);

      musica2.stop();

      if (!statusMusica1) {
        musica1.play();
        document.getElementById('song').innerText = 'Nome da Música 1';
      }
    } else {
      musica1.stop();

    }
}

function draw() {
    fill(0, 0, 255); 
    stroke(255); 
    let statusMusica2 = musica2.isPlaying();
    if (pontuacaoPulsoDireito > 0.2) {
      ellipse(poses[0].pose.keypoints[10].position.x, poses[0].pose.keypoints[10].position.y, 50, 50);
      musica1.stop();
      if (!statusMusica2) {
        musica2.play();
        document.getElementById('song').innerText = 'Nome da Música 2';
      }
    } 
    
    else {
      musica2.stop();
    }