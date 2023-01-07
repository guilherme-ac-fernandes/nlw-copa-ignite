// import { useCallback, useState } from 'react';
import { VStack, Icon } from 'native-base';
import { Octicons } from '@expo/vector-icons';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';

// API
import { api } from '../services/api';

// Components
import { Button } from '../components/Button';
import { Header } from '../components/Header';
// import { PoolCard, PoolCardPros } from '../components/PoolCard';
// import { Loading } from '../components/Loading';
// import { EmptyPoolList } from '../components/EmptyPoolList';

export function Pools() {
  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Meus Bolões' />

      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor='gray.600'
        pb={4}
        mb={4}
      >
        <Button
          title='BUSCAR BOLÃO POR CÓDIGO'
          leftIcon={
            <Icon as={Octicons} name='search' color='black' size='md' />
          }
          // onPress={() => navigate('find')}
        />
      </VStack>

    </VStack>
  );
}
