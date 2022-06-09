const workSheet = document.getElementById('work-sheet');
const ctx = workSheet.getContext('2d');

workSheet.width = window.innerWidth-16;
workSheet.height = 700;
ctx.lineWidth = 10;
ctx.lineCap = "round";

let sizeFormsX = 60, sizeFormsY = 60;

// Painting on the screen

let press = false;

const cmenu = document.querySelector('#toolbar>ul:nth-child(2)');

function draw(e){
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
}

// Pencil thickness

const pthick = document.getElementById('pthick');

pthick.addEventListener('input', ()=> {
    ctx.lineWidth = pthick.value;
});

// Pencil color

const pcolor = document.getElementById('pcolor');
pcolor.addEventListener('change', ()=> {
    ctx.strokeStyle = pcolor.value;
});

// Size Forms X

const formsX = document.getElementById('formsX');
formsX.addEventListener('input', ()=> {
    sizeFormsX = Number(formsX.value);
});

// Size Forms Y

const formsY = document.getElementById('formsY');
formsY.addEventListener('input', ()=> {
    sizeFormsY = Number(formsY.value);
});

// Menu change

const ppencil = document.getElementById('ppencil');
const pgum = document.getElementById('pgum');
const pline = document.getElementById('pline');

// CHANGE TOOL

let Useppencil = {use: false};
let changeUtility = ppencil, changeUseUtility = Useppencil;

function changeTool(tool){
    changeUtility.style.backgroundColor = 'rgb(109, 170, 255)';
    tool.style.backgroundColor = 'rgb(82, 141, 224)';
    changeUtility = tool;
    changeUseUtility.use = false;
    formsY.style.display = 'inline'; cmenu.style.paddingLeft = '0px';
}

function changeUseTool(useTool){
    changeUseUtility = useTool; changeUseUtility.use = true;
}

// PPENCIL

ppencil.addEventListener('click', ()=> {
    changeTool(ppencil); changeUseTool(Useppencil);
    ctx.strokeStyle = pcolor.value;
});

workSheet.addEventListener('mousedown', e => {
    if(Useppencil.use){
        if(e.button==0){
            press = true;
            ctx.beginPath(); draw(e);
        }
        workSheet.addEventListener('mousemove', e => {
            if(press) draw(e);
        });
        workSheet.addEventListener('mouseup', e => {
            press = false;
        });
    }
}); 

let Usepgum = {use: false};
pgum.addEventListener('click', ()=> {
    changeTool(pgum);
    ctx.strokeStyle = '#ffffff';
    changeUseTool(Useppencil);
});


let Usepline = {use: false};
pline.addEventListener('click', ()=> {
    changeTool(pline); changeUseTool(Usepline);
    ctx.strokeStyle = pcolor.value;

    let onepress = false,  posX=0,posY=0;
    workSheet.addEventListener('click', e => {
        if(Usepline.use){
            if(e.button==0){
                if(!onepress){
                    posX = e.offsetX; posY = e.offsetY;
                    onepress = true;
                }else{
                    ctx.beginPath();
                    ctx.moveTo(posX,posY);
                    ctx.lineTo(e.offsetX,e.offsetY); 
                    ctx.stroke();
                    onepress = false;
                }
            }
        }
    });    
});

// Geometry shapes

const circle = document.getElementById('circle');
const square = document.getElementById('square');
const triangle = document.getElementById('triangle');

let useSquare = {use: false}, useTriangle = {use: false}, useCircle = {use: false};

// SQUARE

square.addEventListener('click', ()=> {
    changeTool(square); changeUseTool(useSquare);
    ctx.strokeStyle = pcolor.value;
    workSheet.addEventListener('click', e => {

        if(useSquare.use){
            ctx.beginPath();
            ctx.rect(e.offsetX,e.offsetY,sizeFormsX,sizeFormsY);
            ctx.stroke();
        }
    });
});

// TRIANGLE

triangle.addEventListener('click', ()=> {
    changeTool(triangle); changeUseTool(useTriangle);
    ctx.strokeStyle = pcolor.value;
    workSheet.addEventListener('click', e => {

        if(useTriangle.use){
            console.log(sizeFormsX,sizeFormsY);
            ctx.beginPath();
            ctx.moveTo(e.offsetX,e.offsetY);
            ctx.lineTo(e.offsetX+sizeFormsX,e.offsetY+sizeFormsY);
            ctx.lineTo(e.offsetX-sizeFormsX,e.offsetY+sizeFormsY);
            ctx.closePath();
            ctx.stroke();
        }
    });
});

// CIRCLE

circle.addEventListener('click', ()=> {
    changeTool(circle); changeUseTool(useCircle);
    ctx.strokeStyle = pcolor.value;
    formsY.style.display = 'none';
    cmenu.style.paddingLeft = '57px';
    
    workSheet.addEventListener('click', e => {

        if(useCircle.use){
            ctx.beginPath();
            ctx.arc(e.offsetX,e.offsetY,sizeFormsX,0,Math.PI*2,true);
            ctx.closePath();
            ctx.stroke();
        }
    });
});