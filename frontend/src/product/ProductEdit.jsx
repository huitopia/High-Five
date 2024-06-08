import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function ProductEdit() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [filePreView, setFilePreView] = useState([]);
  const [file, setFile] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => {
      const copyProduct = res.data;
      setProduct(copyProduct);
      setFilePreView(copyProduct.productFileList);
    });
  }, []);

  if (product === null) {
    return <Spinner />;
  }

  function handleChangeFiles(e) {
    const fileView = e.target.files;
    setFile(fileView);

    if (fileView) {
      setFilePreView(
        Array.from(fileView).map((file) => URL.createObjectURL(file)),
      );
    } else {
      setFilePreView(product.productFileList);
    }
  }

  return (
    <Box>
      <Box>
        <Flex>
          <Center>
            {/*{filePreView.map((src, index) => (*/}
            {/*  <Image key={index} boxSize={"180px"} src={src} mr={2} />*/}
            {/*))}*/}
            {product.productFileList &&
              product.productFileList.map((file) => (
                <Box boxSize={"180px"} key={file.fileName}>
                  <Image boxSize={"150px"} src={file.filePath} mr={2} />
                </Box>
              ))}
          </Center>
        </Flex>
        <FormControl>
          <FormLabel>상품 이미지</FormLabel>
          <Input
            type={"file"}
            multiple
            accept={"image/*"}
            onChange={handleChangeFiles}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input value={product.title} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>카테고리</FormLabel>
          <Select value={product.category} placeholder="카테고리 선택">
            <option value="clothes">의류</option>
            <option value="goods">잡화</option>
            <option value="food">식품</option>
            <option value="digital">디지털</option>
            <option value="sport">스포츠</option>
            <option value="e-coupon">e-쿠폰</option>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>입찰 시작가</FormLabel>
          <Input value={product.startTime} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>입찰 마감 시간</FormLabel>
          <Input value={product.endTime} type={"datetime-local"} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>상품 상세내용</FormLabel>
          <Textarea
            value={product.content}
            whiteSpace={"pre-wrap"}
            placeholder={"상품에 대한 정보 작성해주세요."}
          />
        </FormControl>
      </Box>
      <Box>
        <Button>수정</Button>
        <Button>삭제</Button>
      </Box>
    </Box>
  );
}
