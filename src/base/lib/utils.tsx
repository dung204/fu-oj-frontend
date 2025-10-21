import moment from 'moment';

export const numberDefault = '000000000000000000000000000000000000';

class Utils {
  formatDate = (date?: any, format: any = 'DD/MM/YYYY HH:mm', defaultEmpty: string = '') => {
    if (!date) {
      return defaultEmpty;
    } else {
      const data = moment(date);
      if (data.isValid()) {
        return moment(date).format(format);
      } else {
        return defaultEmpty;
      }
    }
  };
}

export const utils = new Utils();
