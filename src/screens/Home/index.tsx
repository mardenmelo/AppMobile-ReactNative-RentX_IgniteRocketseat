import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';
import api from '../../services/api';
import { carDTO } from '../../dtos/carDTO';

import {
 Container,
 Header,
 TotalCars,
 HeaderContent,
 CarList
} from './styles';
import { Load } from '../../components/Load';

export function Home(){
  const [cars, setCars] = useState<carDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<any>();

  function handleCarDetails(car: carDTO) {
    navigation.navigate('CarDetails', {car})
  }

  useEffect(() => {
    async function fechtCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fechtCars();
  },[])

 return (
   <Container>
     <StatusBar 
        barStyle='light-content' 
        translucent 
        backgroundColor="transparent" />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      {
        loading ? <Load/> : 
          <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
      }
   </Container>
 );
}
