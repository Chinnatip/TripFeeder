let GoogleSpreadsheet = require('google-spreadsheet')
let creds_json = {
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkAtJElnubxJ3Q\nZK2SjHA+zsHCPHwQPIbND8MbJ0aFPgFXQRwXvfq/1kFYzS3zt3I3JL8eKapHrUjx\nJU6vhh9TSVOkMfLOoz7D8V0zshTx2J0nc7wIveA3uBzjnxEuWPoSOhpvD1AOln1P\nksS2270PnRpkhTY1FfRqu4+6856hjRWOd0DKq1+7Eqx4vrA+p0asS7oLDXDgRO1F\n/1TkvxmWKjrvwA/7WYNUUzvF8B706AoH7pIV3IM+u16n47s2wX2gvGMbLBm9XFcJ\nt3zD1Y3wdB14yAwRYy4bGD0lMjC4k/YgcmYqKKPjHBFl6XdPla4oETCy7uWu+9TC\nHawukMtPAgMBAAECggEACYMMnovgkDj9lGn+y7RMInKhpqa7TjoYLYnQy9sxl/Fk\nQO2YbG0ifspDY577ocUvYJmJ14pJbkAOYPD7fVsNB35xnNHwnSo2PhpdlwCA2y38\nMF8lov+40No/akeCgfp4RDZkT+nFnzYr+BvZVP+JvZMCPNtJzaEi1ykH7/al0Xtr\nE4355gDOwbmDDv2iAUyyqauq1RlY40bC0puc4ukha62jtUKxyRwqMg/grEKimAtQ\nuYXrdhWaaVTVVH0glWuPu7R+Hc6umQYCvidBoi6QkQWHHfaLvD5lEbC8gi/vp8zL\n3ImomMiN0xobQh8iQojtVIsSNFHsWtQXnVqT8A+LcQKBgQD8Qa1RBpY4wT6HyuaO\n1YXviXqEgll9nqhdjCnWaTEdd4r92JxPJMQvHRbwQBsUe6u0hReU1WrdBkBqUlu/\n7NohvQI/hyzB4Banx+o5Z46OySr6/KoGzg60X1CjFtGm223BQpRu04Y/F6z+5Ocb\nSziTHdOLvVFux9/S+iYIBo8uBQKBgQDnZQkZJ6UXwc8zbSu/YWLjjhfDafk960/1\nST455GzOiXRpM8Emi338LU2kdrpeTrvLOe5OVwENgcYs9BtzdzW3uKIvWR6UYW3I\nVgb2ccuDx8S4iXHyRlBrfi+Eztm3xSLeCPwCuHgzYyFSJ6TgEwwHnQYkXGpGtCE1\nhRfrEoTAQwKBgQDvj/Pn8ihx59vZnDDPTyqubNKEy0Hv0eA1TypgbG/vexrtrmvr\noZAK6kZhjY/qKPTNMGRPvUqKcyhzkJl/sJEL33MmH9q6mHULjAj90UIKijOePpu+\ncKx4UdjDuaULIHKgSfmrMojYnER3oa11Nz+YP4gqunV+jqUauOOrVYdefQKBgE0K\neqkBZhou0QnSQ0qI5h/VY1wQoIdZHVoRdMJZp1Bsu3F7ZcerkdqwSrWDQjG8DRJw\ny0MR/Ku+lXjKHYmoGx58PqN9DI1ikuasnczXvma10G2QdXuwpX3kmXWiWSKyZBWA\n8EcHnB2f16w+vspMDSlLwovAqTG5L4VeNsRxefl5AoGAMwtpWTTcOCnG3x8q5pIH\nybC1OrHUzUFkpgaqN8QeUNTJTolSdwZvCAqfoqheyEzsOpj7fMkbhqeMWm5hT81u\n7zyR/cITG6oZxJPvBcsTBlSeOINC29/UOwYyECfJv0M3Pypak/sBFC/zIofvdrUq\nZdb/wTpbCDjG/89G0W/49NA=\n-----END PRIVATE KEY-----\n',
  client_email: 'kohlife-admin@quickstart-1572411459716.iam.gserviceaccount.com'
}

const findSheet = (sheetName, info) => {
  let sheet_index = 0
  info.worksheets.map((sheet, index) => {
    if (sheet.title === sheetName) {
      sheet_index = index
    }
  })
  return info.worksheets[sheet_index]
}

const templateReconstruct = body => {
  let bodyParser = []
  body.map(item => {
    const {
      company: company,
      fromdestination: from_destination,
      todestination: to_destination,
      fromstation: from_station,
      fromstationlatitude: from_station_latitude,
      fromstationlongitude: from_station_longitude,
      tostation: to_station,
      status: status,
      tostationlatitude: to_station_latitude,
      tostationlongitude: to_station_longitude,
      durationm: duration_m,
      departuretime: departure_time,
      arrivaltime: arrival_time,
      tostop1vehicletype: to_stop1_vehicle_type,
      tostop1durationm: to_stop1_duration_m,
      stop1station: stop1_station,
      tostop2vehicletype: to_stop2_vehicle_type,
      tostop2durationm: to_stop2_duration_m,
      stop2station: stop2_station,
      tostop3vehicletype: to_stop3_vehicle_type,
      tostop3durationm: to_stop3_duration_m,
      weeklyschedulemask: weekly_schedule_mask,
      defaultpricethb: default_price_thb,
      hotelpickuptoggle: hotel_pickup_toggle,
      hotelpickupprice: hotel_pickup_price,
      defaultmaxcapacity: default_max_capacity
    } = item
    bodyParser.push(
      `\n${company},${from_destination},${to_destination},${from_station},${from_station_latitude},${from_station_longitude},${to_station},${status},${to_station_latitude},${to_station_longitude},${duration_m},${departure_time},${arrival_time},${to_stop1_vehicle_type},${to_stop1_duration_m},${stop1_station},${to_stop2_vehicle_type},${to_stop2_duration_m},${stop2_station},${to_stop3_vehicle_type},${to_stop3_duration_m},${weekly_schedule_mask},${default_price_thb},${hotel_pickup_toggle},${hotel_pickup_price},${default_max_capacity}`
    )
  })

  return {
    path: 'template',
    header:
      'company,from_destination,to_destination,from_station,from_station_latitude,from_station_longitude,to_station,status,to_station_latitude,to_station_longitude,duration_m,departure_time,arrival_time,to_stop1_vehicle_type,to_stop1_duration_m,stop1_station,to_stop2_vehicle_type,to_stop2_duration_m,stop2_station,to_stop3_vehicle_type,to_stop3_duration_m,weekly_schedule_mask,default_price_thb,hotel_pickup_toggle,hotel_pickup_price,default_max_capacity',
    body: bodyParser
  }
}

export const SHEET_Feeds = async (sheet_key, sheetName) => {
  const doc = new GoogleSpreadsheet(sheet_key)
  const sheetCollection: any = new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(creds_json, () => {
      doc.getInfo((err, info) => {
        resolve({
          sheets: findSheet(sheetName, info)
        })
      })
    })
  })
  return new Promise((resolve, reject) => {
    sheetCollection.then(({ sheets }) => {
      const findResult: any = new Promise((resolve, reject) => {
        sheets.getRows({}, (err, rows) => {
          resolve(rows)
        })
      })
      findResult.then(rows => {
        switch (sheetName) {
          case 'template_file':
            resolve(templateReconstruct(rows))
          default:
            resolve(rows)
        }
      })
    })
  })
}
