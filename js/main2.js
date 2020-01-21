const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let obraz = new Image();
let nazwapliku = '';

//przyciski
const pobierz = document.getElementById('pobierz');
const wgraj = document.getElementById('wgraj');
const usun = document.getElementById('usun');


// Dodaj filtry

document.addEventListener('click', (e)=> {
    //sprawdzamy po klasach czy wciśnięty przycisk zawiera klasę filtr i klasę dającą wybrany efekt
    if(e.target.classList.contains('filtr')) {
        if(e.target.classList.contains('jasnosc-dodaj')) {
            Caman('#canvas', obraz, function() {
                this.brightness(5).render();
            });
        }
        if(e.target.classList.contains('jasnosc-odejmij')) {
            Caman('#canvas', obraz, function() {
                this.brightness(-5).render();
            });
        }
        if (e.target.classList.contains("vintage")) {
            Caman("#canvas", obraz, function() {
                this.vintage().render();
            });
        }
    }
});

//Usun Filtry

usun.addEventListener('click' , (e) => {
    Caman('#canvas' , obraz , function(){
       this.revert();
    });
});

//Wgraj obrazek
wgraj.addEventListener('change' , (e)=> {
    const plik = document.getElementById('wgraj').files[0];

    // Czytnik plików
    const czytnik = new FileReader();

    if(plik) {
        //Zmieniamy nazwę pliku
        nazwapliku = plik.name;
        //Bierze nazwe z pliku
        czytnik.readAsDataURL(plik);
    }

    czytnik.addEventListener('load', ()=> {
        //Tworzymy obraz
        obraz = new Image();
        //Src
        obraz.src = czytnik.result;
        //Po wgraniu dodaj do Canvasa
        obraz.onload = function() {
            canvas.width = obraz.width;
            canvas.height = obraz.height;
            ctx.drawImage(obraz, 0 , 0, obraz.width , obraz.height);
            canvas.removeAttribute('data-caman-id');
        };
    }, false);
});


// Pobierz zmodyfikowany obrazek
pobierz.addEventListener("click", () => {
    //sprawdzrozszerzenie
    const rozszerzenie = nazwapliku.slice(-4);

    let nowanazwapliku;

    //sprawdz typ
    if (rozszerzenie === ".jpg" || rozszerzenie === ".png") {
        nowanazwapliku = nazwapliku.substring(0, nazwapliku.length - 4) + "-edited.jpg";
    }

    //Wywołaj funkcje download
    download(canvas, nowanazwapliku);
});

// Download
function download(canvas, nazwapliku) {
    //E jest wydarzeniem ,które później będzie inicjowane przez kliknięcie
    let e;
    //Utwórz link
    const link = document.createElement("a");

    link.download = nazwapliku;
    link.href = canvas.toDataURL("image/jpeg", 0.8);
    //kiedy wywołać funkcje
    e = new MouseEvent("click");
    link.dispatchEvent(e);
}
