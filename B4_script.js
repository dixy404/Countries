let drzave = [];

function ucitajDrzave(region) {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            drzave = JSON.parse(request.responseText);
            prikaziDrzave();
            prikazi5Najbrojnih();
            prikaziBrojDrzava();
            saberiPopulaciju();
            popuniGradove();

        } else if (request.readyState == 4 && request.status != 200) {
            document.body.style.backgroundColor = "red";
        }
    }

    request.open("GET", "https://restcountries.eu/rest/v2/region/" + region);
    request.send();

}


//prikaz naziva država koje imaju manje od 5,000,000 stanovnika
function prikaziDrzave() {
    document.getElementById("drzave").innerHTML = "";
    drzave.forEach(drzava => {
        if (drzava.population <= 5000000) {
            document.getElementById("drzave").innerHTML +=
                "<li>" + drzava.name + "</li>";
        }
    });
}

//prikaz 5 država sa najviše stanovnika za odabrani region
function prikazi5Najbrojnih() {
    document.getElementById("top5").innerHTML = "";
    drzave.sort((a, b) => {
        return b.population - a.population;
    });
    for (i = 0; i < 5; i++) {
        document.getElementById("top5").innerHTML += 
        "<li class=\"list-group-item\">" + drzave[i].name + "</li> ";
    }
}

//ukupan broj država za odabrani region
function prikaziBrojDrzava() {
    document.getElementById("broj-drzava").innerHTML =
        "Država: " + drzave.length ;
}

//ukupan broj stanovnika u svim državama za odabrani region
function saberiPopulaciju() {
    let s = 0;
    drzave.forEach(drzava=>{
        s+= drzava.population;
    });

    document.getElementById("ukupan-broj-stanovnika")
    .innerHTML = "Stanovnika: " + s ;
}

//odabir glavnog grada
function popuniGradove(){
    document.getElementById("gradovi").innerHTML = "";
    drzave.forEach(drzava => {
        document.getElementById("gradovi").innerHTML +=
            "<option value=\""+drzava.capital + "\">"
            + drzava.capital + "</option>";
    });
}

//modal za unos teksta u kojem korisnik upisuje naziv države na engleskom jeziku
function unesiNazivDrzave(grad) {
    let nazivDrzave = prompt("Unesite naziv države na engleskom jeziku:");
    drzave.forEach(drzava => {
        if(drzava.capital == grad) {
            if(nazivDrzave == drzava.name) {
                alert("Tačan odgovor!");
            } else {
                alert("Grad se nalazi u državi: " + drzava.name);
            }
        }
    });
}




setTimeout(function () {
    let region = prompt("Unesite ime regiona:");
    if (region)
        ucitajDrzave(region);
}, 10000)
