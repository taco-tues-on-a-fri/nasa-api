const app = document.getElementById('root');
const logo = document.createElement('img');
logo.src = 'src/msl.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(logo);
app.appendChild(container);


const api_url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1100&camera=MAST&api_key=";
let request = new XMLHttpRequest();

request.open('GET', api_url + api_key, true);
request.onload = function () {
  console.log(this.response)
  let data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    Object.keys(data.photos).forEach(item => {
      let img_src_array = [];
      img_src_array.push(data.photos[item]);
      
      const get = (params, output) =>
      params.reduce((initial_val, current_val) => 
      (initial_val && initial_val[current_val]) ? initial_val[current_val] : null, output);
      
      let img_url = get([0, 'img_src'], img_src_array);
      
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      title_slice = img_url.substring(64, 72);
      h1.textContent = `Image# ${title_slice}`;

      const photo = document.createElement('img');
      photo.src = img_url;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(photo);
    });
  } else {
    console.log('error');
  }
  
}
request.send();



