const app = document.getElementById('root');
const logo = document.createElement('img');
logo.src = 'msl.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(logo);
app.appendChild(container);


const api_url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1100&camera=MAST&api_key=";
let request = new XMLHttpRequest();
console.log(api_url + api_key)
request.open('GET', api_url + api_key, true);
request.onload = function () {
  console.log(this.response)
  let data = JSON.parse(this.response);


  if (request.status >= 200 && request.status < 400) {
    Object.keys(data.photos).forEach(item => {
        let img_src_array = [];
        img_src_array.push(data.photos[item]);
        
        const get = (p, o) =>
        p.reduce((xs, x) => 
        (xs && xs[x]) ? xs[x] : null, o)
        
        let imgUrl = get([0, 'img_src'], img_src_array);
        
        
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
  
        const h1 = document.createElement('h1');
        titleSlice = imgUrl.substring(56);
        h1.textContent = `./${titleSlice}`;

        const photo = document.createElement('img');
        photo.src = imgUrl;
  
        container.appendChild(card);
  
        card.appendChild(h1);
        card.appendChild(photo);
      });
      /*
      imgList.forEach(photo => {
      })
      */

  } else {
    console.log('error');
  }
  
  
}
request.send();



