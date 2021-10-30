
import axios from "axios";


export default async function handler(req, res) {

    const url3 =
    "https://www.drinkinstreet.it/wordpress/wp-json/jwt-auth/v1/token"
    ;
    if (req.method === 'POST') {
        try {// const datas =req?.body?.data ?? []
            //console.log(datas + 'ok')
            
            const result = await axios.post(url3, req?.body?.data ?? [] );
            console.log(result.data);
            res.status(200).json(result.data);
          
          } catch (err) {
            console.log('non si sa');
           
          }
      
    } else {
     
      res.status(405).end('Method Not Allowed');
    }
  }