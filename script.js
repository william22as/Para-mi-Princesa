/* =========================================================
   1 DE OCTUBRE ❤️
   JAVASCRIPT COMPLETO
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const openButton = document.getElementById("openButton");

const welcome = document.getElementById("welcome");

const mainContent = document.getElementById("mainContent");

const music = document.getElementById("music");

const playButton = document.getElementById("playButton");

const playIcon = document.getElementById("playIcon");

const progress = document.getElementById("progress");

const progressBar = document.getElementById("progressBar");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const vinyl = document.querySelector(".vinyl");

const heartsContainer =
    document.querySelector(".hearts-container");


/* =========================================================
   VARIABLES
========================================================= */

let musicStarted = false;


/* =========================================================
   INTENTAR AUTOPLAY AL CARGAR
========================================================= */

/*
    El navegador puede bloquear el autoplay con sonido.

    Por eso lo intentamos al cargar.

    Si el navegador lo permite:
        → empieza la canción.

    Si lo bloquea:
        → esperamos al botón "Descubrir nuestro recuerdo".
*/

window.addEventListener("load", function () {

    startMusicAutomatically();

});


async function startMusicAutomatically() {

    try {

        await music.play();

        musicStarted = true;

        updatePlayingInterface();

    } catch (error) {

        console.log(
            "El navegador bloqueó el autoplay. " +
            "La canción comenzará al interactuar."
        );

        musicStarted = false;

        updatePausedInterface();

    }

}


/* =========================================================
   BOTÓN "DESCUBRIR NUESTRO RECUERDO"
========================================================= */

openButton.addEventListener("click", async function () {


    /*
        Primero intentamos iniciar la canción.

        Como este botón representa una interacción
        real del usuario, Chrome normalmente permite
        reproducir el audio aquí.
    */

    try {

        await music.play();

        musicStarted = true;

        updatePlayingInterface();

    } catch (error) {

        console.log(
            "No se pudo reproducir la canción:",
            error
        );

    }


    /*
        Animación de salida
    */

    welcome.classList.add("hide");


    /*
        Corazones especiales
    */

    createHeartExplosion();


    /*
        Mostrar página principal
    */

    setTimeout(function () {

        welcome.style.display = "none";

        mainContent.classList.add("show");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 1000);

});


/* =========================================================
   BOTÓN PLAY / PAUSA
========================================================= */

playButton.addEventListener("click", async function () {


    /*
        Si está pausada:
        reproducir.
    */

    if (music.paused) {

        try {

            await music.play();

            musicStarted = true;

            updatePlayingInterface();

        } catch (error) {

            console.log(
                "No se pudo reproducir:",
                error
            );

        }

    }


    /*
        Si está reproduciéndose:
        pausar.
    */

    else {

        music.pause();

        updatePausedInterface();

    }

});


/* =========================================================
   INTERFAZ CUANDO REPRODUCE
========================================================= */

function updatePlayingInterface() {

    playIcon.textContent = "❚❚";

    vinyl.classList.add("playing");

}


/* =========================================================
   INTERFAZ CUANDO ESTÁ PAUSADA
========================================================= */

function updatePausedInterface() {

    playIcon.textContent = "▶";

    vinyl.classList.remove("playing");

}


/* =========================================================
   EVENTO PLAY DEL AUDIO
========================================================= */

music.addEventListener("play", function () {

    musicStarted = true;

    updatePlayingInterface();

});


/* =========================================================
   EVENTO PAUSE DEL AUDIO
========================================================= */

music.addEventListener("pause", function () {

    updatePausedInterface();

});


/* =========================================================
   CUANDO TERMINA
========================================================= */

/*
    Como tenemos "loop", normalmente este evento
    no será necesario.

    Lo dejamos por seguridad.
*/

music.addEventListener("ended", function () {

    updatePausedInterface();

});


/* =========================================================
   CARGAR DURACIÓN
========================================================= */

music.addEventListener(
    "loadedmetadata",
    function () {

        if (!isNaN(music.duration)) {

            duration.textContent =
                formatTime(music.duration);

        }

    }
);


/* =========================================================
   ACTUALIZAR PROGRESO
========================================================= */

music.addEventListener(
    "timeupdate",
    function () {

        if (
            !music.duration ||
            isNaN(music.duration)
        ) {

            return;

        }


        const percentage =
            (music.currentTime /
                music.duration) * 100;


        progress.style.width =
            percentage + "%";


        currentTime.textContent =
            formatTime(music.currentTime);

    }
);


/* =========================================================
   CLICK EN LA BARRA DE PROGRESO
========================================================= */

progressBar.addEventListener(
    "click",
    function (event) {


        if (
            !music.duration ||
            isNaN(music.duration)
        ) {

            return;

        }


        const rect =
            progressBar.getBoundingClientRect();


        const clickPosition =
            event.clientX - rect.left;


        const percentage =
            clickPosition / rect.width;


        music.currentTime =
            percentage * music.duration;

    }
);


/* =========================================================
   FORMATO DEL TIEMPO
========================================================= */

function formatTime(seconds) {


    if (
        isNaN(seconds) ||
        seconds < 0
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(seconds / 60);


    const secondsRemaining =
        Math.floor(seconds % 60);


    return (
        minutes +
        ":" +
        (
            secondsRemaining < 10
                ? "0" + secondsRemaining
                : secondsRemaining
        )
    );

}


/* =========================================================
   CORAZONES FLOTANTES
========================================================= */

function createFloatingHeart() {


    const heart =
        document.createElement("div");


    heart.classList.add(
        "floating-heart"
    );


    heart.innerHTML = "♥";


    const size =
        Math.random() * 20 + 10;


    heart.style.fontSize =
        size + "px";


    heart.style.left =
        Math.random() * 100 + "%";


    const animationDuration =
        Math.random() * 8 + 7;


    heart.style.animationDuration =
        animationDuration + "s";


    heart.style.animationDelay =
        Math.random() * 2 + "s";


    heartsContainer.appendChild(
        heart
    );


    setTimeout(
        function () {

            heart.remove();

        },
        (animationDuration + 3) * 1000
    );

}


/* =========================================================
   CREAR CORAZONES CONSTANTEMENTE
========================================================= */

setInterval(
    createFloatingHeart,
    800
);


/* =========================================================
   EXPLOSIÓN DE CORAZONES
========================================================= */

function createHeartExplosion() {


    for (
        let i = 0;
        i < 35;
        i++
    ) {


        setTimeout(
            function () {


                const heart =
                    document.createElement("div");


                heart.classList.add(
                    "floating-heart"
                );


                heart.innerHTML = "♥";


                heart.style.left =
                    Math.random() * 100 + "%";


                heart.style.bottom =
                    Math.random() * 40 + "%";


                heart.style.fontSize =
                    Math.random() * 25 + 12 + "px";


                heart.style.animationDuration =
                    Math.random() * 4 + 3 + "s";


                heartsContainer.appendChild(
                    heart
                );


                setTimeout(
                    function () {

                        heart.remove();

                    },
                    8000
                );


            },
            i * 80
        );

    }

}


/* =========================================================
   TECLADO
========================================================= */

/*
    Barra espaciadora:
    Play / Pause
*/

document.addEventListener(
    "keydown",
    function (event) {


        if (
            event.code === "Space"
        ) {


            const activeElement =
                document.activeElement;


            const tag =
                activeElement.tagName;


            /*
                Evitar interferir con botones,
                inputs y otros elementos.
            */

            if (
                tag !== "BUTTON" &&
                tag !== "INPUT" &&
                tag !== "TEXTAREA"
            ) {


                event.preventDefault();


                playButton.click();

            }

        }

    }
);
