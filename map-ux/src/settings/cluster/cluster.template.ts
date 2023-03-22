// leaflet
import * as L from 'leaflet';
// consts
import { getSettings } from './cluster.consts';

export function getClusterTpl(settings, dataset, widget) {
  const settingsObj = getSettings(settings);
  //
  const { show, radius } = settingsObj;

  const cluster = L.markerClusterGroup({
    maxClusterRadius: radius,
  });

  dataset.forEach((item) => {
    const { lat, lon } = item;
    if (lat && lon) {
      const marker = L.marker([lat, lon]);
      widget.markers.push(marker);
      if (show) {
        cluster.addLayer(marker);
      } else {
        marker.addTo(widget._chart);
      }
    }
  });

  if (show) cluster.addTo(widget._chart);
}
