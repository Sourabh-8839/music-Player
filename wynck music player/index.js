console.log("Welcome to musicplayer");


//Initialize variable

let songIndex=1;
let audioPlay=new Audio("music/1.mp3");

let masterSong=document.getElementById("masterSong");

let myProgressbar=document.getElementById("myProgressbar");

let playButton=document.getElementById("masterPlay");
let gif=document.getElementById("gif");

let target=document.body;

let songItems = Array.from (document.getElementsByClassName("songitems"));



//list of songs
let songs =[
{name:'love me like you do',coverpath:"cover/lovemelike.jpg",filepath:"1.mp3"},

{name:'Shape of you',coverpath:"cover/shape.jpg",filepath:"music/2.mp3"},


{name:'Cheap thrills',coverpath:"cover/cheap thrills.jpg",filepath:"music/3.mp3"},

{name:'Perfect',coverpath:"cover/perfect.jpg",filepath:"music/4.mp3"},

{name:'Emptiness',coverpath:"cover/emptiness.jpg",filepath:"music/5.mp3"},

{name:'ayat',coverpath:"cover/ayat2.jpg",filepath:"music/6.mp3"},

{name:'Despacito',coverpath:"cover/ab67616d0000b273ddcf7bc59eb0aa9eda60f27a.jpg",filepath:"music/7.mp3"},

]; 


//get song list from array
songItems.forEach((element,i )=> {
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songName")[0].src=songs[i].filepath;
});



//Handle Play/Pause Event

playButton.addEventListener('click',()=>{

    if(audioPlay.paused|| audioPlay.currentTime<=0){
        audioPlay.play();
        playButton.classList.remove("fa-circle-play");
        playButton.classList.add("fa-circle-pause"); 
        gif.style.opacity=1;
        changebgcolor();
        

    }
    else{
        audioPlay.pause();
        makeallplays();
        playButton.classList.remove("fa-circle-pause");
        playButton.classList.add("fa-circle-play");
        gif.style.opacity=0;
        stopcolor();
    }
   
})



//Listen to Events
audioPlay.addEventListener("timeupdate",()=>{
    

    //Update Seek Bar
    progress = parseInt((audioPlay.currentTime/audioPlay.duration)*100);
    myProgressbar.value =progress;

    if(progress==100){
        songIndex+=1;
       if(songIndex>=songs.length){
        songIndex=1
    }
    playmusic();
    }
});




//Change in Seek Bar

myProgressbar.addEventListener("change",()=>{

audioPlay.currentTime = (myProgressbar.value*audioPlay.duration)/100;


});




//play on list 
const makeallplays= ()=>{
    Array.from(document.getElementsByClassName("play")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}




//play songs 
function playmusic(){
    audioPlay.src=`music/${songIndex}.mp3`;
    audioPlay.currentTime=0;
    audioPlay.play();
    //display  song names
    masterSong.innerText= songs[songIndex-1].name;

    playButton.classList.remove("fa-circle-play");
    playButton.classList.add("fa-circle-pause");
    gif.style.opacity=1;
    changebgcolor();
}



//select the song and play
Array.from (document.getElementsByClassName("play")).forEach((element)=>{

    element.addEventListener('click',(e)=>{
        
       
          makeallplays();
       songIndex =parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        playmusic();   
        
    })
    
})
//move to previous  song 

document.getElementById("Previous").addEventListener("click",()=>{
    if(songIndex<=1){
        songIndex=songs.length;
    }
    else{
    songIndex-=1;
    }
   playmusic();
})

//Move to Next song
document.getElementById("Next").addEventListener('click',()=>{
    if(songIndex>=songs.length){
        songIndex=1;
    }
    else{    
        songIndex+=1;
    }
     playmusic();
  

})



//changing background color randomly



function changebgcolor(){
    
    let col1=color();
    let col2=color();
    let col3=color();
    target.style.background="linear-gradient("+col1+","+col2+","+col3+")";

    setTimeout(changebgcolor,10000);
    
   
}
function color(){
    let x,y,z;
    x=Math.floor(Math.random()*225);
    y=Math.floor(Math.random()*225);
    z=Math.floor(Math.random()*225);
    let col="rgb("+x+","+y+","+z+")";
    return col;
}

//Skip songs 10 sec
document.getElementById("skipForward").addEventListener('click',()=>{
    audioPlay.currentTime+=4;
}
)
document.getElementById("skipBackward").addEventListener('click',()=>{
    if(audioPlay.currentTime>4)
    audioPlay.currentTime-=4;
    else{
        audioPlay.currentTime=0;
    }
}
)


