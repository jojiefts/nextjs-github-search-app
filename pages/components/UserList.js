import { React, useState } from 'react';
import { Button, Box, Input, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const DynamicImageCard = dynamic(() => import('./ImageCard'), {
  ssr: false,
});

export default function List() {
  const [search, setSearch] = useState('');
  let [response, setResponse] = useState([]);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLikeUser = (e, name) => {
    e.preventDefault();
    let arr = [...likes];
    const newArray = arr.includes(name)
      ? arr.filter((i) => i !== name)
      : [...arr, name];

    setLikes(newArray);
  };

  return (
    <Box className="container" background="#fff" p="25" borderRadius="10">
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="2xl">GitHub Users</Text>
        <Text>Likes: {likes.length}</Text>
      </Box>
      <Box className="search-bar" display="flex">
        <Input
          type="text"
          placeholder="Search Github Users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          width={80}
          mr={2}
        />

        <Button
          colorScheme="teal"
          p={2}
          onClick={async () => {
            setLoading(true);
            if (search) {
              const api_url = `https://api.github.com/search/users?q=${search}&per_page=5`;
              const axios = (await import('axios')).default;
              const res = await axios.get(api_url).then((res) => {
                setResponse(res);
                setLoading(false);
              });
            } else {
              alert('please enter a name');
              setLoading(false);
            }
          }}
        >
          Search
        </Button>
      </Box>

      <Box pt={10}>
        <Text fontWeight="bold">{search} Results</Text>
        <Box display="flex" justifyContent="space-between" flexWrap="wrap">
          {loading && <Text>Loading...</Text>}
          {!loading &&
            response?.data &&
            response &&
            response?.data.items.map((item, index) => (
              <Box key={index} margin="10px">
                <DynamicImageCard
                  src={item.avatar_url}
                  likes={likes}
                  handleLikeUser={handleLikeUser}
                  login={item.login}
                />
                <Text fontWeight="bold">{item.login}</Text>
              </Box>
            ))}
          {!loading && response.data && response.data.total_count === 0 && (
            <Text>No Data Found</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}
