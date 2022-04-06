const {DateTime} = require('luxon')

module.exports = class DateService{


    static formatDate(date, raw){

        if(raw){
            let dt = DateTime.fromJSDate(date);
            return date = dt.setLocale('pt-br').toLocaleString(DateTime.DATETIME_MED);  
        }else{
            let dt = DateTime.fromISO(date);
            return date = dt.setLocale('pt-br').toLocaleString(DateTime.DATETIME_MED);
        }       
    }

    static formateDateForm(date){
        let dt = DateTime.fromJSDate(date);
        return date = dt.toISO({
            format: 'extended',
            suppressSeconds: true,
            suppressMilliseconds: true,
            includeOffset: false
        });
    }
      
}