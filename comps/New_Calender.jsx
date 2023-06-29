import {Calendar, LocaleConfig} from 'react-native-calendars';
import React, {useState} from 'react';

const New_Calender = () => {
    const [selected, setSelected] = useState('');


  LocaleConfig.locales['he'] = {
    monthNames: [
      'ינואר',
      'פברואר',
      'מרץ',
      'אפריל',
      'מאי',
      'יוני',
      'יולי',
      'אוגוסט',
      'ספטמבר',
      'אוקטובר',
      'נובמבר',
      'דצמבר'
    ],
    monthNamesShort: ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יוני', 'יולי', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'],
    dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
    dayNamesShort: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']

  };
  LocaleConfig.defaultLocale = 'he';
  return (
    <Calendar
    onDayPress={day => {
      setSelected(day.dateString);
    }}
    markedDates={{
      [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
    }}
  />
  );
};

export default New_Calender;