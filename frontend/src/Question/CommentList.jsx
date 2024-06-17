import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Input,
  Stack,
  StackDivider,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../component/LoginProvider.jsx";

export function CommentList({ questionId, isProcessing, setIsprocessing }) {
  const [question, setQuestion] = useState([]);
  const account = useContext(LoginContext);
  const toast = useToast();
  useEffect(() => {
    if (!isProcessing) {
      axios
        .get(`/api/question/comment/${questionId}`)
        .then((res) => setQuestion(res.data));
    }
  }, [questionId]);

  function handleRemoveClick() {
    axios
      .delete(`/api/question/comment/${questionId}`)
      .then(() => {
        toast({
          status: "success",
          description: `${questionId}번 게시물이 삭제 되었습니다.`,
          position: "bottom",
          duration: 2000,
        });
      })
      .catch((err) => {
        const code = err.response.status;
        if (code === 400) {
          toast({
            status: "error",
            description: `삭제되지 않았습니다`,
            position: "bottom",
            duration: 2000,
          });
        }
      })
      .finally();
  }

  return (
    <Box>
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing={4}>
            {question.map((comment) => (
              <Flex
                gap={3}
                key={comment.id}
                isProcessing={isProcessing}
                setIsProcessing={setIsprocessing}
              >
                <input
                  value={comment.userId === 30 ? "관리자" : comment.userId}
                />
                <Input value={comment.content} />
                <Input value={comment.inserted} />
                {/*{account.hasAccess(question.userId) && (*/}
                <>
                  <Button>수정</Button>
                  <Button onClick={handleRemoveClick}>삭제</Button>
                </>
                {/*)}*/}
              </Flex>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}
