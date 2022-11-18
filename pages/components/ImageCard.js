import { Box, Image } from '@chakra-ui/react';
import { AiFillLike } from 'react-icons/ai';

const ImageCard = ({ src, likes, handleLikeUser, login }) => {
  return (
    <Box
      backgroundColor="#f0f0f1"
      padding={25}
      width="250px"
      height="300px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius={10}
      position="relative"
    >
      <Box position="absolute" top={0} right={0} className="image-like">
        <Box
          padding={15}
          backgroundColor="#fff"
          mt="10px"
          mr="10px"
          borderRadius={10}
        >
          <AiFillLike
            size="30"
            cursor="pointer"
            color={`${likes.includes(login) ? '#19b2a7' : '#000'}`}
            onClick={(e) => handleLikeUser(e, login)}
          />
        </Box>
      </Box>
      <Image
        boxSize="150px"
        objectFit="cover"
        src={src}
        alt="avatar"
        borderRadius={10}
      />
    </Box>
  );
};

export default ImageCard;
