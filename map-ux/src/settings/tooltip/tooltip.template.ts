// leaflet
import * as L from 'leaflet';
// enum
import { EBlockKey } from '../../enum';
// consts
import { getSettings, replaceTpls, replaceTplsStr } from './tooltip.consts';

export function getTooltipTpl(settings, dataset, widget) {
  const settingsObj = getSettings(settings);
  //
  const {
    show,
    //
    triggerOn,
    //
    content,
  } = settingsObj;

  const valuesLength =
    widget.dataSettings.columnsByBlock[EBlockKey.Values].length;

  const loopStart = '{loop}';
  const loopEnd = '{/loop}';

  const isLoop = content.includes(loopStart);
  let readyContent = '';
  const beforeLoop = content.split(loopStart).shift();
  let contentArr = [content];
  const afterLoop = content.split(loopEnd).pop();

  if (isLoop) {
    let loopContent = content.match(/\{loop\}.+\{\/loop\}/gi)[0] || '';

    loopContent = loopContent.replace(loopStart, '');
    loopContent = loopContent.replace(loopEnd, '');

    contentArr = new Array(valuesLength).fill(loopContent);
  }

  if (valuesLength) {
    const markersInit = () => {
      if (widget.markers.length) {
        widget.markers.forEach((marker) => {
          const {
            _latlng: { lat, lng },
          } = marker;
          const findIndex = dataset.findIndex(
            (item) => item.lat === lat && item.lon === lng,
          );
          const findItem = dataset[findIndex];
          const values = findItem ? findItem.values : [];
          const nameX = findItem ? findItem.x : '';

          if (findItem) {
            marker.on(triggerOn, function (e) {
              if (show && valuesLength) {
                readyContent = '';
                if (isLoop) {
                  const loopArr = [];
                  values.forEach((item, index) => {
                    loopArr[index] = replaceTpls(item, index, contentArr);
                  });

                  readyContent += beforeLoop;
                  readyContent +=
                    '<div class="tooltip-loop">' + loopArr.join('') + '</div>';
                  readyContent += afterLoop;
                } else {
                  readyContent = replaceTpls(values[0], 0, contentArr);
                }

                readyContent = replaceTplsStr(readyContent, values);

                L.popup({
                  maxWidth: 560,
                })
                  .setLatLng(e.latlng)
                  .setContent(readyContent)
                  .openOn(widget._chart);
              }
            });

            if (nameX) {
              marker.on('click', function (e) {
                const params = {
                  dataIndex: findIndex,
                  seriesIndex: 0,
                  name: nameX,
                };

                widget.onClick(params);
              });
            }
          }
        });

        return true;
      } else {
        return false;
      }
    };

    const interval = setInterval(() => {
      if (markersInit()) clearInterval(interval);
    }, 300);
  }
}
