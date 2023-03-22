// consts
import { getSettings } from './heat.consts';

export function getHeatTpl(settings, dataset, widget) {
  const settingsObj = getSettings(settings);
  //
  const { show, path, radius } = settingsObj;
  let max = 0;

  if (show) {
    // @ts-ignore
    const heat = new HeatmapOverlay({
      radius,
      minOpacity: 0.2,
      maxOpacity: 0.5,
      // scaleRadius: true,
      // useLocalExtrema: true,
      gradient: {
        '.1': 'green',
        '.5': 'yellow',
        '.9': 'red',
      },
      //
      latField: 'lat',
      lngField: 'lon',
      valueField: 'value',
    });

    const data = dataset.reduce((acc, item) => {
      const { lat, lon, ...values } = item;

      if (lat && lon) {
        const value = Number(values[path]) || 0;

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
  }
}
