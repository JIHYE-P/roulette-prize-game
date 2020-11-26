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
