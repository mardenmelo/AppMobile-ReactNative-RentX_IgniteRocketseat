import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValueContainer,
  DateValue,
  Content,
  Footer
} from './styles';

import { BackButton } from '../../components/BackButton';
import { Alert, StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDatesProps } from '../../components/Calendar';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { carDTO } from '../../dtos/carDTO';

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: carDTO;
}

export function Scheduling(){

 const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
 const [markedDates, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps);
 const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

 const theme = useTheme();
 const navigation = useNavigation<any>();
 const route = useRoute();
 const { car } = route.params as Params;
 
 function handleConfirmRental() {
  navigation.navigate('SchedulingDetails', { 
    car,
    dates: Object.keys(markedDates)
  });
}

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    })
  }

 return (

   <Container>
     <Header>
       <StatusBar 
          barStyle='light-content'
          translucent
          backgroundColor='transparent'
       />
       <BackButton 
          onPress={handleBack} 
          color={theme.colors.shape} />

       <Title>
         Escolha uma {'\n'}
         data de início e {'\n'}
         fim do aluguel
       </Title>

       <RentalPeriod>
         <DateInfo>
           <DateTitle>DE</DateTitle>
           <DateValueContainer selected={!!rentalPeriod.startFormatted}>
              <DateValue>{rentalPeriod.startFormatted}</DateValue>
           </DateValueContainer>
         </DateInfo>

         <ArrowSvg/>

         <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueContainer selected={!!rentalPeriod.endFormatted}>
              <DateValue>{rentalPeriod.endFormatted}</DateValue>
            </DateValueContainer>
         </DateInfo>
        </RentalPeriod>
     </Header>

     <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
     </Content>

     <Footer>
        <Button title='Confirmar' onPress={handleConfirmRental} />
     </Footer>
   </Container>
 );
}