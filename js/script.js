// Consegna:
// Dato un array di oggetti letterali con:
// url dell’immagine
// titolo
// descrizione
// Creare un carosello come nella foto allegata.
// Milestone 0:
// Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico:
//  costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
// Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare 
// dinamicamente il carosello.
// Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile
//  e dovremo aggiungervi titolo e testo.
// Milestone 2:
// Aggiungere il ciclo infinito del carosello. Ovvero se la miniatura attiva è la prima e 
// l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e 
// viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) 
// l’immagine attiva dovrà cambiare alla successiva.
// BONUS 3: Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.

const images = [
    {
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
        title: 'Chile',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
];

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const carouselWrapper = document.getElementById('carousel-wrapper');
const thumbnail = document.getElementById('thumbnail');
console.log(thumbnail)
let imgsWrapper = [];
let imgsThumbnail = [];
console.log(imgsThumbnail);

// ciclo in foreach ogni elemento dell'array e lo salvo nelle costanti
images.forEach((element) => {

    const urlPic = element.url;
    const titlePic = element.title;
    const titleDescription = element.description;

    const singleImgWrapper = document.createElement('div');
    carouselWrapper.append(singleImgWrapper);

    let htmlElements = carouselImageHtml("description","title","paragraph",urlPic,titlePic,titleDescription); 
    singleImgWrapper.innerHTML += htmlElements;
    imgsWrapper.push(singleImgWrapper);

    let thumbnailImg = carouselThumbnailElements(urlPic);
    let thumbnailElements = document.createElement('div');

    thumbnailElements.innerHTML += thumbnailImg;

    thumbnail.append(thumbnailElements);
    imgsThumbnail.push(thumbnailElements);
    
});


let currentActive = 0;

// metto una sola img visibile all'inizio, la prima
imgsWrapper[currentActive].classList.add('active');
imgsThumbnail[currentActive].classList.add('active-tumb');


const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');

let clock;
let isPlayOn = false;

startBtn.addEventListener('click', ()=>{
    if(isPlayOn === false){
        clock = setInterval(carouselAutoplay,1000);
    }
    isPlayOn = true;
});

stopBtn.addEventListener('click', ()=>{
    clearInterval(clock);
    isPlayOn = false;
})




nextBtn.addEventListener('click', () => {

    imgsWrapper[currentActive].classList.remove('active');
    imgsThumbnail[currentActive].classList.remove('active-tumb');

    currentActive++;

    if (currentActive === imgsWrapper.length){
        currentActive = 0;
    }

    imgsWrapper[currentActive].classList.add('active');
    imgsThumbnail[currentActive].classList.add('active-tumb');
})

prevBtn.addEventListener('click', function(){

    imgsWrapper[currentActive].classList.remove('active');
    imgsThumbnail[currentActive].classList.remove('active-tumb');

    currentActive--;

    if (currentActive === -1){
        currentActive = imgsWrapper.length-1;
    }

    imgsWrapper[currentActive].classList.add('active'); 
    imgsThumbnail[currentActive].classList.add('active-tumb');
})

function carouselAutoplay(){

    imgsWrapper[currentActive].classList.remove('active');
    imgsThumbnail[currentActive].classList.remove('active-tumb');

    currentActive++;

    if (currentActive === imgsWrapper.length){
        currentActive = 0;
    }

    imgsWrapper[currentActive].classList.add('active');
    imgsThumbnail[currentActive].classList.add('active-tumb');

};

// funzione per crare l'html da usare per le immagini del carosello
function carouselImageHtml(classForDescription, classTitle, classParagraph, imgSrc, title, paragraph) {

    let singleImg = `
        <div class=${classForDescription}>
            <h2 class=${classTitle}>${title}</h2>
            <div class=${classParagraph}>${paragraph}</div>
        </div>
        <img src="${imgSrc}" alt="carousel-img">`

    return singleImg;
}

function carouselThumbnailElements (elementUrl){
    let thumbnailElements = `<div><img src="${elementUrl}" alt="thumb-imgs"></div>`
    return thumbnailElements;
}