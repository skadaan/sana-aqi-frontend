import { FormEvent, ChangeEvent, useState } from 'react';
import {
    Stack,
    FormControl,
    Input,
    Button,
    useColorModeValue,
    Heading,
    Container,
    Flex,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import ErrorMessage from '../components/ErrorMessage';

require('dotenv').config()


const AddLocation = () => {
    const [city, setCity] = useState('');
    const [threshold, setThreshold] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    const [state, setState] = useState<'initial' | 'submitting' | 'success'>(
        'initial'
    );
    const [, setError] = useState(false);

    const submitAddLocation = async (e: FormEvent) => {

        e.preventDefault();
        setError(false);
        setState('submitting');
        setTimeout(() => {
            setState('success');
        }, 1000);

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
                Authorization: `Bearer ${localStorage.getItem('aqiToken')}`,
            },
            body: JSON.stringify({ city: city, threshold: threshold }),
        };

        const response = await fetch(`${process.env.API_URL}/location/`, requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setErrorMessage(data.detail);
        }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Container
                maxW={'xl'}
                bg={useColorModeValue('white', 'whiteAlpha.100')}
                boxShadow={'xl'}
                rounded={'xl'}
                p={6}>
                <Heading
                    as={'h2'}
                    fontSize={{ base: 'xl', sm: '2xl' }}
                    textAlign={'center'}
                    mb={5}>
                    Add Location to track AQI
                </Heading>

                <Flex align={'center'} justify={'center'}>
                    <ErrorMessage message={errorMessage} />
                </Flex>
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    as={'form'}
                    spacing={'12px'}
                    onSubmit={submitAddLocation}>
                    <FormControl>
                        <Input
                            variant={'solid'}
                            borderWidth={1}
                            color={'gray.800'}
                            _placeholder={{
                                color: 'gray.400',
                            }}
                            borderColor={useColorModeValue('gray.300', 'gray.700')}
                            id={'city'}
                            required
                            placeholder={'Enter your city'}
                            aria-label={'Enter your city'}
                            value={city}
                            disabled={state !== 'initial'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCity(e.target.value)
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            variant={'solid'}
                            borderWidth={1}
                            color={'gray.800'}
                            _placeholder={{
                                color: 'gray.400',
                            }}
                            borderColor={useColorModeValue('gray.300', 'gray.700')}
                            id={'threshold'}
                            required
                            placeholder={'Enter AQI threshold (0-500)'}
                            aria-label={'Enter AQI threshold (0-500)'}
                            value={threshold}
                            disabled={state !== 'initial'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setThreshold(e.target.value)
                            }
                        />
                    </FormControl>
                    <FormControl w={{ base: '100%', md: '40%' }}>
                        <Button
                            colorScheme={state === 'success' ? 'green' : 'blue'}
                            isLoading={state === 'submitting'}
                            w="100%"
                            type={state === 'success' ? 'button' : 'submit'}>
                            {state === 'success' ? <CheckIcon /> : 'add'}
                        </Button>
                    </FormControl>
                </Stack>
            </Container>
        </Flex>
    );
}

export default AddLocation;