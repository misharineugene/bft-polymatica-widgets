// leaflet
import * as L from 'leaflet';
// consts
import { getSettings } from './tooltip.consts';

export function getTooltipTpl(settings, dataset, widget) {
  const settingsObj = getSettings(settings);
  //
  const {
    show,
    //
    triggerOn,
  } = settingsObj;

  if (show) {
    widget.markers.forEach((marker) => {
      const {
        _latlng: { lat, lng },
      } = marker;
      const findItem = dataset.find(
        (item) => item.lat === lat && item.lon === lng,
      );
      const name = (findItem && findItem.val_0) || '';

      if (findItem && name) {
        marker.on(triggerOn, function (e) {
          L.popup()
            .setLatLng(e.latlng)
            .setContent(`<strong>${name}</strong>`)
            .openOn(widget._chart);
        });
      }
    });
  }
}
