import {Router} from "express";
import {
    createError ,
    generateAuthToken ,
    generateOtpAndToken ,
    Next ,
    RequestInterface ,
    ResponseInterface ,
    setAuthorizationHeader ,
    SUCCESS
} from "../utils";
import {LoginOTPInterface} from "../models";
import {Schema} from "../../database/schema";
import {requiredLoginOtpVerification} from "../utils/middlewares/login-otp-verification.middleware";
import {Model} from "sequelize";

const router = Router ();


// [POST]: User login controller With OTP
router.post ('/with-otp' , async (req: RequestInterface , res: ResponseInterface , next: Next) => {
    try {
        const payload: LoginOTPInterface = req.body as LoginOTPInterface;
        const phoneNumber: string = payload.phoneNumber;

        // check valid phone or not
        if (phoneNumber.length < 5 || phoneNumber.length > 10) throw new createError.UnprocessableEntity (`phone number is not valid, must be more than 5 and less than 10 digits`);

        // check for phone number is registered or not
        const isPhoneRegistered = await Schema.User.findOne ({where :{phoneNumber}});
        if (isPhoneRegistered === null)
            throw new createError.BadRequest ('Sorry!, you are not registered with this phone number');

        // generate OTP
        const {otp , otpToken} = generateOtpAndToken (phoneNumber);

        return res.status (200).send ({
            ...SUCCESS ,
            otp ,
            otpToken ,
            phoneNumber ,
            message :'otp has been sent to your phone number! Otp valid for 2 minutes'
        })

    } catch (e) {
        next (e);
    }
})

// [POST]: User login success verification OTPCode sent to the user
router.post ('/with-otp/:phoneNumber/verify' , requiredLoginOtpVerification , async (req: RequestInterface , res: ResponseInterface , next: Next) => {
    try {

        const phoneNumber: string = (req as any).phoneNumber;
        const userResp: Model<any , any> = await Schema.User.findOne ({where :{phoneNumber}}) as Model<any , any>;

        const token = generateAuthToken (userResp);
        setAuthorizationHeader (res , token);

        return res.status (200).send ({
            ...SUCCESS ,
            isLoggedIn :true ,
            token ,
            userId :userResp.getDataValue ('id')
        })

    } catch (e) {
        next (e);
    }
})


export default router;
