/*=========================================================
    SkillForge Training Institute
    script.js - Part 1
=========================================================*/

"use strict";

/*=========================================================
    DOM Ready
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    pageLoader();

    stickyNavbar();

    scrollTopButton();

    activeNavLink();

    smoothScrolling();

    closeMobileMenu();

    updateYear();

});


/*=========================================================
    Page Loader
=========================================================*/

function pageLoader(){

    const loader = document.querySelector(".loader");

    if(loader){

        window.addEventListener("load",()=>{

            loader.style.opacity="0";

            setTimeout(()=>{

                loader.style.display="none";

            },500);

        });

    }

}


/*=========================================================
    Sticky Navbar
=========================================================*/

function stickyNavbar(){

    const navbar=document.querySelector(".custom-navbar");

    if(!navbar) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>80){

            navbar.style.padding="10px 0";

            navbar.style.boxShadow="0 15px 40px rgba(0,0,0,.12)";

        }

        else{

            navbar.style.padding="15px 0";

            navbar.style.boxShadow="0 10px 30px rgba(0,0,0,.08)";

        }

    });

}


/*=========================================================
    Scroll To Top
=========================================================*/

function scrollTopButton(){

    const btn=document.querySelector(".scroll-top");

    if(!btn) return;

    btn.style.display="none";

    window.addEventListener("scroll",()=>{

        if(window.scrollY>400){

            btn.style.display="flex";

        }

        else{

            btn.style.display="none";

        }

    });

    btn.addEventListener("click",(e)=>{

        e.preventDefault();

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}


/*=========================================================
    Active Navigation
=========================================================*/

function activeNavLink(){

    const current=window.location.pathname.split("/").pop();

    const links=document.querySelectorAll(".navbar-nav .nav-link");

    links.forEach(link=>{

        link.classList.remove("active");

        const href=link.getAttribute("href");

        if(href===current || (current==="" && href==="index.html")){

            link.classList.add("active");

        }

    });

}


/*=========================================================
    Smooth Scroll
=========================================================*/

function smoothScrolling(){

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                e.preventDefault();

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        });

    });

}


/*=========================================================
    Mobile Menu Auto Close
=========================================================*/

function closeMobileMenu(){

    const navLinks=document.querySelectorAll(".navbar-nav .nav-link");

    const nav=document.querySelector(".navbar-collapse");

    navLinks.forEach(link=>{

        link.addEventListener("click",()=>{

            if(nav.classList.contains("show")){

                new bootstrap.Collapse(nav).hide();

            }

        });

    });

}


/*=========================================================
    Update Footer Year
=========================================================*/

function updateYear(){

    const year=document.querySelector("#year");

    if(year){

        year.textContent=new Date().getFullYear();

    }

}


/*=========================================================
    script.js - Part 2
    GSAP + Scroll Animations
=========================================================*/


/*=========================================================
    GSAP Animation
=========================================================*/

if(typeof gsap !== "undefined"){

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-content",{
        y:80,
        opacity:0,
        duration:1,
        ease:"power3.out"
    });

    gsap.from(".hero-image",{
        x:80,
        opacity:0,
        duration:1,
        delay:.3,
        ease:"power3.out"
    });

    gsap.utils.toArray(".section-title").forEach(section=>{

        gsap.from(section,{
            scrollTrigger:{
                trigger:section,
                start:"top 85%"
            },
            y:60,
            opacity:0,
            duration:1
        });

    });

    gsap.utils.toArray(".card,.feature-card,.course-card,.trainer-card,.testimonial-card,.gallery-item,.contact-info-card").forEach(item=>{

        gsap.from(item,{
            scrollTrigger:{
                trigger:item,
                start:"top 88%"
            },
            y:60,
            opacity:0,
            duration:.9
        });

    });

}


/*=========================================================
    Counter Animation
=========================================================*/

const counters=document.querySelectorAll(".counter");

if(counters.length){

    const runCounter=(counter)=>{

        const target=+counter.dataset.target;

        let count=0;

        const speed=target/120;

        const update=()=>{

            count+=speed;

            if(count<target){

                counter.innerText=Math.floor(count);

                requestAnimationFrame(update);

            }else{

                counter.innerText=target;

            }

        };

        update();

    };

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                runCounter(entry.target);

                observer.unobserve(entry.target);

            }

        });

    });

    counters.forEach(counter=>observer.observe(counter));

}


/*=========================================================
    Progress Bars
=========================================================*/

document.querySelectorAll(".progress-bar").forEach(bar=>{

    const value=bar.dataset.width;

    bar.style.width="0";

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                bar.style.transition="1.5s";

                bar.style.width=value+"%";

            }

        });

    });

    observer.observe(bar);

});


/*=========================================================
    Gallery Hover
=========================================================*/

document.querySelectorAll(".gallery-item").forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        item.style.transform="translateY(-10px)";

    });

    item.addEventListener("mouseleave",()=>{

        item.style.transform="translateY(0px)";

    });

});


/*=========================================================
    FAQ Animation
=========================================================*/

document.querySelectorAll(".accordion-button").forEach(btn=>{

    btn.addEventListener("click",()=>{

        btn.classList.toggle("active");

    });

});


/*=========================================================
    Floating Elements
=========================================================*/

document.querySelectorAll(".floating").forEach(item=>{

    item.style.animation="floating 4s ease-in-out infinite";

});


/*=========================================================
    Image Hover Shadow
=========================================================*/

document.querySelectorAll(".image-hover").forEach(img=>{

    img.addEventListener("mouseenter",()=>{

        img.style.boxShadow="0 25px 60px rgba(79,70,229,.25)";

    });

    img.addEventListener("mouseleave",()=>{

        img.style.boxShadow="none";

    });

});

/*=========================================================
    script.js - Part 3 (Final)
=========================================================*/


/*=========================================================
    Dark Mode Toggle
=========================================================*/

const darkModeBtn = document.querySelector("#darkModeToggle");

if(darkModeBtn){

    darkModeBtn.addEventListener("click",()=>{

        document.body.classList.toggle("dark-mode");

        const enabled = document.body.classList.contains("dark-mode");

        localStorage.setItem("darkMode",enabled);

    });

    if(localStorage.getItem("darkMode")==="true"){

        document.body.classList.add("dark-mode");

    }

}


/*=========================================================
    Contact Form Validation
=========================================================*/

const contactForm=document.querySelector("form");

if(contactForm){

    contactForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const name=contactForm.querySelector('input[type="text"]');
        const email=contactForm.querySelector('input[type="email"]');
        const message=contactForm.querySelector("textarea");

        if(
            name.value.trim()==="" ||
            email.value.trim()==="" ||
            message.value.trim()===""
        ){

            alert("Please fill in all required fields.");

            return;

        }

        alert("✅ Your message has been sent successfully!");

        contactForm.reset();

    });

}


/*=========================================================
    Typing Effect
=========================================================*/

const typingElement=document.querySelector(".typing-text");

if(typingElement){

    const words=[
        "Learn Skills",
        "Build Projects",
        "Become Professional",
        "Start Your Career"
    ];

    let wordIndex=0;
    let charIndex=0;
    let deleting=false;

    function typing(){

        const currentWord=words[wordIndex];

        if(!deleting){

            typingElement.textContent=currentWord.substring(0,charIndex++);

            if(charIndex>currentWord.length){

                deleting=true;

                setTimeout(typing,1200);

                return;

            }

        }else{

            typingElement.textContent=currentWord.substring(0,charIndex--);

            if(charIndex<0){

                deleting=false;

                wordIndex=(wordIndex+1)%words.length;

            }

        }

        setTimeout(typing,deleting?50:120);

    }

    typing();

}


/*=========================================================
    Mouse Glow Effect
=========================================================*/

document.addEventListener("mousemove",(e)=>{

    const glow=document.querySelector(".mouse-glow");

    if(glow){

        glow.style.left=e.clientX+"px";

        glow.style.top=e.clientY+"px";

    }

});


/*=========================================================
    Welcome Animation
=========================================================*/

window.addEventListener("load",()=>{

    console.log("%c🚀 Welcome To SkillForge Training Institute",
    "color:#4F46E5;font-size:18px;font-weight:bold;");

});


/*=========================================================
    Disable Right Click (Optional)
=========================================================*/

// Uncomment if required

/*
document.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
});
*/


/*=========================================================
    Disable F12 (Optional)
=========================================================*/

// Uncomment if required

/*
document.addEventListener("keydown",(e)=>{

    if(e.key==="F12"){

        e.preventDefault();

    }

});
*/


/*=========================================================
    End Of File
=========================================================*/

console.log("====================================");
console.log("SkillForge Training Institute");
console.log("Frontend Project Completed");
console.log("HTML5 | CSS3 | Bootstrap 5");
console.log("JavaScript ES6 | GSAP");
console.log("====================================");