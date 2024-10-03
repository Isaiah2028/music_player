const doc = document;

// 歌曲信息数组
const songsList = [
  {
    id: '1',
    title: 'Free Loop',
    author: 'Daniel Powter',
    path: './music/Free Loop - Daniel Powter.mp3',
    bgPath: './image/Free Loop - Daniel Powter.webp',
    time: 0
  },
  {
    id: '2',
    title: '衡山路',
    author: '小海',
    path: './music/衡山路-小海.320.mp3',
    bgPath: './image/南常-小海.webp',
    time: 0
  },
  {
    id: '3',
    title: '天空之城',
    author: '久石让',
    path: './music/天空之城.mp4',
    bgPath: './image/1.jpg',
    time: 0
  }
]
// 获取dom元素
const audio = doc.querySelector('#audio'); //播放器
const bgImg = doc.querySelector('#bg-img'); //插图
const controls = doc.querySelector('#controls'); //按钮区
const title = doc.querySelector('#title'); //标题
const author = doc.querySelector('#author'); //作者
const playBtn = doc.querySelector('#play'); //播放按钮
const voiceBtn = doc.querySelector('#voice'); //音量控制

const songl_ist = doc.querySelector('#song-list');

const start_time = doc.querySelector('#start');
const end_time = doc.querySelector('#end'); // 总时长（s）


let curSongIndex = 1;
let isPlay = false;
function init() {
  //初始化页面
  renderSong(songsList[curSongIndex]);
  //获取所有歌曲列表
  getsongList();
  //绑定鼠标暑事件
  bindEvents();
  console.log('初始化完成...');

}

//渲染歌曲信息
function renderSong(song) {
  // 标题
  title.innerHTML = song.title;
  author.innerHTML = song.author;
  bgImg.src = song.bgPath;
  audio.volume = 0.5;
  audio.src = song.path;

  start_time.textContent = audio.currentTime;
  end_time.textContent = audio.duration;
  console.log( '歌曲时长：' + audio.duration);

}


// 按钮事件

function bindEvents() {
  // 播放按钮
  controls.addEventListener('click', (e) => {
    switch (e.target?.id) {
      case 'list':
        // showSongList();
        break;
      case 'voice':
        voiceControl();
        break;
      case 'pre':
        preSong()
        break;
      case 'play':
        trigurerPlay();
        break;
      case 'next':
        nextSong();
        break;
      case 'mode':
        break;
      case 'add':
        break;
      default: break;
    }
  })
}
//播放 暂停功能
function trigurerPlay() {
  if (!isPlay) {
    songPlay(); // 播放 切换图标
  } else {
    songPause(); //暂停 切换图标
  }
}
function songPlay() {
  isPlay = true;
  playBtn.classList.remove('icon-24gf-play');
  playBtn.classList.add('icon-iconstop');
  audio.play();
}
function songPause() {
  isPlay = false;
  playBtn.classList.add('icon-24gf-play');
  playBtn.classList.remove('icon-iconstop');
  audio.pause();
}


function preSong() {
  if (curSongIndex > 0) {
    curSongIndex--;
    renderSong(songsList[curSongIndex]);
    songPlay();
  } else {
    alert('到底了哟~')
    songPlay();
  }

}
function nextSong() {
  if (curSongIndex <= songsList.length - 1) {
    curSongIndex++;
    renderSong(songsList[curSongIndex]);
    songPlay();
  }
  else {
    alert('没有下一首了哟~')
    songPlay();
  }
}

// 音量开关
function voiceControl() {
  if (audio.volume > 0) {
    voiceOff();
  }
  else {
    voiceOn();
  }
}

function voiceOff() {
  audio.volume = 0;
  voiceBtn.classList.remove('icon-shengyin_shiti');
  voiceBtn.classList.add('icon-volume-mute-fill');
}

function voiceOn() {
  audio.volume = 0.5;
  voiceBtn.classList.remove('icon-volume-mute-fill');
  voiceBtn.classList.add('icon-shengyin_shiti');
}



// function showSongList() {

//   let song_list = getsongList();
//   song_list.forEach(song => {
//     if (Array.isArray(song)) { // 确保 data 是数组
//       data.forEach(song => {
//         console.log('5555::::' + song);
//         renderSong(song);
//       });
//     } else {
//       console.error('6666::: data is not an array');
//     }
//   });

// }


// 获取歌曲列表
function getsongList() {
  // ajax调用后段获取歌曲列表
  //var songListTmp = [];
  $.ajax({
    url: 'http://localhost:19990/region/music/getAllSong',
    type: 'get',
    dataType: 'json',
    success: function (res) {
     // console.log('获取歌曲列表成功' + JSON.stringify(songListTmp));
     songsList=res.data
    }, error: function (err) {
      console.log('获取个数失败' + err);
    }
  }).done(function () {    
    return songListTmp;
  });

  
}


function showSongList(){
  let songlist =  getsongList();
  
  for(let index = 0; index < songlist.length; index++) {
    
   // li渲染歌曲信息
   let li = document.createElement('li');
   songl_ist.innerHTML = `<li>${songlist[index].title}</li>`
  }
}

init();


