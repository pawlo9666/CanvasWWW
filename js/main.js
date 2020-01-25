const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let obraz = new Image();
let nazwapliku = '';

//przyciski
const pobierz = document.getElementById('pobierz');
const wgraj = document.getElementById('wgraj');
const usun = document.getElementById('usun');
const przyklad = document.getElementById('przyklad');

przyklad.addEventListener('click' , (e) => {
    //Tworzymy obraz
    obraz = new Image();
    obraz.src = "obr/obr.jpg";
    //Po wgraniu dodaj do Canvasa
    obraz.onload = function() {
        canvas.width = obraz.width;
        canvas.height = obraz.height;
        ctx.drawImage(obraz, 0 , 0, obraz.width , obraz.height);
        canvas.removeAttribute('data-caman-id');
    };
});

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
        if(e.target.classList.contains('vibrance-dodaj')) {
            Caman('#canvas', obraz, function() {
                this.vibrance(5).render();
            });
        }
        if(e.target.classList.contains('vibrance-odejmij')) {
            Caman('#canvas', obraz, function() {
                this.vibrance(-5).render();
            });
        }
        if (e.target.classList.contains("kontrast-dodaj")) {
            Caman("#canvas", obraz, function() {
                this.contrast(5).render();
            });
        }
        if (e.target.classList.contains("kontrast-odejmij")) {
            Caman("#canvas", obraz, function() {
                this.contrast(-5).render();
            });
        }
        if (e.target.classList.contains("saturacja-dodaj")) {
            Caman("#canvas", obraz, function() {
                this.saturation(5).render();
            });
        }
        if (e.target.classList.contains("saturacja-odejmij")) {
            Caman("#canvas", obraz, function() {
                this.saturation(-5).render();
            });
        }
        if (e.target.classList.contains("vintage")) {
            Caman("#canvas", obraz, function() {
                this.vintage().render();
            });
        }
        if (e.target.classList.contains("clarity")) {
            Caman("#canvas", obraz, function() {
                this.clarity().render();
            });
        }
        if (e.target.classList.contains("lomo")) {
            Caman("#canvas", obraz, function() {
                this.lomo().render();
            });
        }
        if (e.target.classList.contains("sinCity")) {
            Caman("#canvas", obraz, function() {
                this.sinCity().render();
            });
        }
        if (e.target.classList.contains("crossprocess")) {
            Caman("#canvas", obraz, function() {
                this.crossProcess().render();
            });
        }
        if (e.target.classList.contains("pinhole")) {
            Caman("#canvas", obraz, function() {
                this.pinhole().render();
            });
        }
        if (e.target.classList.contains("nostalgia")) {
            Caman("#canvas", obraz, function() {
                this.nostalgia().render();
            });
        }
        if (e.target.classList.contains("hermajesty")) {
            Caman("#canvas", obraz, function() {
                this.herMajesty().render();
            });
        }
        if (e.target.classList.contains("serduszka")) {
            Caman("#canvas", obraz, function() {
                var x=Math.random() * obraz.width;
                var y=Math.random() * obraz.height;
                ctx.beginPath();
                ctx.moveTo(x+75,y+40);
                ctx.fillStyle = "#FF0000";
                ctx.bezierCurveTo(x+75,y+37,x+70,y+25,x+50,y+25);
                ctx.bezierCurveTo(x+20,y+25,x+20,y+62.5,x+20,y+62.5);
                ctx.bezierCurveTo(x+20,y+80,x+40,y+102,x+75,y+120);
                ctx.bezierCurveTo(x+110,y+102,x+130,y+80,x+130,y+62.5);
                ctx.bezierCurveTo(x+130,y+62.5,x+130,y+25,x+100,y+25);
                ctx.bezierCurveTo(x+85,y+25,x+75,y+37,x+75,y+40);
                ctx.fill()
            });
        }
        if (e.target.classList.contains("kwadrat")) {
            Caman("#canvas", obraz, function() {
                var x=Math.random() * obraz.width;
                var y=Math.random() * obraz.height;
                ctx.fillStyle = "#000000";
                ctx.fillRect(x+25,y+25,100,100);
                ctx.clearRect(x+45,y+45,60,60);
                ctx.strokeRect(x+50,y+50,50,50);
            });
        }
        if (e.target.classList.contains("strzalka")) {
            Caman("#canvas", obraz, function() {
                var x=Math.random() * obraz.width;
                var y=Math.random() * obraz.height;
                ctx.fillStyle = "#000000";
                ctx.beginPath();
                ctx.moveTo(x+75,y+50);
                ctx.lineTo(x+100,y+75);
                ctx.lineTo(x+100,y+25);
                ctx.fill();
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
