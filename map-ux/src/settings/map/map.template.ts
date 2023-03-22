// leaflet
import * as L from 'leaflet';
// consts
import { getSettings } from './map.consts';

export function getMapTpl(settings, _, widgter) {
  const settingsObj = getSettings(settings);
  //
  const {
    center,
    zoom,
    //
    mask,
    maskOpacity,
  } = settingsObj;

  const centerArr = center.split(',').map((item) => Number(item) || 0);
  const options = [centerArr, parseInt(zoom) || 4, { animation: true }];

  if (mask) {
    L.mask('leaflet/geojson/russia.geojson', {
      fillOpacity: Number(maskOpacity) || 1,
    }).addTo(widgter._chart);
    widgter._chart.options.minZoom = 3;
    setTimeout(() => {
      widgter._chart.setView(...options);
    }, 1000);
  }

  widgter._chart.setView(...options);
}
