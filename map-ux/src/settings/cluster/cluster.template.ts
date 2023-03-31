// leaflet
import * as L from 'leaflet';
// consts
import { getSettings } from './cluster.consts';

export function getClusterTpl(settings, dataset, widget) {
  const settingsObj = getSettings(settings);
  //
  const { show, radius } = settingsObj;

  if (show) {
    const clusterInit = () => {
      if (L.markerClusterGroup) {
        const cluster = L.markerClusterGroup({
          maxClusterRadius: radius,
        });

        dataset.forEach((item) => {
          const { lat, lon } = item;
          if (lat && lon) {
            const marker = L.marker([lat, lon]);
            widget.markers.push(marker);
            cluster.addLayer(marker);
          }
        });

        cluster.addTo(widget._chart);

        return true;
      } else {
        return false;
      }
    };

    const interval = setInterval(() => {
      if (clusterInit()) clearInterval(interval);
    }, 300);
  } else {
    dataset.forEach((item) => {
      const { lat, lon } = item;
      if (lat && lon) {
        const marker = L.marker([lat, lon]);
        widget.markers.push(marker);
        marker.addTo(widget._chart);
      }
    });
  }
}
