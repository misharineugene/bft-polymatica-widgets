// consts
import { getSettings } from './heat.consts';

export function getHeatTpl(settings, dataset, widget) {
  const settingsObj = getSettings(settings);
  //
  const {
    show,
    valueH,
    radius,
    //
    colorMin,
    colorAvg,
    colorMax,
  } = settingsObj;
  let max = 0;

  if (show) {
    const heatInit = () => {
      // @ts-ignore
      if (HeatmapOverlay) {
        // @ts-ignore
        const heat = new HeatmapOverlay({
          radius,
          minOpacity: 0.2,
          maxOpacity: 0.5,
          // scaleRadius: true,
          // useLocalExtrema: true,
          gradient: {
            '.1': colorMin,
            '.5': colorAvg,
            '.9': colorMax,
          },
          //
          latField: 'lat',
          lngField: 'lon',
          valueField: 'value',
        });

        const indexH = Number(valueH.split('_').pop()) || 0;

        const data = dataset.reduce((acc, item) => {
          const { lat, lon, values } = item;

          if (lat && lon) {
            const value = values.length ? Number(values[indexH].value) : 0;

            max = value > max ? value : max;

            acc.push({ lat, lon, value });
          }

          return acc;
        }, []);

        heat.setData({
          max,
          data,
        });

        heat.addTo(widget._chart);

        return true;
      } else {
        return false;
      }
    };

    const interval = setInterval(() => {
      if (heatInit()) clearInterval(interval);
    }, 300);
  }
}
