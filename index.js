const createElement = (tagName, ...properties) => Object.assign(document.createElement(tagName), ...properties);
const createTagFactory = tagName => (...properties) => createElement(tagName, ...properties);
const Div = createTagFactory('div');
const Button = createTagFactory('button');
const Section = createTagFactory('section');

const prizes = ['100', '200', '300', '400', '500', '600', '700', '800'];
const root = document.getElementById('root');
const container = Div({className: 'container', style: 'width: 500px; height: 500px'});
const wheel = Div({className: 'wheel'});
const marker = Div({className: 'marker'});
const startButton = Button({className: 'start', innerText: 'Roulette Start!'});
root.appendChild(startButton);
root.appendChild(container);
container.appendChild(wheel);
container.appendChild(marker);

class Roulette {
  deg;
  render(el){
    el.style.transform = `rotate(${this.deg}deg)`
  }
}

let lock = false;
const startAnage = 0;
const endAngle = 155;
const currentAngle = ((endAngle-startAnage) * 360) / 60;

const roulette = new Roulette();
roulette.deg = startAnage;
const spin = () => {
  if(roulette.deg >= currentAngle) return;
  
  roulette.deg += 10;
  roulette.render(wheel);
  requestAnimationFrame(spin);
}

startButton.addEventListener('click', () => {
  if(lock) return;
  lock = true;
  requestAnimationFrame(spin);
});

start = 0;
end = 100;
duration = 1000;
fragment = (end - start) / ((60 / 1000) * duration);

/**
 * FPS - 초당프레임 https://namu.wiki/w/FPS
 * requestAnimationFrame 은 1초당 60번 함수를 실행되는데, 거리가 0에서 100까지 1초 동안 움직인다고 했을 때 60을 나누고,
 * 
 */

requestAnimationFrame(function draw() {
  start += fragment;
  if (start < end) {
    console.log(start);
    requestAnimationFrame(draw)
  } else {
    start = end;
    console.log(start);
  }
}); 

return;

let en = 0;
const e = () => {
  en += 10;
}

start = 0;
fragment = 0.1;
requestAnimationFrame(function draw() {
  if(en > 0){
    start += fragment;
    en -= 0.1;
    console.log(start);
  }
  requestAnimationFrame(draw);
});

window.e = e;