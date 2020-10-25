let myMap;

const init = () => {
  myMap = new ymaps.Map('map', {
    center: [55.748836, 37.599119],
    zoom: 13,
    controls: ['zoomControl']
  });

  myMap.behaviors.disable(['rightMouseButtonMagnifier', 'scrollZoom']);

  const coords = [
    [55.751999, 37.576133],
    [55.760435, 37.622435],
    [55.748836, 37.599119],
    [55.734093, 37.577385]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
   iconLayout: 'default#image',
   iconImageHref: './img/icons/marker.svg',
   iconImageSize: [46, 57],
   iconImageOffset: [-35, -52]
  })

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);
};

ymaps.ready(init);