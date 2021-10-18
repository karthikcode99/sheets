const {google, adsensehost_v4_1}=require('googleapis');
const keys=require('./keys.json')

const express=require('express')
const app=express();
const client =new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
)
client.authorize(function(err,tokens)
{
  if(err){
      console.log(err)
  }
  else{
      console.log("connected")
      gsrun(client);
  }
});
async function gsrun(cl){
    const gsapi=google.sheets({version:'v4',auth: cl });

    const opt={
        spreadsheetId:'1gX-5rh8mALgPj6nxc8o5MCgjF8MI1nrukhO4GOSqfsE',
        range:'Data',
    };
  let data= await gsapi.spreadsheets.values.get(opt);
  let newData=data.data.values;
  console.log(newData)
  app.get('/', (req, res) => {
    const obj = Object.fromEntries(newData);
        res.send(obj)
});


}
app.listen(3000, () => {
    console.log('Serving on port 3000')
})
