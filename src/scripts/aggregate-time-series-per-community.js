
const fs = require('fs-extra')

const FOLDER = './public/data/'
module.exports = function agregateTimeSeriesPerCommunity () {
  
 
  const aggregatedFile = './public/data/aggregated.json'

  fs.readJson(aggregatedFile)
  .then(existing => {
    const total_ccaa = existing[0][1].length
    
    for (let index = 0; index < total_ccaa; index++) {
      const ccaa = existing[0][1][index]['ccaa'];      
      const aggregated_ccaa = existing.map( (k,v) => {
        return [k[0],k[1][index]]
      })
      const ccaaFile = `./public/data/time-series/${ccaa}.json`

      fs.readJson(ccaaFile)
      .then((comunidad)=>{
        const aggregated = comunidad
        const existing_date = aggregated.find(array => array[0] == aggregated_ccaa[0])
        
        existing_date ? aggregated[aggregated_ccaa[0]] = aggregated_ccaa[1] : aggregated.push(aggregated_ccaa)
        fs.writeJson(ccaaFile, aggregated)
        .then(() => {
          console.log('success!')
        })
        .catch(err => {
          console.error(err)
        })
      })
      console.log(existing.length)      
    }
  })
  .catch(err => {
    console.error(err)
  })
  
  
  
}
