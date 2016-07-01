exports.items = [
  {
    type: 'Smartphone',
    brand: 'Apple',
    name: 'iPhone 5s',
    date: new Date().getTime(),
    lat: 48.1603975,
    lon: 11.6558806,
    status: 'open',
  },
  {
    type: 'Smartphone',
    brand: 'Apple',
    name: 'iPhone 5s',
    date: new Date().getTime(),
    lat: 48.26245,
    lon: 11.66917,
    status: 'open',
  },
    {
    type: 'Smartphone',
    brand: 'Apple',
    name: 'iPhone 5s',
    date: new Date().getTime()-8,64e+7,
    lat: 48.26243,
    lon: 11.66831,
    status: 'open',
  },
    {
    type: 'Smartphone',
    brand: 'Apple',
    name: 'Iphone 6',
    date: new Date().getTime()-8,64e+7,
    lat: 48.26253,
    lon: 11.66693,
    status: 'open',
  },
    {
    type: 'Smartphone',
    brand: 'Apple',
    name: 'Iphone 6',
    date: new Date().getTime()-8,64e+7,
    lat: 48.26290,
    lon: 11.66775,
    status: 'open',
  },
    {
    type: 'Smartphone',
    brand: 'Samsung',
    name: 'Galaxsy',
    date: new Date().getTime()-8,64e+7,
    lat: 48.1603975,
    lon: 11.6558806,
    status: 'open',
  },
    {
    type: 'Smartphone',
    brand: 'Samsung',
    name: 'Galaxsy',
    date: new Date().getTime()-8,64e+7,
    lat: 48.26338,
    lon: 11.66920,
    status: 'open',
  },
    {
    type: 'Laptop',
    brand: 'Other',
    name: 'Other',
    date: new Date().getTime(),
    lat: 48.26342,
    lon: 11.66942,
    status: 'open',
  },
    {
    type: 'Laptop',
    brand: 'Microsoft',
    name: 'Surface Pro',
    date: new Date().getTime(),
    lat: 48.26394,
    lon: 11.66945,
    status: 'resolved',
  },
    {
    type: 'Laptop',
    brand: 'Dell',
    name: 'Latitude E5 Series',
    date: new Date().getTime(),
    lat: 48.26471,
    lon: 11.66995,
    status: 'open',
  },
    {
    type: 'Tablet',
    brand: 'Dell',
    name: 'XPS Series',
    date: new Date().getTime(),
    lat: 48.26378,
    lon: 11.67103,
    status: 'open',
  },
];

exports.users = [
  {
    username: 'Soenke',
    email: 'soenke.erfkamp@tum.de',
    password: 'muchpwverysecure',
  },
  {
    username: 'guest',
    email: 'soenke.erfkamp@tum.de',
    password: 'guest',
  },
  {
    username: 'admin',
    email: 'soenke.erfkamp@tum.de',
    password: 'admin',
  },
  {
    username: 's',
    email: 'soenke.erfkamp@tum.de',
    password: 's',
  },
];


exports.itemInfo =  [
     {
          type: 'Smartphone',
         brands: [{ brand:  'Apple', models: ['iPhone 6 Series','iPhone 5 Series','Other']},{ brand:  'Samsung', models: ['Galaxy S Series','Galaxy J Series','Other']}, { brand:  'Other', models: ['Other']}]
     },
     {
           type: 'Tablet',
           brands: [{ brand:  'Dell', models: ['Venue Series','Latidude Series', 'Insprion Series', 'XPS Series','Other']},{ brand:  'Microsoft', models: ['Surface Pro','Surface Pro 2', 'Surface Pro 3', 'Surface Pro 4','Other']}, { brand:  'Otehr', models: ['Other']}]
     },
          {
           type: 'Laptop',
           brands: [{ brand:  'Dell', models: ['Latitude E5 Series','Latitude E5 Series','Latitude E5 Series','Other']},{ brand:  'Lenovo', models: ['Thinpad Series','ideapad Series','Other']}, { brand:  'Otehr', models: ['Other']}]
     },
 ];
