import { readFileSync, writeFileSync } from 'node:fs';
import ofx from 'ofx';
import util from 'util';

const tags = {
  food: 'Food',
  grocery: 'Grocery',
  costco: 'Costco',
  wine: 'Wine',
  restaurants: 'Restaurants',
  fastFood: 'Fast Food',
  coffeeShops: 'Coffee Shops',
  convenience: 'Convenience Store',
  fuel: 'Auto Fuel',
  auto: 'Auto Expenses',
  communication: 'Communication Expenses',
  cottage: 'Cottage',
  hardware: 'Hardware Store',
  depot: 'Home Depot',
  charity: 'Charitable Donation',
  onlineServices: 'Online Services',
  costco: 'Costco',
  amazon: 'Amazon',
  apple: 'Apple',
  education: 'Education',
  cody: 'Cody',
  financial: 'Financial Services',
  outdoor: 'Outdoor Gear',
  pool: 'Pool',
  kidsActivities: 'Kids Activities',
  kidsClothing: 'Kids Clothing',
  clothing: 'Clothing and Accessories',
  shoes: 'Shoes',
  travel: 'Travel Expenses',
  hotel: 'Hotel Expenses',
  drugStore: 'Drug Store Expenses',
  profit: 'Profit Generating Expenses',
  furniture: 'Furniture',
  ikea: 'Ikea',
  house: 'House Expenses',
  dental: 'Dental Expenses',
  medical: 'Medical Expenses'
}

const profile = [
   // Household
   { name: 'THE HOME DEPOT #', tags: [tags.hardware, tags.depot, tags.house]},
   { name: 'PUREWATER HOME OASIS', tags: [tags.pool, tags.house]},
   { name: 'IKEA', tags: [tags.funriture, tags.ikea, tags.house]},
   { name: 'WWW.IKEA.CA', tags: [tags.funriture, tags.ikea, tags.house]},
   { name: 'CANADIAN APPLIANCE SOU', tags: [tags.house]},

   // Activities
   { name: 'CABELA\'S CANADA', tags: [tags.outdoor]},
   { name: 'VR ADVENTURES.ZONE', tags: [tags.kidsActivities]},
   { name: 'CANADA\'S WONDERLAND', tags: [tags.kidsActivities]},
   { name: 'FUNHAVEN', tags: [tags.kidsActivities]},
   { name: 'STUFFY RIDERS', tags: [tags.kidsActivities]},

   // Clothing
   { name: 'BROWNS SHOES', tags: [tags.kidsClothing, tags.clothing]},
   { name: 'NORDSTROM ', tags: [tags.clothing]},
   { name: 'SUZY SHIER', tags: [tags.clothing]},
   { name: 'SHOE COMPANY #', tags: [tags.clothing, tags.shoes]},
   { name: 'H&M CA', tags: [tags.clothing]},
   { name: 'BENTLEY #', tags: [tags.clothing]},
   { name: 'URBAN PLANET #', tags: [tags.clothing, tags.KidsClothing]},
   { name: 'LITTLE BURGUNDY', tags: [tags.clothing, tags.KidsClothing, tags.shoes]},


   // Financial Services
   { name: 'FROUIN GROUP-CHARTERED', tags: [tags.financial]},

   // Auto Expenses
   { name: 'PARK INDIGO - OTT RESE', tags: [tags.auto] },

   // Travel Expenses
   { name: 'ALOFT VAUGHAN MILLS', tags: [tags.travel, tags.hotel] },
   { name: 'FAIRMONT CHATEAU LAURI', tags: [tags.travel, tags.hotel] },

   // Dental Expenses
   { name: 'COLISEUM DENTAL', tags: [tags.medical, tags.dental] },

   // Drug Stores
   { name: 'SHOPPERS DRUG MART', tags: [tags.drugStore] },

   // Profit Expenses
   { name: 'TRADINGVIEW1PRODUCT', tags: [tags.profit] },
   { name: 'AIRDNA MARKET DATA DENVER CO', tags: [tags.profit] },

   // Gas Stations
   { name: 'ESSO', tags: [tags.fuel, tags.auto] },
   { name: 'SHELL', tags: [tags.fuel, tags.auto] },
   { name: 'EAGLES NEST GAS BAR', tags: [tags.fuel, tags.auto] },
   { name: 'CDN TIRE GASBAR ', tags: [tags.fuel, tags.auto] },
   { name: 'RALPH & SONS ', tags: [tags.fuel, tags.auto] },
   { name: 'PETROCAN ', tags: [tags.fuel, tags.auto] },
   { name: 'FINN\'S GAS BAR ', tags: [tags.fuel, tags.auto] },

   // Restaurants
   { name: 'REDNECK BISTRO', tags: [tags.food, tags.restaurants] },
   { name: 'HOCKEY SUSHI KANATA', tags: [tags.food, tags.restaurants]},
   { name: 'JADE YI\'S KITCHEN', tags: [tags.food, tags.restaurants]},
   { name: 'KANATA NOODLE HOUSE ', tags: [tags.food, tags.restaurants]},
   { name: 'JACK ASTOR\'S ', tags: [tags.food, tags.restaurants]},
   { name: 'THE KEG STEAKHOUSE ', tags: [tags.food, tags.restaurants]},
   { name: 'SHAWARMA HOUSE ', tags: [tags.food, tags.restaurants]},


   // Fast Food Restaurants
   { name: 'PIZZA PIZZA # ', tags: [tags.food, tags.restaurants, tags.fastFood] },
   { name: 'MCDONALD\'S #', tags: [tags.food, tags.restaurants, tags.fastFood] },
   { name: 'Subway ', tags: [tags.food, tags.restaurants, tags.fastFood] },
   { name: 'DAIRY QUEEN ', tags: [tags.food, tags.restaurants, tags.fastFood] },
   { name: 'KOKOMISH CAFE ', tags: [tags.food, tags.restaurants, tags.fastFood] },
   { name: 'KFC/TACO BELL ', tags: [tags.food, tags.restaurants, tags.fastFood] },
   { name: 'STARBUCKS ', tags: [tags.food, tags.restaurants, tags.fastFood, tags.coffeeShops] },
   { name: 'TIM HORTONS ', tags: [tags.food, tags.restaurants, tags.fastFood, tags.coffeeShops]},
   { name: 'SECOND CUP ', tags: [tags.food, tags.restaurants, tags.fastFood, tags.coffeeShops]},

   // Grocery Stores
   { name: 'LOBLAWS', tags: [tags.food, tags.grocery] },
   { name: 'METRO', tags: [tags.food, tags.grocery] },
   { name: 'FARM BOY', tags: [tags.food, tags.grocery] },
   { name: 'COSTCO WHOLESALE', tags: [tags.food, tags.grocery, tags.costco] },
   { name: 'CHARBONNEAU GROCERY', tags: [tags.food, tags.grocery]},
   { name: 'WAL-MART #', tags: [tags.food, tags.grocery]},
   { name: 'THE BUTCHERY', tags: [tags.food, tags.grocery]},
   { name: 'FOODLAND', tags: [tags.food, tags.grocery]},

   // Cody
   { name: 'REN\'S PETS', tags: [tags.cody]},
   { name: 'CARLING ANIMAL HOSPITA', tags: [tags.cody]},

   // LCBO
   { name: 'LCBO/RAO #', tags: [tags.food,tags.wine] },

   // Convenience and General Stores
   { name: 'THE BOGIE GENERAL STOR', tags: [tags.cottage, tags.hardware, tags.convenience]},
   { name: 'ZIPP-THRU CONVENIENCE', tags: [tags.fuel, tags.convenience]},

   // Online Services
   { name: 'NETFLIX.COM', tags: [tags.onlineServices] },
   { name: 'EXPRESSVPN.COM', tags: [tags.onlineServices] },
   { name: 'Amazon Web Services', tags: [tags.onlineServices] },
   { name: 'Disney Plus', tags: [tags.onlineServices] },
   { name: 'Audible CA', tags: [tags.onlineServices] },

   // Communications
   { name: 'KOODO MOBILE PAC', tags: [tags.communication] },
   { name: 'ROGERS ', tags: [tags.communication] },

   // Amazon
   { name: 'AMZN Mktp', tags: [tags.amazon] },
   { name: 'Amazon.ca', tags: [tags.amazon] },

   // Apple
   { name: 'APPLE.COM/BILL', tags: [tags.apple] },

   // Online Education
   { name: 'DAPP UNIVERSITY NASHVILLE TN', tags: [tags.education, tags.profit] },
   { name: 'LEARN PLAN PROF NEW YORK NY', tags: [tags.education, tags.profit] },

   // Charitable Donations
   { name: 'SQ *STTR FUNDRAISER', tags: [tags.charity] },

 ];

// Process mastercard transactions
let accounts;
const db = './db.json';

try {
  const accountsJson = readFileSync(db, 'utf8');
  accounts = JSON.parse(accountsJson);
} catch(error) {
  console.error(`Error reading ${db}`);
}

const ofxFile = process.argv[2];
let ofxData;

try {
  ofxData = readFileSync(ofxFile, 'utf8')
} catch(error) {
  console.error(`Error reading ${ofxFile}`);
}

const data = ofx.parse(ofxData);
const accountId = data.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.CCACCTFROM.ACCTID;
const transactions = data.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.STMTTRN

if(!accounts[accountId]) {
  accounts[accountId] = {};
  accounts[accountId].type ??= 'Credit Card';
  accounts[accountId].company = 'Mastercard';
  accounts[accountId].bank = 'RBC';
  accounts[accountId].partner = 'Westjet';
  accounts[accountId].transactions = {};
  //console.log(util.inspect(accounts,{depth:20}));
}

transactions.map( item => {

  // Fix the date
  const str = item.DTPOSTED;
  const y = str.substr(0,4), m = str.substr(4,2), d = str.substr(6,2);
  item.datePosted = new Date(y,parseInt(m,10)-1,d);
  delete item.DTPOSTED;

  // Rename the remaining keys
  item.id = item.FITID;
  item.type = item.TRNTYPE;
  item.name = item.NAME;
  item.amount = item.TRNAMT;
  item.memo = item.MEMO;
  const entry = profile.find( profileItem => item.name.match(profileItem.name) );
  item.tags = entry ? entry.tags : 'None'
  delete item.FITID;
  delete item.TRNTYPE;
  delete item.NAME;
  delete item.TRNAMT;
  delete item.MEMO;

  accounts[accountId].transactions[item.id] = item;
});

console.log(util.inspect(accounts,{depth:20}));
writeFileSync(db,JSON.stringify(accounts,null,2));
