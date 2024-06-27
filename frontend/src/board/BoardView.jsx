import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../component/LoginProvider.jsx";
import { CustomToast } from "../component/CustomToast.jsx";
import { BoardCommentComponent } from "./BoardCommentComponent.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faHeart as fullHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import ReportButton from "../user/ReportButton.jsx";

export function BoardView() {
  const [board, setBoard] = useState("");
  const [boardLike, setBoardLike] = useState({ boardLike: false, count: 0 });
  const [isLikeProcess, setIsLikeProcess] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { successToast, errorToast } = CustomToast();
  const account = useContext(LoginContext);
  const { board_id } = useParams();

  useEffect(() => {
    axios.get(`/api/board/${board_id}`).then((res) => {
      setBoard(res.data.board);
      setBoardLike(res.data.boardLike);
    });
  }, []);

  function handleClickDelete() {
    axios
      .delete(`/api/board/${board_id}`)
      .then(() => {
        successToast("게시물이 삭제되었습니다");
        navigate("/board/list");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          errorToast("게시물 삭제에 실패했습니다. 다시 삭제해주세요");
        }
      });
  }

  function handleClickLike() {
    if (!account.isLoggedIn()) {
      return;
    }
    setIsLikeProcess(true);
    axios
      .put(`/api/board/like/${board_id}`, { boardId: board.id })
      .then((res) => {
        setBoardLike(res.data.boardLike);
        setBoard(res.data.board);
      })
      .finally(() => {
        setIsLikeProcess(false);
      });
  }

  function handleClickPrev() {
    const prevBoarId = board.id - 1;

    axios.get(`/api/board/${prevBoarId}`).then((res) => {
      setBoard(res.data.board);
      setBoardLike(res.data.boardLike);
    });
  }

  function handleClickNext() {
    const nextBoardId = board.id + 1;

    axios.get(`/api/board/${nextBoardId}`).then((res) => {
      setBoard(res.data.board);
      setBoardLike(res.data.boardLike);
    });
  }

  return (
    <Box>
      <Box>
        <Heading>자유게시판 게시글</Heading>
      </Box>
      <Flex ml={5} mt={"30px"} alignItems={"center"}>
        <Text fontSize="4xl">{board.title}</Text>
        <Spacer />
        {isLikeProcess || (
          <Flex onClick={handleClickLike} mt={"20px"} alignItems={"center"}>
            {boardLike.boardLike && (
              <FontAwesomeIcon icon={fullHeart} size={"xl"} color={"red"} />
            )}
            {boardLike.boardLike || (
              <FontAwesomeIcon icon={emptyHeart} size={"xl"} color={"red"} />
            )}
            {boardLike.count > 0 && (
              <Box ml={"5px"} fontSize={"md"}>
                좋아요 {boardLike.count}
              </Box>
            )}
          </Flex>
        )}
        {isLikeProcess && (
          <Box>
            <Spinner />
          </Box>
        )}
      </Flex>
      <Flex alignItems={"center"} ml={5} m={7}>
        {board.profileImage && board.profileImage.fileName == null && (
          <Image
            borderRadius="full"
            boxSize="45px"
            fallbackSrc="https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800"
            src={board.profileImage.src}
            alt="Default Profile Image"
            onClick={() => navigate(`/myPage/${board.userId}/shop`)}
            cursor={"pointer"}
          />
        )}
        {board.profileImage && board.profileImage.fileName != null && (
          <Image
            borderRadius="full"
            boxSize="45px"
            src={board.profileImage.src}
            alt="Profile Image"
            onClick={() => navigate(`/myPage/${board.userId}/shop`)}
            cursor={"pointer"}
          />
        )}
        <Box ml={"10px"}>
          <Text fontSize={"lg"}>{board.nickName}</Text>
        </Box>
        <Box ml={"20px"}>
          <Text fontSize={"small"} color={"gray"}>
            ৹
          </Text>
        </Box>
        <Box ml={"20px"}>
          <Text fontSize={"lg"}>{board.inserted}</Text>
        </Box>
        <Spacer />
        {account.hasAccess(board.userId) && (
          <Menu>
            <MenuButton>
              <FontAwesomeIcon icon={faEllipsisVertical} size={"lg"} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate(`/board/modify/${board_id}`)}>
                수정
              </MenuItem>
              <MenuItem onClick={onOpen}>삭제</MenuItem>
            </MenuList>
          </Menu>
        )}
        {account.hasAccess(board.userId) || (
          <Menu>
            <MenuButton as="box">
              <FontAwesomeIcon icon={faEllipsisVertical} size={"lg"} />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <ReportButton userId={board.userId} />
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
      <Divider />
      <Box border={"1px"} color={"gray.200"} borderRadius={"md"}>
        {board.boardFileList && board.boardFileList.length > 0 && (
          <Flex flexWrap={"wrap"} justifyContent={"space-evenly"} p={"20px"}>
            {board.boardFileList.map((file, index) => (
              <Card
                mt={"10px"}
                key={index}
                w={"calc(33.33% - 10px)"}
                boxShadow={"none"}
                border={"none"}
              >
                <Image src={file.filePath} w={"100%"} h={"300px"} />
              </Card>
            ))}
          </Flex>
        )}
        <Box p={"30px"}>
          <Text color={"black"} fontSize={"md"}>
            {board.content}
          </Text>
        </Box>
      </Box>
      <Flex justifyContent={"space-evenly"}>
        <Text onClick={handleClickPrev}>⟨ 이전글</Text>
        <Text onClick={handleClickNext}>다음글 ⟩</Text>
      </Flex>
      <Box>
        <BoardCommentComponent boardId={board_id} />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>게시글 삭제</ModalHeader>
          <ModalBody>
            <Text>게시글을 삭제하시겠습니까?</Text>
          </ModalBody>
          <ModalFooter>
            <Flex>
              <Button onClick={onClose}>취소</Button>
              <Button onClick={handleClickDelete} colorScheme={"red"}>
                삭제
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
