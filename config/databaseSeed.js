exports.items = [
  {
    type: 'Smartphone',
    brand: 'Apple',
    name: 'iPhone 5s',
    date: new Date().getTime(),
    email: 'soenke.erfkamp@tum.de',
    lat: 48.1603975,
    lon: 11.6558806,
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
 	   brands: [{ brand:  'Apple', models: ['Iphone 6','iphone 5']},{ brand:  'Samsung', models: ['Galaxsy','galx']}]
	},
	{
   	   type: 'Jacket',
   	   brands: [{ brand:  'Adidas', models: ['Sportjacke','Blazer']},{ brand:  'Puma', models: ['Regenjacke','mantel']}]
	},
];
