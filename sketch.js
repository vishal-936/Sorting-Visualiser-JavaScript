var values=[]
const x_size=400
const y_size=400
var w;
var state=[]
var slider;
var button;
var slider1;

function setup() {
  let s=createElement('h3',"Speed")
  let name=createElement('h1',"Sorting Visualiser")
  s.position(90,510)
  name.position(90,1)
  name.style('color','Black')
  name.style('background-color','rgb(102, 255, 51)')
  s1=createElement('h3',"Number of Elements")
  s1.position(220,510)
  let canvas=createCanvas(500, 500);
  canvas.style('Padding','56px')
  button=createButton("Generate");
  slider=createSlider(0.5,5,2);
  slider1=createSlider(10,40,20)
  button.mousePressed(start);
  
}
function start(){
  
  values=new Array(floor(x_size/(40-slider1.value())))
  for(let i=0;i<values.length;i++){
    values[i]=int(random(y_size))
    state[i]=-1
  }
  QuickSort(values,0,values.length-1)
  console.log(values)
}

async function QuickSort(arr,start,end){
  if(start<=end){
    let pi=await partition(arr,start,end);
    Promise.all([
    QuickSort(arr, start, pi - 1),
    QuickSort(arr, pi + 1, end)
  ]);
    
  }
}
async function partition(arr,start,end){
  let i=start-1;
  let pivot=arr[end]
for(let j=start;j<=end;j++){
  state[j]=1;
}
  state[end]=0;
  for(let j=start;j<=end-1;j++){
    if(arr[j]<pivot){
      i++
      state[i]=-1
      state[j]=-1
      await Swap(arr,i,j)
      state[j]=1
      state[i]=1
    }
  }
  await Swap(arr,i+1,end)
  state[end]=1
  return i+1
  
}

async function Swap(arr,a,b){
  await sleep((5-slider.value())*100)
  let t=arr[a];
  arr[a]=arr[b];
  arr[b]=t;
}

function draw() {
  background(255, 255, 255);
  for(let i=0;i<values.length;i++){
    if (state[i] == 0) {
      fill('#E0777D');
    } else if (state[i] == 1) {
      fill('#D6FFB7');
    } else {
      fill(0, 102, 255);
    }
    rect((40-slider1.value())*i,height-40-values[i],(40-slider1.value()),values[i])
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}