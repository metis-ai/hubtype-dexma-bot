import moment from 'moment'

export default {
  dexmaAPIURL: 'https://protypo.enerapp.com',
  dexmaAPIBaseURL: 'https://protypo.enerapp.com/proxy',
  dexmaToken: 'b540c95843befb9832ad',
  resolutions: ['B', 'FM', 'TM', 'QH', 'HH', 'H', 'D', 'W', 'M'],
  parameterKeys: {
    EACTIVE: [
      'MAINSUPPLY',
      'HVAC',
      'LIGHTING',
      'REFRIGERATORS',
      'MACHINERY',
      'COMMONZONE',
      'TENANCE',
      'APPLIANCES',
      'DEVICE2G',
      'DEVICE3G',
      'DEVICE4G',
      'TRANSMISION',
      'CLASSROOM',
      'LABORATORY',
      'SANITARY_HOT_WATER_E'
    ],
    'GASENERGY, GASVOLUME, GASVOLN': [
      'GAS',
      'BOILER1',
      'BOILER2',
      'BOILER3',
      'BOILER4',
      'BURNER1',
      'BURNER2',
      'BURNER3',
      'BURNER4',
      'SANITARY_HOT_WATER_G'
    ],
    WATERVOL: ['WATER', 'LAUNDRY', 'SANITARYHOTWATER'],
    'FUELENERGY, FUELVOLUME': ['DIESEL'],
    PAENERGY: ['PHOTOVOLTAIC'],
    'THERMENERGY, TENERGYC': [
      'THERMAL',
      'COOLING',
      'COOLING2',
      'HEATING',
      'HEATING2'
    ],
    AIRVOLUME: ['COMPRESSEDAIRVOLUME'],
    TEMP: ['INDOORTEMP', 'OUTDOORTEMP'],
    SOLRAD: ['SOLAR_RADIATION'],
    HUMID: ['EXTERNAL_RELATIVE_HUMIDITY', 'INTERNAL_RELATIVE_HUMIDITY']
  },
  operations: {
    MAXDEMAND: 'AVG',
    SETPOINTTEMP: 'AVG',
    PULSE: 'DELTA',
    PIRENERGY: 'DELTA',
    VOLTAGE: 'AVG',
    CARBONEQ: 'DELTA',
    NETCHANNEL: 'AVG',
    HEATINDEX: 'AVG',
    FIRSTHOP: 'AVG',
    DTEMP: 'AVG',
    HOP: 'AVG',
    THERMPOWER: 'AVG',
    VOLTAGELL: 'AVG',
    SOILHUM: 'AVG',
    WATERFLOW: 'AVG',
    RSSI: 'AVG',
    PF: 'AVG',
    NITROOX: 'DELTA',
    NCURRENT: 'AVG',
    DD: 'DELTA',
    TEMP: 'AVG',
    THERMENERGY: 'DELTA',
    AVGCURRENT: 'AVG',
    GASENERGY: 'DELTA',
    OUTTEMP: 'AVG',
    METHANE: 'DELTA',
    IAENERGY: 'AVG',
    DEVICEID: 'AVG',
    PASEENERGY: 'DELTA',
    APENERGY: 'DELTA',
    COSPHY: 'AVG',
    LASTHOP: 'AVG',
    INTEMP: 'AVG',
    ABSOCP: 'DELTA',
    AIRCO2: 'AVG',
    SAMPLING: 'AVG',
    CURRENT: 'AVG',
    CDD: 'DELTA',
    EACTIVE: 'DELTA',
    TPOWERC: 'AVG',
    IRENERGY: 'DELTA',
    GROUPID: 'AVG',
    APPOWER: 'AVG',
    IO: 'AVG',
    RELAYTEMP: 'AVG',
    TEMP_FCST: 'AVG',
    IRPOWER: 'AVG',
    HUMID_FCST: 'AVG',
    MASSFLOW: 'AVG',
    HUMID: 'AVG',
    EACTIVEABS: 'DELTA',
    FREQ: 'AVG',
    FUELENERGY: 'DELTA',
    SOLRAD: 'AVG',
    CRPOWER: 'AVG',
    TEMPF: 'AVG',
    PROD: 'DELTA',
    AIRMASSFLOW: 'AVG',
    HOTWATERVOL: 'DELTA',
    PCRENERGY: 'DELTA',
    SOUND: 'AVG',
    CARBONDIOX: 'DELTA',
    HDD: 'DELTA',
    BAT: 'AVG',
    BASEENERGY: 'DELTA',
    AIRCO: 'AVG',
    FUELVOLUME: 'DELTA',
    POWER: 'AVG',
    GASVOLN: 'DELTA',
    CRENERGY: 'DELTA',
    LIGHT: 'AVG',
    GASVOLUME: 'DELTA',
    AIRVOLUME: 'DELTA',
    TENERGYC: 'DELTA',
    EACTIVE_FCST: 'DELTA',
    PAENERGY: 'DELTA',
    GENERICENERGY: 'DELTA',
    WATERVOL: 'DELTA'
  },
  periods: [
    {
      label: 'Today',
      resolution: 'H',
      start_date: moment()
        .startOf('day')
        .utc()
        .format()
        .slice(0, -1),
      end_date: moment()
        .utc()
        .format()
        .slice(0, -1)
    },
    {
      label: 'Yesterday',
      resolution: 'H',
      start_date: moment()
        .startOf('day')
        .subtract(1, 'days')
        .utc()
        .format()
        .slice(0, -1),
      end_date: moment()
        .startOf('day')
        .utc()
        .format()
        .slice(0, -1)
    },
    {
      label: 'Last 7 days',
      resolution: 'D',
      start_date: moment()
        .subtract(7, 'days')
        .utc()
        .format()
        .slice(0, -1),
      end_date: moment()
        .utc()
        .format()
        .slice(0, -1)
    },
    {
      label: 'Last 30 days',
      resolution: 'D',
      start_date: moment()
        .subtract(30, 'days')
        .utc()
        .format()
        .slice(0, -1),
      end_date: moment()
        .utc()
        .format()
        .slice(0, -1)
    },
    {
      label: 'Current month',
      resolution: 'D',
      start_date: moment()
        .startOf('month')
        .utc()
        .format()
        .slice(0, -1),
      end_date: moment()
        .utc()
        .format()
        .slice(0, -1)
    },
    {
      label: 'Last month',
      resolution: 'D',
      start_date: moment()
        .startOf('month')
        .subtract(1, 'months')
        .utc()
        .format()
        .slice(0, -1),
      end_date: moment()
        .startOf('month')
        .utc()
        .format()
        .slice(0, -1)
    },
    {
      label: 'Year to date',
      resolution: 'M',
      start_date: moment()
        .startOf('year')
        .utc()
        .format()
        .slice(0, -1),
      end_date: moment()
        .utc()
        .format()
        .slice(0, -1)
    },
    {
      label: 'Previous date',
      resolution: 'M',
      start_date: moment()
        .startOf('year')
        .utc()
        .format()
        .slice(0, -1),
      end_date: moment()
        .utc()
        .format()
        .slice(0, -1)
    }
  ],
  contract_options: [
    {
      label: 'All',
      color: 'secondary',
      filter_method: Object => Object
    },
    {
      label: 'Recent',
      color: 'primary',
      filter_method: Object => moment().isBefore(Object.to)
    },
    {
      label: 'Valid',
      color: 'success',
      filter_method: Object =>
        moment().isBefore(moment(Object.to).subtract(90, 'days'))
    },
    {
      label: 'Expire Soon',
      color: 'warning',
      filter_method: Object =>
        moment(Object.to).isBetween(moment(), moment().add(90, 'days'))
    },
    {
      label: 'Expired',
      color: 'danger',
      filter_method: Object => moment().isAfter(moment(Object.to))
    }
  ],
  contract_expiration: {
    date_format: 'YYYY-MM-DD',
    periods: {
      contract: {
        type: 'months',
        unit: 6
      },
      expire_soon: {
        type: 'days',
        unit: 90
      }
    },
    expirations: {
      expired: {
        copy: 'Expired. Your contract expired at {expiration_date}',
        color: '#f9857f'
      },
      expire_soon: {
        copy:
          'Will expire soon. This contract will expire next {expiration_date}',
        color: '#f9f07f'
      },
      valid: {
        copy: 'Valid. This contract is still valid.',
        color: '#b0f97f'
      }
    }
  },
  league_table_options: [
    {
      label: 'BEST',
      color: 'success'
    },
    {
      label: 'WORST',
      color: 'danger'
    }
  ],
  recommendations_options: [
    {
      label: 'Payback',
      color: 'secondary'
    },
    {
      label: 'Energy Savings',
      color: 'primary'
    }
  ],
  anomalies_options: [
    {
      label: 'Good',
      color: 'success'
    },
    {
      label: 'Bad',
      color: 'danger'
    }
  ]
}
