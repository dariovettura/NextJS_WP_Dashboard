import cheerio from 'cheerio'
import axios from 'axios'

export default async function handler(req, res) {

    
    if (req.method === 'POST') {
        try {// const datas =req?.body?.data ?? []
            //console.log(datas + 'ok')
            
            const {data} = await axios.get(req?.body?.data ?? [] );
            const $ = cheerio.load(data)
              const title = $('.WlYyy.cPsXC.GeSzT').text()
              const descrizione = $('.AspiI._d.MJ .WlYyy.diXIH.dDKKM').text()
              const orari = $('.bHGlw').text()
              const indirizzo = $('.oo9gr5id.hzawbc8m span').text()
              
              
               const lastScraped = new Date().toISOString()
            res.status(200).json([{acf:{descrizione:descrizione,orari:orari,indirizzo:indirizzo}}]);
         
          
          } catch (err) {
            console.log('non si sa');
           
          }
      
    } else {
     
      res.status(405).end('Method Not Allowed');
    }
  }