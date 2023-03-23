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

  widget.markers.forEach((marker) => {
    const {
      _latlng: { lat, lng },
    } = marker;
    const findIndex = dataset.findIndex(
      (item) => item.lat === lat && item.lon === lng,
    );
    const findItem = dataset[findIndex];
    const values = (findItem && findItem.values) || [];
    const name = (findItem && findItem.x) || '';

    if (findItem) {
      marker.on(triggerOn, function (e) {
        if (show && values.length) {
          const content = values
            .map(({ name, value }) => {
              return `<div class="tooltip-line">${name}: <strong>${value}</strong></div>`;
            })
            .join('');

          L.popup({
            maxWidth: 560,
          })
            .setLatLng(e.latlng)
            .setContent(content)
            .openOn(widget._chart);
        }
      });

      if (name) {
        marker.on('click', function (e) {
          const params = {
            dataIndex: findIndex,
            seriesIndex: 0,
            name: name,
          };

          widget.onClick(params);
        });
      }
    }
  });
}
