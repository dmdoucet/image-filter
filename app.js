const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let img = new Image();
let fileName = '';

const uploadFile = document.getElementById('upload-file');
const downloadBtn = document.getElementById('download-btn');
const removeBtn = document.getElementById('revert-btn');

//Add Filters and Effects
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    if (e.target.classList.contains('brightness-add')) {
      Caman('#canvas', img, function() {
        this.brightness(5).render();
      });
    } else if (e.target.classList.contains('brightness-remove')) {
      Caman('#canvas', img, function() {
        this.brightness(-5).render();
      });
    } else if (e.target.classList.contains('contrast-add')) {
      Caman('#canvas', img, function() {
        this.contrast(5).render();
      });
    } else if (e.target.classList.contains('contrast-remove')) {
      Caman('#canvas', img, function() {
        this.contrast(-5).render();
      });
    } else if (e.target.classList.contains('saturation-add')) {
      Caman('#canvas', img, function() {
        this.saturation(5).render();
      });
    } else if (e.target.classList.contains('saturation-remove')) {
      Caman('#canvas', img, function() {
        this.saturation(-5).render();
      });
    } else if (e.target.classList.contains('vibrance-add')) {
      Caman('#canvas', img, function() {
        this.vibrance(5).render();
      });
    } else if (e.target.classList.contains('vibrance-remove')) {
      Caman('#canvas', img, function() {
        this.vibrance(-5).render();
      });
    } else if (e.target.classList.contains('vintage-add')) {
      Caman('#canvas', img, function() {
        this.vintage().render();
      });
    } else if (e.target.classList.contains('lomo-add')) {
      Caman('#canvas', img, function() {
        this.lomo().render();
      });
    } else if (e.target.classList.contains('clarity-add')) {
      Caman('#canvas', img, function() {
        this.clarity().render();
      });
    } else if (e.target.classList.contains('sinCity-add')) {
      Caman('#canvas', img, function() {
        this.sinCity().render();
      });
    } else if (e.target.classList.contains('crossProcess-add')) {
      Caman('#canvas', img, function() {
        this.crossProcess().render();
      });
    } else if (e.target.classList.contains('pinHole-add')) {
      Caman('#canvas', img, function() {
        this.pinhole().render();
      });
    } else if (e.target.classList.contains('nostalgia-add')) {
      Caman('#canvas', img, function() {
        this.nostalgia().render();
      });
    } else if (e.target.classList.contains('herMajesty-add')) {
      Caman('#canvas', img, function() {
        this.herMajesty().render();
      });
    }
  }
});

// Remove Filters
removeBtn.addEventListener('click', (e) => {
  Caman('#canvas', img, function(){
    this.revert();
  });
});

//Upload File
uploadFile.addEventListener('change', (e) => {
  // get file
  const file = document.getElementById('upload-file').files[0];
  // init fileReader
  const reader = new FileReader();
  if (file) {
    //set file name
    fileName = file.name;
    //read data as url
    reader.readAsDataURL(file);
  }
  //add image to canvas
  reader.addEventListener('load', () => {
    //create Image
    img = new Image();
    //set src
    img.src = reader.result;
    // on image load - add to canvas
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);
      canvas.removeAttribute('data-caman-id');
    }
  }, false);
});

//Download Event
downloadBtn.addEventListener('click', (e) => {
  //get file exit
  const fileExtension = fileName.slice(-4);
  //init new filename
  let newFileName;
  //check image type
  if (fileExtension === '.jpg' || fileExtension === '.png') {
    newFileName = fileName.substring(0, fileName.length - 4) + '-edited.jpg';
  }
  //Call download
  download(canvas, newFileName);
});

//Download Function
function download(canvas, filename) {
  //init event
  let e;
  //create link
  const link = document.createElement('a');
  //set props
  link.download = filename;
  link.href = canvas.toDataURL('image/jpeg', 0.8);
  //new mouse event
  e = new MouseEvent('click');
  link.dispatchEvent(e);
}
