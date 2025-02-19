import mongoose from "mongoose";

//mongo db url
mongoose.connect("mongodb+srv://admin:manish@manishdb.3v1ul.mongodb.net/paytm")



const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
})

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,   //reference to User model
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})


//tables created in database
const User = mongoose.model('User',UserSchema)
const Account = mongoose.model('Account', AccountSchema)
export {User, Account}
