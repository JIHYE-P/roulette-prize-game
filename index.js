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

const prizesData = prizes.map((prize, i, array) => {
  const data = {}
  const deg = 360/array.length;
  data.prize = prize;
  data.start = deg * i;
  data.end = deg * (i + 1);
  return data;
});

