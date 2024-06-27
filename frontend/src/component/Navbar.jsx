import { Box, Center, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Box, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import {
  faClipboardList,
  faHeadset,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  return (
    <Flex
      border={"1px solid black"}
      h={"10px"}
      p={4}
      justifyContent={"space-between"}
      align="center"
      fontSize={"lg"}
      cursor={"pointer"}
    >
      <Center onClick={() => navigate("/board/list")} mx={2}>
        <Text fontSize={"small"} ml={2}>
          자유게시판
        </Text>
      </Center>
      <Center
        onClick={() => navigate("/question/list")}
        cursor="pointer"
        mx={2}
      >
        <Text fontSize={"small"} ml={2}>
          QnA
        </Text>
      </Center>
      <Box className="dropdown">
        <Center
          onClick={() => navigate("/question/faq")}
          cursor="pointer"
          mx={2}
        >
          <FontAwesomeIcon icon={faHeadset} />
          <Text ml={1}>고객센터</Text>
        </Center>
        <Box className="dropdown-content" fontSize={"0.9rem"}>
          <Link to="/question/faq">FAQ</Link>
          <Link to="/question/list">1:1 문의게시판</Link>
        </Box>
      </Box>

      {account.isAdmin() && (
        <Center onClick={() => navigate("/user/list")} mx={2}>
          <FontAwesomeIcon icon={faUsers} />
          <Text fontSize={"small"} ml={2}>
            회원 목록
          </Text>
        </Center>
      )}
      <Spacer />
      {account.isLoggedIn() ? (
        <>
          <Center
            onClick={() => {
              account.logout();
              navigate("/");
            }}
            cursor="pointer"
            mx={2}
          >
            <Text fontSize={"small"} ml={2}>
              로그아웃
            </Text>
          </Center>
        </>
      ) : (
        <>
          <Center onClick={() => navigate("/signup")} mx={2}>
            <Text fontSize={"small"} ml={2}>
              회원 가입
            </Text>
          </Center>
          <Box
            height="24px"
            borderLeft="1px solid #ccc"
            mx={2}
            alignSelf="center"
          />
          <Center fontSize={"small"} onClick={() => navigate("/login")} mx={2}>
            <Text ml={2}>로그인</Text>
          </Center>
        </>
      )}
    </Flex>
  );
}
