import React, { useState } from "react";
import { Container, Text, VStack, HStack, Box, IconButton, Input, Table, Thead, Tbody, Tr, Th, Td, Button, Image, useToast } from "@chakra-ui/react";
import { FaBox, FaDollarSign, FaExclamationTriangle, FaTags, FaSearch, FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState([
    { id: 1, name: "Material 1", category: "Category 1", img: 'https://images.unsplash.com/photo-1480797571962-18ab07ee47ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtYXRlcmlhbCUyMDF8ZW58MHx8fHwxNzE3NTIyNTY4fDA&ixlib=rb-4.0.3&q=80&w=1080', price: 100, quantity: 10 },
    { id: 2, name: "Material 2", category: "Category 2", img: 'https://images.unsplash.com/photo-1535931924030-c475f5f7b892?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtYXRlcmlhbCUyMDJ8ZW58MHx8fHwxNzE3NTIyNTY4fDA&ixlib=rb-4.0.3&q=80&w=1080', price: 200, quantity: 5 },
    // Add more items as needed
  ]);
  const toast = useToast();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
    toast({
      title: "Item deleted.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const filteredInventory = inventory.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Text fontSize="4xl" fontWeight="bold">
          SaaS Inventory Management
        </Text>
        <HStack spacing={4} w="full" justifyContent="space-between">
          <Box bgGradient="linear(to-r, teal.500, green.500)" p={4} borderRadius="md" color="white" flex="1" textAlign="center">
            <FaBox size="2em" />
            <Text fontSize="xl">Total Products</Text>
            <Text fontSize="2xl">{inventory.length}</Text>
          </Box>
          <Box bgGradient="linear(to-r, blue.500, cyan.500)" p={4} borderRadius="md" color="white" flex="1" textAlign="center">
            <FaDollarSign size="2em" />
            <Text fontSize="xl">Product Value</Text>
            <Text fontSize="2xl">${inventory.reduce((acc, item) => acc + item.price * item.quantity, 0)}</Text>
          </Box>
          <Box bgGradient="linear(to-r, red.500, orange.500)" p={4} borderRadius="md" color="white" flex="1" textAlign="center">
            <FaExclamationTriangle size="2em" />
            <Text fontSize="xl">Out of Stock</Text>
            <Text fontSize="2xl">{inventory.filter((item) => item.quantity === 0).length}</Text>
          </Box>
          <Box bgGradient="linear(to-r, purple.500, pink.500)" p={4} borderRadius="md" color="white" flex="1" textAlign="center">
            <FaTags size="2em" />
            <Text fontSize="xl">All Categories</Text>
            <Text fontSize="2xl">{[...new Set(inventory.map((item) => item.category))].length}</Text>
          </Box>
        </HStack>
        <HStack w="full" spacing={4}>
          <Input placeholder="Search by name" value={searchTerm} onChange={handleSearch} />
          <IconButton aria-label="Search" icon={<FaSearch />} />
          <Button colorScheme="teal">Add Material</Button>
        </HStack>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>S/N No.</Th>
              <Th>Material Name</Th>
              <Th>Material Categories</Th>
              <Th>Material Img</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th>Value</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredInventory.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.name}</Td>
                <Td>{item.category}</Td>
                <Td>
                  <Image src={item.img} boxSize="50px" />
                </Td>
                <Td>${item.price}</Td>
                <Td>{item.quantity}</Td>
                <Td>${item.price * item.quantity}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton aria-label="View" icon={<FaEye />} />
                    <IconButton aria-label="Edit" icon={<FaEdit />} />
                    <IconButton aria-label="Delete" icon={<FaTrashAlt />} onClick={() => handleDelete(item.id)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {/* Pagination can be added here */}
      </VStack>
    </Container>
  );
};

export default Index;
