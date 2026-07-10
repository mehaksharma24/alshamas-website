export interface Store {
  id: string;
  name: string;
  chain: string;
  address: string;
  city: string;
  province: string;
  postal: string;
  lat: number;
  lng: number;
}

export const stores: Store[] = [
  { id: 's1', name: 'Walmart Supercentre', chain: 'Walmart', address: '300 Borough Dr', city: 'Toronto', province: 'ON', postal: 'M1P 4P5', lat: 43.7734, lng: -79.2557 },
  { id: 's2', name: 'Loblaws', chain: 'Loblaws', address: '60 Carlton St', city: 'Toronto', province: 'ON', postal: 'M5B 1J9', lat: 43.6606, lng: -79.3793 },
  { id: 's3', name: 'Costco Wholesale', chain: 'Costco', address: '100 Galaxy Blvd', city: 'Mississauga', province: 'ON', postal: 'L4W 5N6', lat: 43.6777, lng: -79.6093 },
  { id: 's4', name: 'FreshCo', chain: 'FreshCo', address: '2120 Weston Rd', city: 'North York', province: 'ON', postal: 'M9N 1X9', lat: 43.7036, lng: -79.5187 },
  { id: 's5', name: 'No Frills', chain: 'No Frills', address: '2589 Eglinton Ave W', city: 'Toronto', province: 'ON', postal: 'M6M 1N2', lat: 43.6912, lng: -79.4891 },
  { id: 's6', name: 'Real Canadian Superstore', chain: 'Superstore', address: '51 Stanley Ave', city: 'Brampton', province: 'ON', postal: 'L6S 4A3', lat: 43.6863, lng: -79.7427 },
  { id: 's7', name: 'Metro', chain: 'Metro', address: '2225 Boul. de Maisonneuve O', city: 'Montreal', province: 'QC', postal: 'H4A 1L7', lat: 45.4865, lng: -73.6152 },
  { id: 's8', name: 'IGA Extra', chain: 'IGA', address: '300 Av. de la Cathédrale', city: 'Montreal', province: 'QC', postal: 'H2Y 1C3', lat: 45.5088, lng: -73.5872 },
  { id: 's9', name: 'Save-On-Foods', chain: 'Save-On-Foods', address: '19800 64 Ave', city: 'Surrey', province: 'BC', postal: 'V2Y 2Z4', lat: 49.1239, lng: -122.7957 },
  { id: 's10', name: 'Real Canadian Superstore', chain: 'Superstore', address: '4700 50 St SE', city: 'Calgary', province: 'AB', postal: 'T2B 3R2', lat: 50.9784, lng: -113.9839 },
  { id: 's11', name: 'Co-op', chain: 'Co-op', address: '1829 16 Ave NW', city: 'Calgary', province: 'AB', postal: 'T2N 1L5', lat: 51.0605, lng: -114.1538 },
  { id: 's12', name: 'Walmart Supercentre', chain: 'Walmart', address: '900 St James St', city: 'Winnipeg', province: 'MB', postal: 'R3G 3J6', lat: 49.8899, lng: -97.1619 },
  { id: 's13', name: 'Sobeys', chain: 'Sobeys', address: '1124 Wellington St W', city: 'Ottawa', province: 'ON', postal: 'K1Y 2Z7', lat: 45.4068, lng: -75.7196 },
  { id: 's14', name: 'Food Basics', chain: 'Food Basics', address: '75 The Donway W', city: 'Toronto', province: 'ON', postal: 'M3C 1M2', lat: 43.7442, lng: -79.3449 },
  { id: 's15', name: 'T&T Supermarket', chain: 'T&T', address: '222 Cherry St', city: 'Toronto', province: 'ON', postal: 'M5A 0L7', lat: 43.6509, lng: -79.3589 },
  { id: 's16', name: 'Save-On-Foods', chain: 'Save-On-Foods', address: '1015 McKenzie Ave', city: 'Victoria', province: 'BC', postal: 'V8P 2L5', lat: 48.4517, lng: -123.3651 },
];

export const retailLogos = ['Walmart', 'Costco', 'Loblaws', 'Metro', 'Sobeys', 'FreshCo', 'No Frills', 'Save-On-Foods', 'IGA', 'Real Canadian Superstore', 'Food Basics', 'T&T'];
