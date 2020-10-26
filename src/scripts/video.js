(function() {
  $().ready(function () {
    const playButtons = $('.play__button');
    const playerContainer = $('.player');
    const video = document.getElementById('playerVideo');
    const playbackControl = document.getElementById('playbackRange');
    const volumeControl = document.getElementById('volumeRange');
    const soundControl = $('.volume__icon-wrapper');
    let intervalId;
  
    playbackControl.min = 0;
    playbackControl.value = 0;
    volumeControl.min = 0;
    volumeControl.max = 10;
  
    const updateDuration = () => {
      playbackControl.value = video.currentTime;
    };
  
    const setVideoDuration = () => {
      video.currentTime = playbackControl.value;
      intervalId = setInterval(() => {
        updateDuration();
      }, 1000/66);
    };
  
    const stopInterval = () => {
      clearInterval(intervalId);
    }
  
    const changeSoundVolume = () => {
      video.volume = volumeControl.value/10;
    };
  
    const toggleSound = () => {
      video.volume ? video.volume = 0 : video.volume = volumeControl.value/10;
      playerContainer.toggleClass('muted');
    };
  
    const playPauseVideo = () => {
      playbackControl.max = video.duration;
     
      if(video.paused) {
        video.play();
        playerContainer.addClass('paused');
        intervalId = setInterval(() => {
          updateDuration();
        }, 1000);
      } else {
        video.pause();
        playerContainer.removeClass('paused');
        stopInterval();
      }
    };
  
    const resetVideo = () => {
      playerContainer.removeClass('paused');
        stopInterval();
        video.load();
        updateDuration();
    };
  
   
  
    playButtons.each(function ()  {
      $(this).on('click', (e)=>{
        e.preventDefault();
        playPauseVideo();
      });
    });
  
    video.addEventListener('click', () =>{
      playPauseVideo();
    });
  
    video.addEventListener('ended', () => {
      resetVideo();
    });
  
    playbackControl.addEventListener('click', setVideoDuration);
    playbackControl.addEventListener('onmousemove', setVideoDuration);
    playbackControl.addEventListener('mousedown', stopInterval);
  
    volumeControl.addEventListener('click', changeSoundVolume);
    volumeControl.addEventListener('mousemove', changeSoundVolume);
    soundControl.on('click', toggleSound);
  
  });
  
  
  
})()






/*  YT IFrame API */

// let player;
// const playerContainer = $('.player');
// const playbackBar = $('.player__playback');
// const playbackBtn = $('.player__playback-button');

// let eventsInit = () => {
//   $('.player__start').on('click', e => {
//     e.preventDefault();

//     if (playerContainer.hasClass('paused')){
//       player.pauseVideo();
//     } else {
//       player.playVideo();
//     }
//   });

//   $(".player__splash").click(e => {
//     player.playVideo();
//   });

// };

// const formatTime = (sec) => {
//   const roundTime = Math.round(sec);

//   const minutes = addZero(Math.floor(roundTime/60));
//   const seconds = addZero(roundTime%60);

//   function addZero(num){
//     return num<10 ? `0${num}` : num;
//   }
//   return `${minutes}:${seconds}`;
// }

// const onPlayerReady = () => {
//   let interval;
//   const estDuration = $('.player__duration-estimate');
//   const completedDuration = $('.player__duration-completed');
//   const durationSec = player.getDuration();
  
//   durationSec ? estDuration.text(formatTime(durationSec)): estDuration.text('00:00');

//   if(typeof interval !== 'undefined') {
//     clearInterval(interval)
//   } else {
//     interval = setInterval(() => {
//       let completedSec = player.getCurrentTime();
//       console.log(completedSec);
//       let completedPercent = (completedSec/durationSec) * 100;
//       console.log(completedPercent);
//       playbackBtn.css({
//         left: `${completedPercent}%`
//       });
//       completedSec ? completedDuration.text(formatTime(completedSec)): completedDuration.text('00:00');
//     }, 1000);
//   }

//   playbackBar.click(e => {
//     const clickedPosition = e.originalEvent.layerX;
//     const newBtnPosPercent = (clickedPosition/playbackBar.width())*100;
//     playbackBtn.css({
//       left: `${newBtnPosPercent}%`
//     });
//     const newCompletedTime = (player.getDuration()/100) * newBtnPosPercent;
//     console.log(newCompletedTime);
//     player.seekTo(newCompletedTime, true);
//   })
  
// };


// const onPlayerStateChange = e => {
// /* Possible values are:
//    -1 – unstarted
//    0 – ended
//    1 – playing
//    2 – paused
//    3 – buffering
//    5 – video cued */

//    switch(e.data) {
//      case 1:
//        playerContainer.addClass('active');
//        playerContainer.addClass('paused');
//        break;

//       case 2:
//         playerContainer.removeClass('active');
//         playerContainer.removeClass('paused');
//         break;
//    }
// };

 
// function onYouTubeIframeAPIReady() {
//  player = new YT.Player("yt-player", {
//    height: "405",
//    width: "660",
//    videoId: "LXb3EKWsInQ",
//    events: {
//      onReady: onPlayerReady,
//      onStateChange: onPlayerStateChange
//    },
//    playerVars: {
//      controls: 0,
//      disablekb: 1,
//      iv_load_policy: 3,
//      modestbranding: 0,
//      rel: 0,
//    }
//  });
// }

// eventsInit();