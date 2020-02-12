import { SHEET_Feeds } from './strategy_sheet'
import { ZIP_Parser } from './strategy_zip'

// ZIP File enerator
const FILE_NAME = 'SongsermExample'
const SHEET_KEY = '1MLrNIC500UQl5A0kSURdvKKBgfIvF6GtMBlPJkvNc5U'
const PACK_FILE = [
  {
    path: 'agency',
    header: 'agency_id,agency_name,agency_url,agency_timezone,agency_phone',
    body: ['\n1,Songserm,www.songserm.co.th,Asia/Bangkok,+6626293415']
  },
  {
    path: 'calendar',
    header:
      'service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date',
    body: ['\n1,1,1,1,1,1,1,1,20200201,20200228']
  },
  {
    path: 'fare_attributes',
    header:
      'fare_id,price,currency_type,payment_method,transfers,agency_id,transfer_duration,comment',
    body: [
      '\n1,200.00,THB,1,0,14,,Donsak-Koh Samui',
      '\n2,200.00,THB,1,0,14,,Koh Samui-Koh Phangan',
      '\n3,350.00,THB,1,0,14,,Koh Phangan-Koh Tao',
      '\n4,320.00,THB,1,0,14,,Donsak-Koh Phangan',
      '\n5,500.00,THB,1,0,14,,Koh Samui-Koh Tao',
      '\n6,625.00,THB,1,0,14,,Donsak-Koh Tao'
    ]
  },
  {
    path: 'fare_rules',
    header: 'fare_id,route_id,origin_id,destination_id,contains_id',
    body: [
      '\n1,1,1,2,',
      '\n2,1,2,3,',
      '\n3,1,3,4,',
      '\n4,1,1,3,',
      '\n5,1,2,4,',
      '\n6,1,1,4,'
    ]
  },
  {
    path: 'routes',
    header:
      'route_id,agency_id,route_short_name,route_long_name,route_desc,route_type',
    body: ['\n1,1,Donsak to Koh Tao,Donsak to Koh Tao,,4']
  },
  {
    path: 'stop_times',
    header:
      'trip_id,departure_time,arrival_time,stop_id,stop_sequence,pickup_type,drop_off_type',
    body: [
      '\n1,10:00:00,10:00:00,1,1,,',
      '\n1,11:20:00,11:30:00,2,2,,',
      '\n1,12:15:00,12:45:00,3,3,,',
      '\n1,14:30:00,14:30:00,4,4,,'
    ]
  },
  {
    path: 'stops',
    header:
      'stop_id,stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url,location_type,parent_station',
    body: [
      '\n1,Donsak,,9.337431,99.68109,1,,,',
      '\n2,Koh Samui,,9.535567,99.93455,2,,,',
      '\n3,Koh Phangan,,9.710947,99.98247,3,,,',
      '\n4,Koh Tao,,10.08421,99.82412,4,,,'
    ]
  },
  {
    path: 'trips',
    header:
      'route_id,service_id,trip_id,trip_headsign,direction_id,block_id,shape_id',
    body: ['\n1,1,1,,,,']
  }
]

SHEET_Feeds(SHEET_KEY, 'template_file').then(res => {
  // console.log(res)
  ZIP_Parser(FILE_NAME, [...PACK_FILE, res])
})
