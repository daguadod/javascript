function change (video){
  document.getElementById("Video1").src = video.src;
  document.getElementById("Video1").currentTime = video.currentTime;
  if (document.getElementById("Video1").paused) {
    document.getElementById("Video1").play();
  }
}

function playpause() {
  for (var i = 1; i <= 4; i++) {
    var id = "Video" + i;
    var video = document.getElementById(id);
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}
