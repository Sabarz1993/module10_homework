const btn = document.querySelector(".change_icon");

btn.addEventListener("click", ()=> {
    const widthScreen = window.screen.width;
    const heightScreeen = window.screen.height;
    alert("Screen size:" + " " + widthScreen + "px" + " on"  + " " + heightScreeen + "px")
})