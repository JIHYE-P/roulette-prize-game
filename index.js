class ElementBundler {
  root;
  constructor(tagName, properties = {}){
    this.root = Object.assign(document.createElement(tagName), {...properties});
  }
  setStyle(style = {}){
    Object.assign(this.root.style, {...style});
  }
  appendTo(el){
    if(el instanceof ElementBundler) el.root.appendChild(this.root);
    else if(el instanceof Node) el.appendChild(this.root);
  }
  addClass(...className){
    this.root.classList.add(className);
  }
  removeClass(...className){
    this.root.classList.remove(className);
  }
  innerText(text){
    Object.assign(this.root, {innerText: text});
  }
  getTransform(){
    return this.root.style.transform;
  }
}

class RouletteFactory extends ElementBundler {
  static root({width, height}){
    const root = new RouletteFactory('section');
    root.setStyle({width, height});
    root.addClass('roulette');
    return root;
  }
  static wheel(){
    const el = new RouletteFactory('div');
    el.addClass('wheel');
    return el;
  }
  static marker(){
    const el = new RouletteFactory('div');
    el.addClass('marker');
    return el;
  }
  static button(){
    const el = new RouletteFactory('button');
    el.innerText('Roulette START!');
    el.setStyle({
      position: 'fixed',
      left: '50%',
      bottom: '200px',
      transform: 'translateX(-50%)'
    })
    return el;
  }
}

class RouletteRender {
  root;
  wheel;
  marker;
  wheelImage;
  startButton;
  constructor({width, height}){
    this.root = RouletteFactory.root({width, height});
    this.wheel = RouletteFactory.wheel();
    this.marker = RouletteFactory.marker();
    this.startButton = RouletteFactory.button();

    this.wheel.appendTo(this.root);
    this.marker.appendTo(this.root);
    this.startButton.appendTo(document.body);

    this.wheelImage = new ElementBundler('img', {src: 'https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/test/board.png'});
    this.wheelImage.appendTo(this.wheel);
  }
}

class Roulette extends RouletteRender {
  deg;
  prizes;
  range;
  currentDeg;
  constructor({width, height, prizes}){
    super({width, height});
    this.deg = 0;
    this.prizes = prizes;
    this.range = 0;
    this.currentDeg = 0;
  }
  spin(){
    this.deg += 10;
    this.wheel.setStyle({
      transform: `rotate(${this.deg}deg)`
    });
    this.wheel.addClass('blur');
    const reqId = requestAnimationFrame(this.spin.bind(this));
    // if(this.deg > 2000) {
    //   cancelAnimationFrame(reqId);
    //   this.currentDeg = Number(this.wheel.getTransform().slice(7).split('deg)')[0]);
    //   console.log(this.currentDeg)
    // };
  }
}

let lock = false;
const container = document.getElementById('root');
const prizes = ['100', '200', '300', '400', '500', '600', '700', '800'];
const roulette = new Roulette({width: '400px', height: '400px', prizes});
const startButton = roulette.startButton.root;

roulette.root.appendTo(container);
startButton.addEventListener('click', () => {
  if(lock) return;
  lock = true;
  window.requestAnimationFrame(() => roulette.spin());
});
const prizesData = prizes.map((prize, i, array) => {
  const data = {}
  const deg = 360/array.length;
  data.prize = prize;
  data.start = deg * i;
  data.end = deg * (i + 1);
  return data;
});

