/* ==================================
   WM DIGITALS - PREMIUM INTERACTIONS
=================================== */


/* ===============================
   LOADING SCREEN
================================ */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.transition = "0.8s ease";


        setTimeout(() => {

            loader.style.display = "none";

        }, 800);


    }, 1200);

});

/* ===============================
   CURSOR RADIAL GLOW
================================ */

const glow =
document.querySelector(".cursor-glow");


document.addEventListener(
    "mousemove",
    (event) => {

        glow.style.left =
            event.clientX + "px";

        glow.style.top =
            event.clientY + "px";

    }
);

/* ===============================
   ACTIVE NAVIGATION SCROLL
================================ */

const navLinks =
document.querySelectorAll(".nav-link");


const pageSections =
document.querySelectorAll("section");


window.addEventListener(
    "scroll",
    () => {


        let current = "";


        pageSections.forEach(section => {


            const sectionTop =
                section.offsetTop - 200;


            if(window.scrollY >= sectionTop) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {


            link.classList.remove("active");


            if(
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }
);

/* ===============================
   HAMBURGER MENU
================================ */

const hamburger =
document.querySelector(".hamburger");

const nav =
document.querySelector("nav");


hamburger.addEventListener("click", () => {

    nav.classList.toggle("active");

});


// CLOSE MENU AFTER CLICKING A LINK

document
.querySelectorAll(".nav-link")
.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});

/* ===============================
   DARK / LIGHT MODE
================================ */

const themeButton = document.getElementById("theme-toggle");

localStorage.setItem("theme","light");


themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")) {

        themeButton.textContent = "☀️";

    }

    else {

        themeButton.textContent = "🌙";

    }

});



/* ===============================
   HEADER EFFECT ON SCROLL
================================ */

const header = document.querySelector("header");


window.addEventListener("scroll", () => {

    if(window.scrollY > 50) {

        header.style.background =
            "rgba(0, 0, 0, 0.85)";

        header.style.padding =
            "12px 8%";

    }

    else {

        header.style.background =
            "rgba(5,5,5,0.65)";

        header.style.padding =
            "18px 8%";

    }

});




/* ===============================
   TYPEWRITER HERO EFFECT
================================ */

const heroTitle = document.querySelector(".hero h1");

const originalText = heroTitle.textContent;

heroTitle.textContent = "";

let index = 0;


function typeWriter() {


    if(index < originalText.length) {

        heroTitle.textContent += originalText.charAt(index);

        index++;

        setTimeout(typeWriter, 70);

    }

}


setTimeout(typeWriter, 1500);





/* ===============================
   SCROLL REVEAL ANIMATION
================================ */

const sections = document.querySelectorAll(
    "section"
);


const observer = new IntersectionObserver(
    (entries) => {


        entries.forEach(entry => {


            if(entry.isIntersecting) {

                entry.target.classList.add("show");

            }


        });


    },
    {
        threshold: 0.15
    }

);


sections.forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});






/* ===============================
   PROJECT FILTERING
================================ */

const filterButtons =
document.querySelectorAll(".filter-btn");

const projectCards =
document.querySelectorAll(".project-card");


filterButtons.forEach(button => {


    button.addEventListener("click", () => {


        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const category =
        button.textContent.toLowerCase();


        projectCards.forEach(card => {


            const cardCategory =
            card.dataset.category;


            if(category === "all" ||
               category === cardCategory) {


                card.style.display =
                "block";

            }


            else {


                card.style.display =
                "none";

            }


        });


    });


});





/* ===============================
   FLOATING PARTICLE EFFECT
================================ */

const particles =
document.getElementById("particles");


for(let i = 0; i < 50; i++) {


    const particle =
    document.createElement("span");


    particle.classList.add("particle");


    particle.style.left =
    Math.random() * 100 + "%";


    particle.style.top =
    Math.random() * 100 + "%";


    particle.style.animationDelay =
    Math.random() * 10 + "s";


    particle.style.animationDuration =
    (5 + Math.random() * 10) + "s";


    particles.appendChild(particle);


}



/* ===============================
   CONTACT FORM SUBMISSION
================================ */

const contactForm =
document.getElementById("contact-form");

const formStatus =
document.querySelector(".form-status");

const contactApiUrl =
window.WM_DIGITALS_API_URL ||
"http://localhost:5000/api/contact";

if(contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton =
        contactForm.querySelector("button[type='submit']");

        const formData =
        new FormData(contactForm);

        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message")
        };

        formStatus.textContent =
        "Sending your message...";

        formStatus.className =
        "form-status";

        submitButton.disabled = true;

        try {

            const response =
            await fetch(contactApiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result =
            await response.json();

            if(!response.ok) {
                throw new Error(result.message || "Unable to send message.");
            }

            formStatus.textContent =
            result.message;

            formStatus.classList.add("success");

            contactForm.reset();

        }
        catch(error) {

            formStatus.textContent =
            error.message || "Something went wrong. Please try again.";

            formStatus.classList.add("error");

        }
        finally {

            submitButton.disabled = false;

        }

    });

}



/* ===============================
   CONSOLE BRANDING
================================ */

console.log(
`
===================================
       WM DIGITALS
 Building the Future Through Tech
===================================

Designed & Developed by WM Digitals
`
);
