import { readFileSync, writeFileSync } from 'node:fs';
import ofx from 'ofx';
import util from 'util';
import * as dotenv from 'dotenv'
dotenv.config();

const dbFile = './db.json';

const tags = {
  food: 'Food',
  personalCare: 'Personal Care Expenses',
  pizza: 'Pizza',
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
  mobile: 'Mobile Phone Expenses',
  cottage: 'Cottage',
  hardware: 'Hardware Store',
  depot: 'Home Depot',
  lowes: 'Lowes',
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
  medical: 'Medical Expenses',
  pet: 'Pet Expenses',
  ct: 'Candian Tire'
}

const bankProfile = [

];

const ccProfile = [
   // Household
   { name: 'THE HOME DEPOT #', tags: [tags.hardware, tags.depot, tags.house]},
   { name: 'LOWES #', tags: [tags.hardware, tags.lowes, tags.house]},
   { name: 'PUREWATER HOME OASIS', tags: [tags.pool, tags.house]},
   { name: 'IKEA', tags: [tags.funriture, tags.ikea, tags.house]},
   { name: 'WWW.IKEA.CA', tags: [tags.funriture, tags.ikea, tags.house]},
   { name: 'CANADIAN APPLIANCE SOU', tags: [tags.house]},
   { name: 'BURNSTOWN BUILDING SUP', tags: [tags.house, tags.cottage]},
   { name: 'RENFREW HM HWR BLDG CT', tags: [tags.house, tags.cottage]},
   { name: 'CDN TIRE STORE', tags: [tags.ct, tags.house]},

   // Activities
   { name: 'CABELA\'S CANADA', tags: [tags.outdoor]},
   { name: 'VR ADVENTURES.ZONE', tags: [tags.kidsActivities]},
   { name: 'CANADA\'S WONDERLAND', tags: [tags.kidsActivities]},
   { name: 'FUNHAVEN', tags: [tags.kidsActivities]},
   { name: 'STUFFY RIDERS', tags: [tags.kidsActivities]},
   { name: 'LS CANADIAN MUSEUM OF', tags: [tags.kidsActivities]},
   { name: 'Canadian Museum of Nat', tags: [tags.kidsActivities]},

   // Clothing
   { name: 'BROWNS SHOES', tags: [tags.kidsClothing, tags.clothing]},
   { name: 'NORDSTROM ', tags: [tags.clothing]},
   { name: 'SUZY SHIER', tags: [tags.clothing]},
   { name: 'SHOE COMPANY #', tags: [tags.clothing, tags.shoes]},
   { name: 'H&M CA', tags: [tags.clothing]},
   { name: 'BENTLEY ', tags: [tags.clothing]},
   { name: 'URBAN PLANET #', tags: [tags.clothing, tags.KidsClothing]},
   { name: 'LITTLE BURGUNDY', tags: [tags.clothing, tags.KidsClothing, tags.shoes]},
   { name: 'SHEIN.COM', tags: [tags.clothing]},


   // Financial Services
   { name: 'FROUIN GROUP-CHARTERED', tags: [tags.financial]},

   // Auto Expenses
   { name: 'PARK INDIGO - OTT RESE', tags: [tags.auto] },

   // Travel Expenses
   { name: 'ALOFT VAUGHAN MILLS', tags: [tags.travel, tags.hotel] },
   { name: 'FAIRMONT CHATEAU LAURI', tags: [tags.travel, tags.hotel] },
   { name: 'ROYAL YORK HOTEL', tags: [tags.travel, tags.hotel] },

   // Dental Expenses
   { name: 'COLISEUM DENTAL', tags: [tags.medical, tags.dental] },

   // Drug Stores
   { name: 'SHOPPERS DRUG MART', tags: [tags.drugStore] },

   // Profit Expenses
   { name: 'TRADINGVIEW1PRODUCT', tags: [tags.profit] },
   { name: 'AIRDNA MARKET DATA DENVER CO', tags: [tags.profit] },

   // Personal Care Expenses
   { name: 'BATH AND BODY WORKS #', tags: [tags.personalCare] },

   // Gas Stations
   { name: 'ESSO', tags: [tags.fuel, tags.auto] },
   { name: 'SHELL', tags: [tags.fuel, tags.auto] },
   { name: 'EAGLES NEST GAS BAR', tags: [tags.fuel, tags.auto] },
   { name: 'CDN TIRE GASBAR ', tags: [tags.fuel, tags.auto] },
   { name: 'RALPH & SONS', tags: [tags.fuel, tags.auto] },
   { name: 'RALPH AND SONS', tags: [tags.fuel, tags.auto] },
   { name: 'PETROCAN', tags: [tags.fuel, tags.auto] },
   { name: 'FINN\'S GAS BAR ', tags: [tags.fuel, tags.auto] },

   // Restaurants
   { name: 'REDNECK BISTRO', tags: [tags.food, tags.restaurants] },
   { name: 'HOCKEY SUSHI KANATA', tags: [tags.food, tags.restaurants]},
   { name: 'JADE YI\'S KITCHEN', tags: [tags.food, tags.restaurants]},
   { name: 'KANATA NOODLE HOUSE', tags: [tags.food, tags.restaurants]},
   { name: 'JACK ASTOR\'S ', tags: [tags.food, tags.restaurants]},
   { name: 'THE KEG STEAKHOUSE ', tags: [tags.food, tags.restaurants]},
   { name: 'SHAWARMA HOUSE', tags: [tags.food, tags.restaurants]},


   // Fast Food Restaurants
   { name: 'PIZZA PIZZA #', tags: [tags.food, tags.restaurants, tags.fastFood, tags.pizza] },
   { name: 'LITTLE CAESARS PIZZA', tags: [tags.food, tags.restaurants, tags.fastFood, tags.pizza] },
   { name: 'CALABOGIE PIZZARIA', tags: [tags.food, tags.restaurants, tags.fastFood, tags.pizza] },
   { name: 'MCDONALD\'S #', tags: [tags.food, tags.restaurants, tags.fastFood] },
   { name: 'Subway ', tags: [tags.food, tags.restaurants, tags.fastFood] },
   { name: 'DAIRY QUEEN ', tags: [tags.food, tags.restaurants, tags.fastFood] },
   { name: 'KOKOMISH CAFE', tags: [tags.food, tags.restaurants, tags.fastFood] },
   { name: 'KFC/TACO BELL ', tags: [tags.food, tags.restaurants, tags.fastFood] },
   { name: 'A&W ', tags: [tags.food, tags.restaurants, tags.fastFood] },
   { name: 'NEW YORK FRIES #', tags: [tags.food, tags.restaurants, tags.fastFood] },

   // Coffee Shops
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
   { name: 'BULK BARN #', tags: [tags.food, tags.grocery]},
   { name: 'M&M FOOD MARKET #', tags: [tags.food, tags.grocery]},
   { name: 'BRANDON & MEGAN\'S NO F', tags: [tags.food, tags.grocery]},
   { name: 'CHRIS & TANYA\'S NO FRI', tags: [tags.food, tags.grocery]},

   // Cody
   { name: 'REN\'S PETS', tags: [tags.cody, tags.pet]},
   { name: 'CARLING ANIMAL HOSPITA', tags: [tags.cody, tags.pet]},
   { name: 'CRITTER JUNGLE', tags: [tags.pet]},

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
   { name: 'KOODO MOBILE PAC', tags: [tags.communication, tags.mobile] },
   { name: 'KOODO AIRTIME', tags: [tags.communication, tags.mobile] },
   { name: 'KOODO TOP UP REAPPROV', tags: [tags.communication, tags.mobile] },
   { name: 'ROGERS ', tags: [tags.communication] },

   // Amazon
   { name: 'AMZN Mktp', tags: [tags.amazon] },
   { name: 'Amazon.ca', tags: [tags.amazon] },

   // Apple
   { name: 'APPLE.COM/BILL', tags: [tags.apple] },
   { name: 'APPLE STORE #', tags: [tags.apple] },

   // Online Education
   { name: 'DAPP UNIVERSITY NASHVILLE TN', tags: [tags.education, tags.profit] },
   { name: 'LEARN PLAN PROF NEW YORK NY', tags: [tags.education, tags.profit] },

   // Charitable Donations
   { name: 'STTR FUNDRAISER', tags: [tags.charity] },

 ];

// Process mastercard transactions

function displayObject(object) {
  console.log(util.inspect(object,{depth:10}));
}

function loadDB(dbFile) {
  try {
    const dbJson = readFileSync(dbFile, 'utf8');
    return JSON.parse(dbJson);
  } catch(error) {
    console.error(`Error reading ${dbFile}`);
    throw new Error(error);
  }
}

function loadTransactionData(ofxFile) {
  try {
    const ofxData = readFileSync(ofxFile, 'utf8')
    return ofx.parse(ofxData);
  } catch(error) {
    console.error(`Error reading ${ofxFile}`);
    return null;
  }
}

function importAccountData(info) {

  const {data, accounts, db} = info;

  let MSGSV1, STMTTRNRS, STMTRS, ACCOUNT;

  for(const item of accounts) {
    switch(item.type) {
      case 'cc':
        console.log(`Scanning for credit card account ${item.accountId}`)
        MSGSV1 = 'CREDITCARDMSGSRSV1';
        STMTTRNRS = 'CCSTMTTRNRS';
        STMTRS = 'CCSTMTRS';
        ACCOUNT = 'CCACCTFROM';
        break;
      case 'bank':
        console.log(`Scanning for bank account ${item.accountId}`)
        MSGSV1 = 'BANKMSGSRSV1';
        STMTTRNRS = 'STMTTRNRS';
        STMTRS = 'STMTRS';
        ACCOUNT = 'BANKACCTFROM';
        break;
      default:

    }

    if(data.OFX && data.OFX[MSGSV1] && data.OFX[MSGSV1][STMTTRNRS]) {
      const stmttrnrs = data.OFX[MSGSV1][STMTTRNRS];
      let transactions = null;

      if(Array.isArray(stmttrnrs)) {
        transactions = stmttrnrs.find( (element, index) => element[STMTRS][ACCOUNT].ACCTID === item.accountId )
        if(transactions) {
          transactions = transactions[STMTRS].BANKTRANLIST.STMTTRN;
        }

      } else {
        if(stmttrnrs[STMTRS][ACCOUNT].ACCTID === item.accountId) {
          transactions = stmttrnrs[STMTRS].BANKTRANLIST.STMTTRN;
        }
      }

      if(transactions) {
        console.log(`Found Account ${item.accountId}`)
        processTransactions({db, account: item, transactions});
      }

    } else {
      console.log(`Account ${item.accountId} not found.`)
    }
  }
}

function processTransactions(data) {

  const {db, account, transactions} = data;

  const accountId = account.accountId;
  const profile = account.profile;

  if(!db[accountId]) {
    db[accountId] = {};
    db[accountId].name = account.name;
    db[accountId].type = account.type;
    db[accountId].transactions = {};
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

    db[accountId].transactions[item.id] = item;
  });

}

function saveDB(dbFile, db) {
  writeFileSync(dbFile,JSON.stringify(db,null,2));
}

// Accounts to scan for ...
const accounts = [
  {
    name: process.env.CC1_NAME,
    type: 'cc',
    accountId: process.env.CC1_ACCOUNT_ID,
    profile: ccProfile
  },
  {
    name: process.env.BANK1_NAME,
    type: 'bank',
    accountId: process.env.BANK1_ACCOUNT_ID,
    profile: bankProfile
  }
];

let ofxFile = process.argv[2];
let accountData;
let data;

if(ofxFile) {
 data = loadTransactionData(ofxFile);
} else {
  console.error('You must specify an OFX data file.');
  process.exit();
}

const db = loadDB(dbFile);

importAccountData({data, accounts, db})


// Save the database
//saveDB(db,dbFile);
