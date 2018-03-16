const mongoose = require('mongoose');
mongoose.connect('mongodb://Crypto:SafePassword1@cryptoartdealer-shard-00-00-wnfje.mongodb.net:27017,cryptoartdealer-shard-00-01-wnfje.mongodb.net:27017,cryptoartdealer-shard-00-02-wnfje.mongodb.net:27017/test?ssl=true&replicaSet=CryptoArtDealer-shard-0&authSource=admin');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

const User = mongoose.model('User', { address: {type: String, unique: true, index: true}, email: String, fullName: String });


const mongo = {
    addUser: function(address,email,fullName) {
        let u = new User({address: address, email: email, fullName: fullName});
        return u.save().then((res) => {
            return res;
        })
    },
    updateUser(address,o){
        let query = {address: address};
        delete o.address;
        return User.findOneAndUpdate(query, o).then((res)=>{
            return res;
        });
    },
    getUser(address){
        return User.findOne({address: address}).then((res)=> {
            return res;
        })
    }
};

module.exports = mongo;