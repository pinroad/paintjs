const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//* 기본이미지 white 설정 → 만약 설정 안할 시, 배경은 투명값 저장
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// ctx.fillStyle = 'darkgreen';
// ctx.fillRect(50, 20, 100, 40);

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  //* clientX,Y : 윈도우 전체의 좌표
  //* 캔버스내 좌표 - offsetX, offsetY

  const x = event.offsetX;
  const y = event.offsetY;
  // console.log('x', x, 'y', y);

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    // console.log('creating line in', x, y);
  } else {
    // painting이 시작되면 path의 이전 위치에서 지금까지의 선을 만든다.
    // console.log('Click! creating line in', x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

//* 색상바꾸기
function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  console.log(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

//* 라인 사이즈 바꾸기
function handleRangeChange(e) {
  const size = e.target.value;
  ctx.lineWidth = size;
}

function hanldeModeClick(e) {
  if (filling === true) {
    filling = false;
    mode.innerText = 'FILL';
  } else {
    filling = true;
    mode.innerText = 'PAINT';
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(e) {
  e.preventDefault();
}

//* canvas 데이터를 저장하는 함수
function hanldeSaveClick(e) {
  const image = canvas.toDataURL('image/jpeg');
  // a 태그 생성
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS';
  link.click();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  // 마우스 클릭시 발생하는 이벤트
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  // 캔버스를 벗어났을 때 액션
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  // 캔버스 자체 단축메뉴
  canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', handleColorClick)
);

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', hanldeModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener('click', hanldeSaveClick);
}
