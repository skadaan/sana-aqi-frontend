import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { GrDocumentMissing, GrStatusGood, GrStatusWarning } from 'react-icons/gr';

interface StatsCardProps {
    city: string;
    threshold: string;
}
const Location = (props: StatsCardProps) => {
    const [aqi, setAqi] = useState<string>();
    const { city, threshold } = props;

    const getAQI = useCallback(async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
            },
        };

        const response = await fetch(`/location/aqi?city=${city}`, requestOptions)
        const data = await response.json();
        if (!response.ok) {
            console.log("something messed up");
        } else {
            setAqi(data.data.aqi);
        }
    }, [city])

    useEffect(() => {
        getAQI()
    }, [getAQI])


    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'}>
                        city: {city}
                    </StatLabel>
                    <StatLabel fontWeight={'small'}>
                        threshold: {threshold}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        AQI: {aqi}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    alignContent={'center'}>
                    {(aqi === 'no data' ? (
                        <GrDocumentMissing size='50px' />
                    ) : (aqi && aqi < threshold ? (
                        <GrStatusGood size='50px' />
                    ) : (
                        <GrStatusWarning size='50px' />
                    )))}
                </Box>
            </Flex>
        </Stat>
    );
}

const Dashboard = () => {
    const [token,] = useState<string | null>(localStorage.getItem("aqiToken"));
    const [locations, setLocations] = useState<[{ city: string, threshold: string }]>()

    useEffect(() => {
        const fetchLocations = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
            const response = await fetch("/location", requestOptions);
            const data = await response.json();
            if (!response.ok) {
                console.log('error ')
            } else {
                setLocations(data)
            }
        }
        fetchLocations();
    }, [token])

    return (
        <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <chakra.h1
                textAlign={'center'}
                fontSize={'4xl'}
                py={10}
                fontWeight={'bold'}>
                {locations ? (
                    <>Here are your saved Locations</>
                ) : (
                    <>No locations saved yet</>
                )}
            </chakra.h1>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                {locations && locations.map(({ city, threshold }) => (
                    <Location
                        city={city}
                        threshold={threshold}
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
}

export default Dashboard;