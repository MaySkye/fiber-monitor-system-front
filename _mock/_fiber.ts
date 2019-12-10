import { MockRequest } from '@delon/mock';

const DATA = [
  {
    id: '1',
    name: '西安',
    longitude: '108.94704', // 经度
    Latitude: '34.347507', // 纬度
    level: '1',
    count: '568',
  },
  {
    id: '2',
    name: '北京',
    longitude: '116.416342', // 经度
    Latitude: '39.907645', // 纬度
    level: '1',
    count: '468',
  },
  {
    id: '3',
    name: '合肥',
    longitude: '117.235166', // 经度
    Latitude: '31.827805', // 纬度
    level: '1',
    count: '368',
  },
  {
    id: '4',
    name: '武汉',
    longitude: '114.31561', // 经度
    Latitude: '30.596726', // 纬度
    level: '2',
    count: '348',
  },
  {
    id: '5',
    name: '上海',
    longitude: '121.477665', // 经度
    Latitude: '31.235682', // 纬度
    level: '2',
    count: '328',
  },
  {
    id: '6',
    name: '长春',
    longitude: '125.330606', // 经度
    Latitude: '43.822579', // 纬度
    level: '2',
    count: '308',
  },
  {
    id: '7',
    name: '三亚',
    longitude: '109.518847', // 经度
    Latitude: '18.25956', // 纬度
    level: '2',
    count: '288',
  },
  {
    id: '8',
    name: '喀什',
    longitude: '76.000994', // 经度
    Latitude: '39.47788', // 纬度
    level: '2',
    count: '268',
  },
  {
    id: '9',
    name: '沈阳',
    longitude: '123.437589', // 经度
    Latitude: '41.815608', // 纬度
    level: '3',
    count: '248',
  },
  {
    id: '10',
    name: '乌鲁木齐',
    longitude: '87.629037', // 经度
    Latitude: '43.835757', // 纬度
    level: '3',
    count: '128',
  },
  {
    id: '11',
    name: '酒泉',
    longitude: '98.500681', // 经度
    Latitude: '39.743794', // 纬度
    level: '3',
    count: '248',
  },
  {
    id: '12',
    name: '昆明',
    longitude: '102.838653', // 经度
    Latitude: '24.892879', // 纬度
    level: '3',
    count: '148',
  },
  {
    id: '13',
    name: '南宁',
    longitude: '108.378053', // 经度
    Latitude: '22.820475', // 纬度
    level: '3',
    count: '208',
  },
  {
    id: '14',
    name: '厦门',
    longitude: '118.096435', // 经度
    Latitude: '24.487513', // 纬度
    level: '3',
    count: '198',
  },
  {
    id: '15',
    name: '温州',
    longitude: '120.711078', // 经度
    Latitude: '28.011292', // 纬度
    level: '3',
    count: '188',
  },
  {
    id: '16',
    name: '郑州',
    longitude: '113.636015', // 经度
    Latitude: '34.759134', // 纬度
    level: '3',
    count: '188',
  },
  {
    id: '17',
    name: '济南',
    longitude: '117.126399', // 经度
    Latitude: '36.650995', // 纬度
    level: '3',
    count: '248',
  },
  {
    id: '18',
    name: '哈密',
    longitude: '93.521212', // 经度
    Latitude: '42.837674', // 纬度
    level: '3',
    count: '98',
  },
  {
    id: '19',
    name: '哈尔滨',
    longitude: '126.541611', // 经度
    Latitude: '45.807215', // 纬度
    level: '3',
    count: '228',
  },
  {
    id: '20',
    name: '兰州',
    longitude: '103.845123', // 经度
    Latitude: '36.069102', // 纬度
    level: '3',
    count: '208',
  },
  {
    id: '21',
    name: '重庆',
    longitude: '106.553838', // 经度
    Latitude: '29.579048', // 纬度
    level: '3',
    count: '248',
  },
  {
    id: '22',
    name: '太原',
    longitude: '112.551797', // 经度
    Latitude: '37.878813', // 纬度
    level: '3',
    count: '148',
  },
  {
    id: '23',
    name: '成都',
    longitude: '104.076931', // 经度
    Latitude: '30.57825', // 纬度
    level: '3',
    count: '228',
  },
  {
    id: '24',
    name: '湛江',
    longitude: '110.360955', // 经度
    Latitude: '21.283191', // 纬度
    level: '3',
    count: '158',
  },
  {
    id: '25',
    name: '南京',
    longitude: '118.793223', // 经度
    Latitude: '32.062694', // 纬度
    level: '3',
    count: '248',
  },
  {
    id: '26',
    name: '宝鸡',
    longitude: '107.239973', // 经度
    Latitude: '34.37845', // 纬度
    level: '3',
    count: '148',
  },
  {
    id: '27',
    name: '广州',
    longitude: '113.276028', // 经度
    Latitude: '23.137463', // 纬度
    level: '3',
    count: '248',
  },
];
// 主页数据
const listOfData = [
  {
    key: '1',
    name: '北京--武汉',
    fValue: '5.0946E-15',
    status: '1',
  },
  {
    key: '2',
    name: '北京--上海',
    fValue: '6.2169E-15',
    status: '1',

  },
  {
    key: '3',
    name: '上海--合肥',
    fValue: '3.3832E-15',
    status: '2',
  },
  {
    key: '4',
    name: '北京--武汉',
    fValue: '8.5986E-15',
    status: '1',
  },
];

function genData(params: any) {
  let ret = [...DATA];
  // tslint:disable-next-line:one-variable-per-declaration
  const pi = +params.pi,
    ps = +params.ps,
    start = (pi - 1) * ps;

  if (params.name) {
    ret = ret.filter(data => data.name.indexOf(params.name) > -1);
  }

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}

export const SITE = {
  //王伟定义的获取等级站点
  '/fiber/site': (req: MockRequest) => {
    if (req.queryString.level == "all")
      return DATA;
    else
      return DATA.filter(d => d.level == req.queryString.level);
  },
  '/fiber/main/lines': listOfData,
};
