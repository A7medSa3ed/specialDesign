// Start Global Variable 

let backgroundOption = true,
    intervalRandImage;

////////////////////////////////////////

// Start Global Functions 

    // Scroll Options
    let scrollOptions = function(element){
        element.forEach(ele=>{
            ele.addEventListener("click",e=>{
                e.preventDefault();
                document.querySelector(e.target.dataset.section).scrollIntoView({
                    behavior:'smooth',
                    block:"center"
                })
              handleActive(e)
            })
        })
    }
    ////////////////////////

    // handle Active State

        function handleActive(ev){
            ev.target.parentElement.querySelectorAll(".active").forEach(ele=>{
                ele.classList.remove("active")
            })
            ev.target.classList.add("active")
        }
    ////////////////////////
////////////////////////////////////////

// Start Save Color In Local Storage

    let mainColor = localStorage.getItem("color_option");
    if( mainColor !== null){
        document.documentElement.style.setProperty("--mainColor", mainColor);
        document.querySelectorAll(".colors-list li").forEach(item=>{
            item.classList.remove("active");
            if(item.dataset.color === mainColor){
                item.classList.add("active")
            }
        });
    }
////////////////////////////////////////

// Start Save Background Option In Local Storage

    let localBackground = localStorage.getItem("background_option");
    if(localBackground !== null){
        document.querySelectorAll(".option-container span").forEach(span=>{
            span.classList.remove("active")});
        localBackground === 'true' ? (
            backgroundOption = true, 
            document.querySelector(".option-container .yes").classList.add("active")) : (
            backgroundOption = false,
            document.querySelector(".option-container .no").classList.add("active"));
}
////////////////////////////////////////

// Start Save ScrollBullets Option In Local Storage

let scrollItem = localStorage.getItem("bullets_option");
if(scrollItem !== null){
    document.querySelectorAll(".bullets-option span").forEach(span=>{
            span.classList.remove("active")});
        scrollItem === 'show' ? (
        document.querySelector(".navBullets").style.display = "block",
        document.querySelector(".bullets-option .show").classList.add("active")) : (
        document.querySelector(".navBullets").style.display = "none",
        document.querySelector(".bullets-option .hide").classList.add("active"));
}
////////////////////////////////////////

// Start Reset options
    document.querySelector(".setting-box .resetOptions").onclick = function(){
        // localStorage.clear(); // it will delete all thing in local storage.
        localStorage.removeItem("color_option") // it will remove this item only
        localStorage.removeItem("background_option")
        localStorage.removeItem("bullets_option")
        window.location.reload();
    }
////////////////////////////////////////

// Start Scroll Options

window.onscroll = function(e){
    
    // About Us Scroll

    let aboutUs = document.querySelector(".about-us"),
        aboutOffsetTop = aboutUs.offsetTop,
        aboutSectionHeight = aboutUs.offsetHeight,
        windowHight   = this.innerHeight,
        scrollSize    =  this.pageYOffset;
    if(scrollSize >= aboutOffsetTop + aboutSectionHeight - windowHight){
        aboutUs.classList.add("active")
    }
    ////////////////////////

    // Our Skills Scroll

    let ourSkills = document.querySelector(".our-skills")
        SkillsoffsetTop = ourSkills.offsetTop,
        skillssectionHeight = ourSkills.offsetHeight;
        if(scrollSize >= skillssectionHeight + SkillsoffsetTop - windowHight){
            document.querySelectorAll(".our-skills .skill-box span").forEach(span=>{
                span.style.width = span.dataset.progress;
            })
        }
    ////////////////////////

    // TimeLine Scroll

        let timeline = document.querySelectorAll(".timeline .content");
        timeline.forEach(content=>{
            let winowOffsetTop = content.parentElement.parentElement.offsetTop,
                contentOffsetTop = content.parentElement.offsetTop,
                contentSectionHeight = content.offsetHeight;
            if(scrollSize >= winowOffsetTop + contentOffsetTop + contentSectionHeight - windowHight){
                content.style.opacity = 1
            }
        })
    ////////////////////////

    // NavLink Scroll

       let navlinks = document.querySelectorAll(".header-area a");
       navlinks.forEach(sLink=>{
           let eleOffsetTop= document.querySelector(sLink.dataset.section).getBoundingClientRect().top;
           if((eleOffsetTop) == 0){
               document.querySelectorAll(".header-area a").forEach(item=> item.classList.remove("active"))      
               sLink.classList.add("active")
           }
       })
    ////////////////////////

    // Bullet Scroll

        let navBullets = document.querySelectorAll(".navBullets .bullet");
            navBullets.forEach(bullet=>{
                 eleOffsetTop= document.querySelector(bullet.dataset.section).getBoundingClientRect().top ;
                if((eleOffsetTop - windowHight/2) <= 0){
                    document.querySelectorAll(".bullet").forEach(item=>{
                        item.classList.remove("active")
                    })      
                    bullet.classList.add("active")
                }
            })
    ///////////////////////
} 
////////////////////////////////////////

// Start Open Setting Box

    let myGear      = document.querySelector(".setting-box"),
        mySpinner   = document.querySelector(".fa-gear")
    myGear.onmouseenter = function(){
        myGear.classList.add("open");
        mySpinner.classList.add("fa-spin")
    }
    myGear.onmouseleave = function(){
        myGear.classList.remove("open");
        mySpinner.classList.remove("fa-spin")
    }
////////////////////////////////////////

// Start Bullet Setting
    let bullets = document.querySelectorAll(".navBullets .bullet");
        scrollOptions(bullets);
////////////////////////////////////////

// Start navbar Links Setting

    let navLinks = document.querySelectorAll(".header-area li");
        scrollOptions(navLinks)

////////////////////////////////////////

// Start Change Color

    let colorList = document.querySelectorAll(".colors-list li")
    colorList.forEach(li=>{
        li.addEventListener("click", e => {
            document.documentElement.style.setProperty("--mainColor", e.target.dataset.color);
            localStorage.setItem("color_option", e.target.dataset.color);
            handleActive(e);
        })
       
    })
////////////////////////////////////////

// Start Change Landig Page Image

    let landingImg = document.querySelector(".landing-page"), 
        myImg = ["pic1.jpg","pic2.jpg","pic3.jpg","pic4.jpg","pic5.jpg"];
    function randomizeImg(){
        if(backgroundOption === true){
            intervalRandImage = setInterval(_=>{
                randomImg = Math.floor(Math.random() * myImg.length);
                landingImg.style.backgroundImage = `url(./Images/${myImg[randomImg]})`;
            },3000)
        } 
    };
    randomizeImg();

////////////////////////////////////////

// Start Enable/Disable Random Image

    let randImg = document.querySelectorAll(".option-container span")
    randImg.forEach(span=>{
        span.addEventListener("click", e => {
            handleActive(e);
        e.target.dataset.randimage === "Yes" ? 
            (backgroundOption = true, randomizeImg(), localStorage.setItem("background_option", backgroundOption)) :
            (backgroundOption = false, clearInterval(intervalRandImage), localStorage.setItem("background_option", backgroundOption))
    })})
////////////////////////////////////////

// Start Enable/Disable Scroll Bullets

    let bullets_option      = document.querySelectorAll(".bullets-option span"),
        bulletsContainer    = document.querySelector(".navBullets") ;
    bullets_option.forEach(item=>{
        item.addEventListener("click",e=>{
            e.target.dataset.scrollbullet === "show" ? (
                bulletsContainer.style.display = "block",
                localStorage.setItem("bullets_option",e.target.dataset.scrollbullet)
            ) : (
                bulletsContainer.style.display = "none",
                localStorage.setItem("bullets_option",e.target.dataset.scrollbullet)
            )
         handleActive(e)
        })
    })

////////////////////////////////////////

// Start Pop Up Image in gallery

   let ourGallery =  document.querySelectorAll(".gallery .image-box img");
   ourGallery.forEach(image=>{
    image.addEventListener("click", e=>{
           let overlay = document.createElement("div");
           overlay.className = "popOverlay";
           document.body.appendChild(overlay);
           let popUpBox = document.createElement("div");
           popUpBox.className= "popUpBox";
           let popTxt = document.createElement("h3");
           let imgTxt = document.createTextNode(image.alt);
           popTxt.appendChild(imgTxt);
           popUpBox.appendChild(popTxt);
           let closeBtn = document.createElement("span");
           closeBtn.className= "closeBtn";
           let closeSign = document.createTextNode("X");
           closeBtn.appendChild(closeSign);
           popUpBox.appendChild(closeBtn);
           let popUpImage = document.createElement("img");
           popUpImage.src=image.src;
           popUpBox.appendChild(popUpImage)
           document.body.appendChild(popUpBox);
       })})

       // close popUp
   document.addEventListener("click",e=>{
       if(e.target.className=== 'closeBtn'){
           e.target.parentNode.remove();
           document.querySelector(".popOverlay").remove()
       }})
////////////////////////////////////////

// Start Toggle Menu on Small Screen

let toggleMenu = document.querySelector(".header-area .toggleBtn"),
    linksContainer = document.querySelector(".links");
    linksContainer.onclick = e => e.stopPropagation();
    toggleMenu.onclick = function(e){
        e.stopPropagation();
        this.classList.toggle("menu-active")
        linksContainer.classList.toggle("open")
    }
    document.addEventListener("click", e=>{
        if(e.taget !== toggleMenu){
            if(linksContainer.classList.contains("open")){
                toggleMenu.classList.toggle("menu-active");
                linksContainer.classList.toggle("open")
            }
        }
    })
////////////////////////////////////////