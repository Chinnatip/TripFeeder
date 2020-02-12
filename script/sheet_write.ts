var GoogleSpreadsheet = require('google-spreadsheet')
var async = require('async')
var doc = new GoogleSpreadsheet('1znxBOPde9XX19G2aGzfHd4yfFuPmev99dSsx0v_9Vbg')
var sheet

// const setDoc = async () => {
//   var creds_json = {
//     private_key:
//       '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkAtJElnubxJ3Q\nZK2SjHA+zsHCPHwQPIbND8MbJ0aFPgFXQRwXvfq/1kFYzS3zt3I3JL8eKapHrUjx\nJU6vhh9TSVOkMfLOoz7D8V0zshTx2J0nc7wIveA3uBzjnxEuWPoSOhpvD1AOln1P\nksS2270PnRpkhTY1FfRqu4+6856hjRWOd0DKq1+7Eqx4vrA+p0asS7oLDXDgRO1F\n/1TkvxmWKjrvwA/7WYNUUzvF8B706AoH7pIV3IM+u16n47s2wX2gvGMbLBm9XFcJ\nt3zD1Y3wdB14yAwRYy4bGD0lMjC4k/YgcmYqKKPjHBFl6XdPla4oETCy7uWu+9TC\nHawukMtPAgMBAAECggEACYMMnovgkDj9lGn+y7RMInKhpqa7TjoYLYnQy9sxl/Fk\nQO2YbG0ifspDY577ocUvYJmJ14pJbkAOYPD7fVsNB35xnNHwnSo2PhpdlwCA2y38\nMF8lov+40No/akeCgfp4RDZkT+nFnzYr+BvZVP+JvZMCPNtJzaEi1ykH7/al0Xtr\nE4355gDOwbmDDv2iAUyyqauq1RlY40bC0puc4ukha62jtUKxyRwqMg/grEKimAtQ\nuYXrdhWaaVTVVH0glWuPu7R+Hc6umQYCvidBoi6QkQWHHfaLvD5lEbC8gi/vp8zL\n3ImomMiN0xobQh8iQojtVIsSNFHsWtQXnVqT8A+LcQKBgQD8Qa1RBpY4wT6HyuaO\n1YXviXqEgll9nqhdjCnWaTEdd4r92JxPJMQvHRbwQBsUe6u0hReU1WrdBkBqUlu/\n7NohvQI/hyzB4Banx+o5Z46OySr6/KoGzg60X1CjFtGm223BQpRu04Y/F6z+5Ocb\nSziTHdOLvVFux9/S+iYIBo8uBQKBgQDnZQkZJ6UXwc8zbSu/YWLjjhfDafk960/1\nST455GzOiXRpM8Emi338LU2kdrpeTrvLOe5OVwENgcYs9BtzdzW3uKIvWR6UYW3I\nVgb2ccuDx8S4iXHyRlBrfi+Eztm3xSLeCPwCuHgzYyFSJ6TgEwwHnQYkXGpGtCE1\nhRfrEoTAQwKBgQDvj/Pn8ihx59vZnDDPTyqubNKEy0Hv0eA1TypgbG/vexrtrmvr\noZAK6kZhjY/qKPTNMGRPvUqKcyhzkJl/sJEL33MmH9q6mHULjAj90UIKijOePpu+\ncKx4UdjDuaULIHKgSfmrMojYnER3oa11Nz+YP4gqunV+jqUauOOrVYdefQKBgE0K\neqkBZhou0QnSQ0qI5h/VY1wQoIdZHVoRdMJZp1Bsu3F7ZcerkdqwSrWDQjG8DRJw\ny0MR/Ku+lXjKHYmoGx58PqN9DI1ikuasnczXvma10G2QdXuwpX3kmXWiWSKyZBWA\n8EcHnB2f16w+vspMDSlLwovAqTG5L4VeNsRxefl5AoGAMwtpWTTcOCnG3x8q5pIH\nybC1OrHUzUFkpgaqN8QeUNTJTolSdwZvCAqfoqheyEzsOpj7fMkbhqeMWm5hT81u\n7zyR/cITG6oZxJPvBcsTBlSeOINC29/UOwYyECfJv0M3Pypak/sBFC/zIofvdrUq\nZdb/wTpbCDjG/89G0W/49NA=\n-----END PRIVATE KEY-----\n',
//     client_email:
//       'kohlife-admin@quickstart-1572411459716.iam.gserviceaccount.com'
//   }
//   await doc.useServiceAccountAuth(creds_json)
//   await doc.getInfo(function(err, info) {
//     const find_sheet = 'booking_order'
//     let sheet_index = 0
//     info.worksheets.map((sheet, index) => {
//       if (sheet.title === find_sheet) {
//         sheet_index = index
//       }
//     })
//     sheet = info.worksheets[sheet_index]
//   })
//   return doc
// }

// const sheet_render = setDoc()

async.series(
  [
    function setAuth(step) {
      var creds_json = {
        private_key:
          '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkAtJElnubxJ3Q\nZK2SjHA+zsHCPHwQPIbND8MbJ0aFPgFXQRwXvfq/1kFYzS3zt3I3JL8eKapHrUjx\nJU6vhh9TSVOkMfLOoz7D8V0zshTx2J0nc7wIveA3uBzjnxEuWPoSOhpvD1AOln1P\nksS2270PnRpkhTY1FfRqu4+6856hjRWOd0DKq1+7Eqx4vrA+p0asS7oLDXDgRO1F\n/1TkvxmWKjrvwA/7WYNUUzvF8B706AoH7pIV3IM+u16n47s2wX2gvGMbLBm9XFcJ\nt3zD1Y3wdB14yAwRYy4bGD0lMjC4k/YgcmYqKKPjHBFl6XdPla4oETCy7uWu+9TC\nHawukMtPAgMBAAECggEACYMMnovgkDj9lGn+y7RMInKhpqa7TjoYLYnQy9sxl/Fk\nQO2YbG0ifspDY577ocUvYJmJ14pJbkAOYPD7fVsNB35xnNHwnSo2PhpdlwCA2y38\nMF8lov+40No/akeCgfp4RDZkT+nFnzYr+BvZVP+JvZMCPNtJzaEi1ykH7/al0Xtr\nE4355gDOwbmDDv2iAUyyqauq1RlY40bC0puc4ukha62jtUKxyRwqMg/grEKimAtQ\nuYXrdhWaaVTVVH0glWuPu7R+Hc6umQYCvidBoi6QkQWHHfaLvD5lEbC8gi/vp8zL\n3ImomMiN0xobQh8iQojtVIsSNFHsWtQXnVqT8A+LcQKBgQD8Qa1RBpY4wT6HyuaO\n1YXviXqEgll9nqhdjCnWaTEdd4r92JxPJMQvHRbwQBsUe6u0hReU1WrdBkBqUlu/\n7NohvQI/hyzB4Banx+o5Z46OySr6/KoGzg60X1CjFtGm223BQpRu04Y/F6z+5Ocb\nSziTHdOLvVFux9/S+iYIBo8uBQKBgQDnZQkZJ6UXwc8zbSu/YWLjjhfDafk960/1\nST455GzOiXRpM8Emi338LU2kdrpeTrvLOe5OVwENgcYs9BtzdzW3uKIvWR6UYW3I\nVgb2ccuDx8S4iXHyRlBrfi+Eztm3xSLeCPwCuHgzYyFSJ6TgEwwHnQYkXGpGtCE1\nhRfrEoTAQwKBgQDvj/Pn8ihx59vZnDDPTyqubNKEy0Hv0eA1TypgbG/vexrtrmvr\noZAK6kZhjY/qKPTNMGRPvUqKcyhzkJl/sJEL33MmH9q6mHULjAj90UIKijOePpu+\ncKx4UdjDuaULIHKgSfmrMojYnER3oa11Nz+YP4gqunV+jqUauOOrVYdefQKBgE0K\neqkBZhou0QnSQ0qI5h/VY1wQoIdZHVoRdMJZp1Bsu3F7ZcerkdqwSrWDQjG8DRJw\ny0MR/Ku+lXjKHYmoGx58PqN9DI1ikuasnczXvma10G2QdXuwpX3kmXWiWSKyZBWA\n8EcHnB2f16w+vspMDSlLwovAqTG5L4VeNsRxefl5AoGAMwtpWTTcOCnG3x8q5pIH\nybC1OrHUzUFkpgaqN8QeUNTJTolSdwZvCAqfoqheyEzsOpj7fMkbhqeMWm5hT81u\n7zyR/cITG6oZxJPvBcsTBlSeOINC29/UOwYyECfJv0M3Pypak/sBFC/zIofvdrUq\nZdb/wTpbCDjG/89G0W/49NA=\n-----END PRIVATE KEY-----\n',
        client_email:
          'kohlife-admin@quickstart-1572411459716.iam.gserviceaccount.com'
      }
      doc.useServiceAccountAuth(creds_json, step)
    },
    function getInfoAndWorksheets(step) {
      doc.getInfo(function(err, info) {
        const find_sheet = 'booking_order'
        let sheet_index = 0
        info.worksheets.map((sheet, index) => {
          if (sheet.title === find_sheet) {
            sheet_index = index
          }
        })
        sheet = info.worksheets[sheet_index]
        step()
      })
    },
    function managingSheets(step) {
      sheet.addRow(
        {
          booking_pnr: '34UI9P',
          from: 'Koh phagan',
          to: 'Suratthani',
          date: '6-Nov-2019',
          amount: 720,
          contact_name: 'Tryn Ninlakorn',
          nationality: 'TH',
          email: 'tryn@kohlife.com',
          telephone_no: '090-988-9696',
          dropoff: 'Ramada Inn, lamai'
        },
        function() {
          console.log('added')
        }
      )

      step()
    }
  ],
  function(err) {
    if (err) {
      console.log('Error: ' + err)
    }
  }
)
