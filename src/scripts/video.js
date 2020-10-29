setTimeout(function () {
  $().ready(function () {
    const playButtons = $(".play__button");
    const playerContainer = $(".player");
    const video = document.getElementById("playerVideo");
    const volumeControl = document.getElementById("volumeRange");
    const soundControl = $(".volume__icon-wrapper");
    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    const isMobile = mobileDetect.mobile();
    const playback = document.getElementById("playbackRange");
    let intervalId;

    playback.min = 0;
    playback.value = 0;
    playback.max = 100;
    volumeControl.min = 0;
    volumeControl.max = 10;
    volumeControl.value = 5;

    const setVideoDuration = () => {
      video.currentTime = (playback.value / 100) * video.duration;
      intervalId = setInterval(() => {
        updateDuration();
      }, 1000 / 66);
    };

    const updateDuration = () => {
      playback.value = (video.currentTime / video.duration) * 100;
    };

    const stopInterval = () => {
      clearInterval(intervalId);
    };

    const playPauseVideo = () => {
      if (video.paused) {
        video.play();
        playerContainer.addClass("paused");
        intervalId = setInterval(() => {
          updateDuration();
        }, 1000);
      } else {
        video.pause();
        playerContainer.removeClass("paused");
        stopInterval();
        //console.log('stopped interval');
      }
    };

    const resetVideo = () => {
      playerContainer.removeClass("paused");
      stopInterval();
      video.load();
      playback.value = 0;
    };

    const changeSoundVolume = () => {
      if (!playerContainer.hasClass("muted")) {
        video.volume = volumeControl.value / 10;
      }
    };

    const toggleSound = () => {
      video.volume
        ? (video.volume = 0)
        : (video.volume = volumeControl.value / 10);
      playerContainer.toggleClass("muted");
    };

    //polyfill for iOS and desktop playback slider

    const iosDesktopPolyfill = (e) => {
      let val =
          (e.pageX - playback.getBoundingClientRect().left) /
          (playback.getBoundingClientRect().right -
            playback.getBoundingClientRect().left),
        max = 100,
        segment = 1 / (max - 1),
        segmentArr = [];

      max++;

      for (let i = 0; i < max; i++) {
        segmentArr.push(segment * i);
      }

      let segCopy = segmentArr.slice(),
        ind = segmentArr.sort(
          (a, b) => Math.abs(val - a) - Math.abs(val - b)
        )[0];

      playback.value = segCopy.indexOf(ind) + 1;
      video.currentTime = (playback.value / 100) * video.duration;
      console.log(video.currentTime, video.duration);
      console.log(video.currentTime);
      intervalId = setInterval(() => {
        updateDuration();
      }, 1000 / 66);
    };

    //polyfill for iOS volume slider
    const iosVolPolyfill = (e) => {
      alert("ipad");

      let val =
          (e.pageX - volumeControl.getBoundingClientRect().left) /
          (volumeControl.getBoundingClientRect().right -
            volumeControl.getBoundingClientRect().left),
        max = 10,
        segment = 1 / (max - 1),
        segmentArr = [];

      max++;

      for (let i = 0; i < max; i++) {
        segmentArr.push(segment * i);
      }

      let segCopy = segmentArr.slice(),
        ind = segmentArr.sort(
          (a, b) => Math.abs(val - a) - Math.abs(val - b)
        )[0];

      volumeControl.value = segCopy.indexOf(ind) + 1;
      console.log(volumeControl.value);
      if (!playerContainer.hasClass("muted")) {
        video.volume = volumeControl.value / 10;
        console.log(video.volume);
      }
      // intervalId = setInterval(() => {
      //   updateDuration();
      // }, 1000/66);
    };



    //Event listeners

    playButtons.each(function () {
      $(this).on("click", (e) => {
        e.preventDefault();
        playPauseVideo();
      });
    });

    video.addEventListener("click", () => {
      playPauseVideo();
    });

    video.addEventListener("ended", () => {
      resetVideo();
    });

    playback.addEventListener("click", iosDesktopPolyfill);
    playback.addEventListener("mousedown", (e) => {
      console.log("ill stop");
      stopInterval();
    });
    volumeControl.addEventListener("click", changeSoundVolume);
    volumeControl.addEventListener("mousemove", changeSoundVolume);
    soundControl.on("click", toggleSound);
    //soundControl.on("touchend", toggleSound);


    //event listeners for iOS devices
    if (!!navigator.platform.match(/iPhone|iPod|iPad/)) {
      playback.addEventListener("touchend", iosDesktopPolyfill, {
        passive: true,
      });
      volumeControl.addEventListener("touchend", iosVolPolyfill, {
        passive: true,
      });
    }

    //event listeners for other mobile devices
    if (isMobile && !navigator.platform.match(/iPhone|iPod|iPad/)) {
      playback.addEventListener("touchstart", stopInterval);
      playback.addEventListener("touchend", setVideoDuration);
      volumeControl.addEventListener("touchend", changeSoundVolume);
      soundControl.on("touchend", toggleSound);
    }
  });
}, 2000);

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
