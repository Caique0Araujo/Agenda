const {DateTime} = require('luxon')

module.exports = class DateService{


    static formatDate(date){
        let dt = DateTime.fromJSDate(date);
        return date = dt.setLocale('pt-br').toLocaleString(DateTime.DATETIME_MED);  
    }


      
}