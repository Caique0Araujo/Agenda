const bcrypt = require('bcrypt');

module.exports = class EncryptService{

    static encrypt(password){
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        return hashedPassword;
    }

    static decrypt(password, userpassword){
        const passwordMatches = bcrypt.compareSync(password, userpassword)
        if(!passwordMatches) {
            return true
        }else{
            return false
        }
    }

}