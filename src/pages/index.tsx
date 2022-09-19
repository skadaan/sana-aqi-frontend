import {
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Link,
} from '@chakra-ui/react';

const GetStarted = () => {
    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    Tracking AQI in your area{' '}
                    <Text as={'span'} color={'blue.400'}>
                        made easy
                    </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    How polluted is the air today? Check out the real-time air pollution map, from more than 100 countries.
                </Text>
                <Stack spacing={6} direction={'row'}>
                    <Button
                        rounded={'full'}
                        px={6}
                        colorScheme={'blue'}
                        bg={'blue.400'}
                        _hover={{ bg: 'blue.500' }}>
                        <Link href="/register">Get Started</Link>
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}

export default GetStarted;