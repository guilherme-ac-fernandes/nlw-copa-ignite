import { useState } from 'react';
import { Heading, useToast, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

// API
import { api } from '../services/api';

// Components
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Find() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  const toast = useToast();

  const { navigate } = useNavigation();

  const handleJoinPool = async () => {
    if (!code.trim()) {
      return toast.show({
        title: 'Informe o código',
        placement: 'top',
        bgColor: 'red.500',
      });
    }

    try {
      setIsLoading(true);
      await api.post('/pools/join', { code });

      toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      navigate('pools');

    } catch (err) {
      console.log(err);
      setIsLoading(false);

      if (err.response?.data?.message === 'Pool not found.') {
        toast.show({
          title: 'Não foi possível encontrar o bolão',
          placement: 'top',
          bgColor: 'red.500',
        });
        return;
      }

      if (err.response?.data?.message === 'You already joined this poll.') {
        toast.show({
          title: 'Você já está nesse bolão',
          placement: 'top',
          bgColor: 'red.500',
        });
        return;
      }
    }
  };

  return (
    <VStack flex={1} bg='gray.900'>
      <Header title='Buscar por código' showBackButton />

      <VStack mt={8} mx={5} alignItems='center'>
        <Heading
          fontFamily='heading'
          color='white'
          fontSize='xl'
          mb={8}
          textAlign='center'
        >
          Encontre um bolão através de{'\n'}
          seu código único
        </Heading>

        <Input
          mb={2}
          placeholder='Qual o código do bolão?'
          autoCapitalize='characters'
          onChangeText={setCode}
        />

        <Button
          title='BUSCAR BOLÃO'
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
