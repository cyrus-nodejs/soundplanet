import { Pricing } from "../models/Pricing";

export const  getPrice = async (req:any, res:any ) => {
    // await Song.find().sort({date:-1}).then(songs => res.json(songs)).catch(err => res.json("Error : " + err));
    try{
        const prices = await Pricing.find()
        if(prices ){
          res.json({ success: true, message: "View Prices!", prices:prices });
        }
        else{
          res.json({ success: false, message: "No Prices!" });
        }
  }catch (err){

  }

}


 export  const postPrice = async  (req:any, res:any ) => {

   
const {price,  plan, duration, active } = req.body
  console.log(price,  plan, duration, )
const prices = Pricing.create({
    plan,
    price,
    duration,
    active
  })
  res.json({sucess:true, message:"Pricing Saved"})
}

   

 