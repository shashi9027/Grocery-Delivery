// api/seller/login

import jwt from "jsonwebtoken"

export const sellerLogin = async (req, res) => {
    const { email, password } = req.body;

    try {


        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' })
            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.json({ success: true, message: "Logged In" })
        }
        else {
            return res.json({ success: false, message: "Not Authorized" })
        }

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }


}


// api/seller/auth

export const isSellerAuth = async(req, res )=>{
    try{
        
        return res.json({success:true})
    }
    catch(error){
        console.log(error.message)
        return res.json({success:false, message:error.message})  
    }
}

// api/seller/logout
export const sellerLogout =async(req, res)=>{
    try{
        res.clearCookie('sellerToken', {
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'?none :"strict"

        })

        return res.json({success:true, message:"Logged Out"})
    }
    catch(error){
         console.log(error.message)
        return res.json({success:false, message:error.message}) 
    }
}