import {
    Box,
    Flex,
    Stack,
    Link,
    Popover,
    PopoverTrigger,
    useColorModeValue,
} from '@chakra-ui/react';


const Navigation = ({ token }: any) => {

    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const addLocationColor = useColorModeValue('blue.600', 'blue.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const NAV_ITEMS = !token ? ['register', 'login'] : ['dashboard', 'add-location', 'logout',]

    const onLogoutClick = (e: any) => {
        e.preventDefault();
        if (e.target.innerText === 'logout') {
            localStorage.setItem("aqiToken", "")
            window.location.href = '/';
            return false;
        } else {
            window.location.href = e.target.innerText === 'dashboard' ? '/' : `/${e.target.innerText}`
        }
    }

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <Stack direction={'row'} spacing={4}>
                            {NAV_ITEMS.map((navItem) => (
                                <Box key={navItem}>
                                    <Popover trigger={'hover'} placement={'bottom-start'}>
                                        <PopoverTrigger>
                                            <Link
                                                p={2}
                                                fontSize={'md'}
                                                fontWeight={500}
                                                color={(navItem === 'add location' ? addLocationColor : linkColor)}
                                                onClick={onLogoutClick}
                                                _hover={{
                                                    textDecoration: 'none',
                                                    color: linkHoverColor,
                                                }}>
                                                {navItem}
                                            </Link>
                                        </PopoverTrigger>
                                    </Popover>
                                </Box>
                            ))}
                        </Stack>
                    </Flex>
                </Flex>
            </Flex>
        </Box >
    );
}

export default Navigation;