import { SensorRowLayout } from '~layouts';
import { Chart } from '~presentation';
import { MediumText } from '~presentation/typography';

import { SensorStatus } from './SensorStatus';

export const SensorChartRow = ({
  sensor = { name: ':)', temperature: 3.4 },
  logs,
  direction = 'right',
}) => {
  return (
    <SensorRowLayout
      Chart={<Chart data={logs} />}
      SensorName={<MediumText>{sensor.name}</MediumText>}
      SensorStatus={<SensorStatus temperature={sensor.temperature} />}
      direction={direction}
    />
  );
};
