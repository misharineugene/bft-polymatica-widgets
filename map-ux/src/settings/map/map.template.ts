// leaflet
import * as L from 'leaflet';
// consts
import { getSettings } from './map.consts';

export function getMapTpl(settings, _, widget) {
  const settingsObj = getSettings(settings);
  //
  const {
    center,
    zoom,
    //
    mask,
    maskOpacity,
  } = settingsObj;

  const centerArr = center.split('::').map((item) => Number(item) || 0);
  const options = [centerArr, parseInt(zoom) || 4, { animation: true }];

  if (mask) {
    const maskInit = () => {
      if (L.mask) {
        L.mask('leaflet/geojson/russia.geojson', {
          fillOpacity: Number(maskOpacity) || 1,
          fitBounds: false,
          restrictBounds: false,
        }).addTo(widget._chart);
        return true;
      } else {
        return false;
      }
    };

    const interval = setInterval(() => {
      if (maskInit()) clearInterval(interval);
    }, 300);
  }

  if (mask) widget._chart.options.minZoom = 3;

  widget._chart.setView(...options);

  const server = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  L.tileLayer(server, {}).addTo(widget._chart);

  widget._chart.on('click', (e) => {
    console.log('e >>', e);
  });
}
