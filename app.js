const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const audioMusic = $("audio.music");
const progressBar = $("input.slider");
const cd = $(".cd img");
var oldValueScroll = 0;

const app = {
    currentIndex: 0,
    songs: [
        {
            name: "Nhạt nhòa mưa phai",
            singer: "Hương Ly, Sơn Vie",
            path: "./assets/musics/Nhat-Nhoa-Mua-Phai-Huong-Ly-Son-Vie.mp3",
            image: "https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/1/c/d/7/1cd7db1aa94fa020ce8cbc899fab0ceb.jpg",
        },
        {
            name: "Tệ thật, anh nhớ em",
            singer: "Thanh Hưng",
            path: "./assets/musics/TeThatAnhNhoEm-ThanhHung-7132634.mp3",
            image: "./assets/images/TeThatAnhNhoEmThanhHung.jpg",
        },
        {
            name: "Mẹ em nhắc Anh",
            singer: "Orange, Hamlet Trương",
            path: "./assets/musics/MeEmNhacAnh-OrangeHamletTruong.mp3",
            image: "./assets/images/MENDA.jpg",
        },
        {
            name: "Yêu em hơn mỗi ngày",
            singer: "Andiez",
            path: "./assets/musics/YeuEmHonMoiNgay-Andiez.mp3",
            image: "./assets/images/YEHMN.jpg",
        },
        {
            name: "Ngày đầu tiên",
            singer: "Đức Phúc",
            path: "./assets/musics/NgayDauTien-DucPhuc.mp3",
            image: "./assets/images/NDT.jpg",
        },
        {
            name: "Chân mây",
            singer: "K-ICM, Phương Thanh",
            path: "./assets/musics/ChanMay-KICMPhuongThanh.mp3",
            image: "./assets/images/CM.jpg",
        },
        {
            name: "Yêu không cần ép",
            singer: "Bảo Anh",
            path: "./assets/musics/YeuKhongCanEp-BaoAnh.mp3",
            image: "./assets/images/YKCE.jpg",
        },
        {
            name: "Ngại gì mà anh",
            singer: "Huy Vạc",
            path: "./assets/musics/NgaiGiMaAnh-HuyVac.mp3",
            image: "./assets/images/NGMA.jpg",
        },
        {
            name: "Đau nhất là lặng im",
            singer: "Erik",
            path: "./assets/musics/DauNhatLaLangIm-ERIK.mp3",
            image: "./assets/images/DNLLI.jpg",
        },
        {
            name: "Ngọt",
            singer: "JayM",
            path: "./assets/musics/Ngot-JayM.mp3",
            image: "./assets/images/Ngot.jpg",
        },
        {
            name: "Cổ tích",
            singer: "JSOL",
            path: "./assets/musics/CoTich-JSOL.mp3",
            image: "./assets/images/CT.jpg",
        },
        {
            name: "Mê",
            singer: "Hoàng Duyên",
            path: "./assets/musics/Me-HoangDuyen.mp3",
            image: "./assets/images/Me.jpg",
        },
        {
            name: "See Tình",
            singer: "Hoàng Thùy Linh",
            path: "./assets/musics/SeeTinh-HoangThuyLinh.mp3",
            image: "./assets/images/ST.jpg",
        },
    ],

    eventHandles() {
        //add event for play button
        let playBtn = $(".control-item.play-control");
        let nextBtn = $(".control-item.next");
        let prevBtn = $('.control-item.prev');
        let replayBtn = $('.control-item.replay');
        let randomBtn = $('.control-item.random');
        let listItem = $$('.list-item');
        let list = $('.list');

        playBtn.addEventListener("click", (e) => {
            if (e.target.tagName === "I") {
                playBtn.querySelectorAll("i").forEach((item) => {
                    item.classList.toggle("hide");
                });
                if (playBtn.classList.contains("playing")) {
                    audioMusic.pause();
                } else {
                    audioMusic.play();
                }
                playBtn.classList.toggle("playing");
            }
        });

        //progress bar auto update
        audioMusic.addEventListener("timeupdate", () => {
            let current = audioMusic.currentTime;
            let duration = audioMusic.duration;
            progressBar.value = (current / duration) * 100;
            if (progressBar.value == 100) {
                this.nextSong();
            }
        });

        //progress bar on change
        progressBar.addEventListener("change", () => {
            audioMusic.pause();
            console.log(progressBar.value / 100);
            audioMusic.currentTime =
                (progressBar.value / 100) * audioMusic.duration;
            audioMusic.play();
        });

        //next song button
        nextBtn.addEventListener('click',()=>{
            this.nextSong();
            this.showPlayMusic();
        })

        //prev song button
        prevBtn.addEventListener('click',()=>{
            this.prevSong();
            this.showPlayMusic();
        })

        replayBtn.addEventListener('click',()=>{
            audioMusic.currentTime = 0;
        })

        //random music button
        randomBtn.addEventListener('click',()=>{
            let randomSong=-1;
            console.log(this.currentIndex);
            do{
                randomSong = Math.floor(Math.random()*this.songs.length);
            }while(randomSong === this.currentIndex);
            this.currentIndex = randomSong;
            this.setupMusic();
            this.showPlayMusic();
            audioMusic.play();
        })

        //onclick for list-item
        listItem.forEach((item,index)=>{
            item.addEventListener('click',()=>{
                this.currentIndex = index;
                this.setupMusic();
                this.showPlayMusic();
                audioMusic.play();
            })
        });

        //onscroll for list
        //this is so many bug :)))))
        list.addEventListener('scroll', function() {
            let newValueScroll  =  list.scrollTop;
            if(newValueScroll>oldValueScroll){
                $('.cd').style.width = 0;
                $('.cd').style.height = 0;
            }else{
                $('.cd').style.width = 200+'px';
                $('.cd').style.height = 200+'px';
            }
            oldValueScroll = newValueScroll;
        });
    },

    showPlayMusic(){
        let playBtn = $(".control-item.play-control");
        if(!playBtn.classList.contains('playing')){
            playBtn.classList.add('playing');
            playBtn.querySelectorAll("i").forEach((item) => {
                item.classList.toggle("hide");
            });
        }
    },

    prevSong(){
        if (this.currentIndex === 0) {
            this.currentIndex = this.songs.length-1;
        } else {
            this.currentIndex--;
        }
        this.setupMusic();
        audioMusic.play();
    },

    nextSong() {
        if (this.currentIndex === this.songs.length - 1) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this.setupMusic();
        audioMusic.play();
    },

    setupMusic() {
        audioMusic.src = this.songs[this.currentIndex].path;
        cd.src = this.songs[this.currentIndex].image;
        $('.header .music-name').innerText = this.songs[this.currentIndex].name;
    },

    setupSongs() {
        let list = $(".list");
        this.songs.forEach((song) => {
            list.innerHTML += `<div class="list-item">
            <div class="item-content">
                <div class="content-image">
                    <img src="${song.image}" alt="" />
                </div>
                <div class="content-text">
                    <h6 class="song">${song.name}</h6>
                    <span class="singer">${song.singer}</span>
                </div>
            </div>
            <div class="item-more">
                <i class="fa-solid fa-ellipsis"></i>
            </div>
        </div>`;
        });
    },

    start() {
        this.setupMusic();
        this.setupSongs();
        this.eventHandles();
    },
};

app.start();
