const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("image-view");

const convertButton = document.getElementById("convert-button");

let screenWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

inputFile.addEventListener("change", uploadImage);

function uploadImage(){
    let imageURl = URL.createObjectURL(inputFile.files[0]);
    imageView.style.backgroundImage = `url(${imageURl})`;

    for (child of imageView.children){
        child.style.visibility = "hidden";
    }
    convertButton.style.visibility = "visible";
}

function radToDeg(rad) {
    return rad / (Math.PI / 180);
  }

dropArea.addEventListener("dragover", function(e){
    e.preventDefault();
})

dropArea.addEventListener("drop", function(e){
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadImage();
})

const constrain = 20;

function transforms(x, y, el) {
    let box = el.getBoundingClientRect();
    let calcX = -(y - box.y - (box.height / 2)) / constrain;
    let calcY = (x - box.x - (box.width / 2)) / constrain;
    
    return "perspective(2000px) "
      + "   rotateX("+ calcX +"deg) "
      + "   rotateY("+ calcY +"deg) ";
};

function transformElement(el, xyEl) {
    el.style.transform  = transforms.apply(null, xyEl);
}

dropArea.onmousemove = function(e){
    //more smooth 
    let xy = [e.clientX, e.clientY];
    let position = xy.concat([dropArea]);
    window.requestAnimationFrame(function() {
        transformElement(dropArea, position);
    });
}

dropArea.addEventListener("mouseleave", function(e){
    dropArea.style.transform = "perspective(2000px) rotateX(0deg) rotateY(0deg)"
})