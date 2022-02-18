import React from 'react';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

import speedSvg from '../../assets/speed.svg';
import acelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import {
 Container,
 Header,
 CarImage,
 Content,
 Details,
 Description,
 Brand,
 Name,
 Rent,
 Period,
 Price,
 Accessories,
 RentalPeriod,
 CalendarIcon,
 DateInfo,
 DateTitle,
 DateValue,
 RentalPrice,
 RentalPriceLabel,
 RentalPriceDetails,
 RentalPriceQuota,
 RentalPriceTotal,
 Footer,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

export function SchedulingDetails(){

 const theme = useTheme();

 const navigation = useNavigation<any>();
 
 function handleConfirmRental() {
     navigation.navigate('SchedulingComplete')
 }

 function handleBack() {
    navigation.goBack();
  }


 return (
   <Container>
       <Header>
           <BackButton onPress={handleBack}/>
       </Header>

      <CarImage>
          <ImageSlider imageUrl={['https://cdn.sitewebmotors.com.br/uploads/userGallery/5fcfe53240728.png']}/>
      </CarImage>

      <Content>
            <Details>
                <Description>
                    <Brand>Lamborghini</Brand>
                    <Name>Huracan</Name>
                </Description>

                <Rent>
                    <Period>Ao dia</Period>
                    <Price>R$ 580</Price>
                </Rent>
            </Details>

            <Accessories>
                <Accessory name='380km/h' icon={speedSvg}/>
                <Accessory name='3.2s' icon={acelerationSvg}/>
                <Accessory name='800 HP' icon={forceSvg}/>
                <Accessory name='Gasoline' icon={gasolineSvg}/>
                <Accessory name='Auto' icon={exchangeSvg}/>
                <Accessory name='2 pessoas' icon={peopleSvg}/>
            </Accessories>

            <RentalPeriod>
                <CalendarIcon>
                    <Feather 
                        name="calendar"
                        size={RFValue(24)}px
                        color={theme.colors.shape}
                    />
                </CalendarIcon>

                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue>18/06/2021</DateValue>
                </DateInfo>

                <Feather 
                    name="arrow-right"
                    size={RFValue(10)}px
                    color={theme.colors.text}
                    />

                <DateInfo>
                <DateTitle>ATÉ</DateTitle>
                <DateValue>18/06/2021</DateValue>
                </DateInfo>
            </RentalPeriod>

            <RentalPrice>
                <RentalPriceLabel>TOTAL</RentalPriceLabel>
                <RentalPriceDetails>
                    <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
                    <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
                </RentalPriceDetails>
            </RentalPrice>

      </Content>

      <Footer>
          <Button title='Alugar agora' color={theme.colors.success} onPress={handleConfirmRental}/>
      </Footer>
   </Container>
 );
}