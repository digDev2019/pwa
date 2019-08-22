if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => navigator.serviceWorker.ready.then((worker) => {
        worker.sync.register('syncdata');
      }))
      .catch((err) => console.log(err));
};

const noSleep = new NoSleep();
document.getElementById('noSleep').addEventListener('click', ()=>{
    noSleep.enable();
});
document.getElementById('Sleep').addEventListener('click', ()=>{
    noSleep.disable();
});

const massCoord = [];
let repeat;

const getCoord = document.getElementById('getCoord');
getCoord.addEventListener('click', ()=>{
    repeat = setInterval(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            addPosition(lat, lng);
        })
    }, 2000)
});

document.getElementById('stopGetCoord').addEventListener('click', ()=>{
    clearInterval(repeat);
    console.log(massCoord);
});

function addPosition(lat, lng){
    let time = (new Date).toISOString();
    massCoord.push(
        {
            time: time,
            lat: lat,
            lng: lng
        }
    );

    const position = document.getElementById('position');

    const p = document.createElement('p');
    p.textContent = 'Время:' + time;
    position.insertBefore(p, position.firstChild);

    const pCoordsLat = document.createElement('p');
    pCoordsLat.textContent = ' Широта: ' + lat;
    position.insertBefore(pCoordsLat, position.firstChild);

    const pCoordsLng = document.createElement('p');
    pCoordsLng.textContent = 'Долгота: ' + lng;
    position.insertBefore(pCoordsLng, position.firstChild);

    const hr = document.createElement('hr');
    position.insertBefore(hr, position.firstChild);
};

//-----------------------
