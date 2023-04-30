// import React,{ useEffect, useRef, useState } from 'react'
// import { MDBContainer } from "mdb-react-ui-kit";
// import  AvatarImg  from '../assets/images/faces/noface.png';
// import accountService from '../services/accountService';

// export default function Avatar(url) {
//   console.log("url", url)
//   const [avatarImage, setAvatarImage] = useState(null)
//   useEffect(()=>{
//     if(url.url && !avatarImage){
//       setAvatarImage(url.url)
//     }
//   })
//   const inputRef = useRef(null)
//   const { isOpen, onOpen, onClose } = useDisclosure()

//   const openChooseFile = () => {
//     inputRef.current.click()
//   }

//   const handleChangeAvatar = event => {
//     const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
//     const selected = event.target.files[0]

//     if (selected && ALLOWED_TYPES.includes(selected.type)) {
//       let reader = new FileReader()
//       reader.onloadend = () => setAvatarImage(reader.result)
//       const formData = new FormData();
//       formData.append("file", selected);
//       accountService.uploadUserAvatar(formData);
//       return reader.readAsDataURL(selected)
//     }

//     onOpen()
//   }

//   return (
//     <MDBContainer className="my-5 d-flex justify-content-center">
//       <img
//         src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
//         className="rounded-circle shadow-4"
//         style={{ width: "150px" }}
//         alt="Avatar"
//       />
//     </MDBContainer>

//     // <Box h={60} w={60} margin='30px auto' padding={3} overflow="hidden">
//     //   <image
//     //     w="full"
//     //     h="full"
//     //     objectFit="avatar"
//     //     src={avatarImage ? avatarImage : AvatarImg}
//     //     alt="Avatar"
//     //     style={{"border-radius":"50%", "border": "6px solid white", "box-shadow": "0px 0px 0px 6px gray"}}
//     //   />
//     //   <button
//     //     onClick={openChooseFile}
//     //     position="absolute"
//     //     top={60}
//     //     left={380}
//     //     variant="ghost"
//     //   >
//     //     <svg width="1.2em" fill="currentColor" viewBox="0 0 20 20">
//     //       <path
//     //         fillRule="evenodd"
//     //         clipRule="evenodd"
//     //         d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
//     //       />
//     //     </svg>
//     //     <input ref={inputRef} type="file" onChange={handleChangeAvatar} hidden />
//     //   </button>
//     //   <Modal isOpen={isOpen} onClose={onClose}>
//     //     <ModalOverlay />
//     //     <ModalContent>
//     //       <ModalHeader>Something went wrong</ModalHeader>
//     //       <ModalCloseButton />
//     //       <ModalBody>
//     //         <p>File not supported!</p>
//     //         <HStack mt={1}>
//     //           <p color="brand.cadet" fontSize="sm">
//     //             Supported types:
//     //           </p>
//     //           <Badge colorScheme="green">PNG</Badge>
//     //           <Badge colorScheme="green">JPG</Badge>
//     //           <Badge colorScheme="green">JPEG</Badge>
//     //         </HStack>
//     //       </ModalBody>

//     //       <ModalFooter>
//     //         <button onClick={onClose}>Close</button>
//     //       </ModalFooter>
//     //     </ModalContent>
//     //   </Modal>
//     // </Box>
//   )
// }
