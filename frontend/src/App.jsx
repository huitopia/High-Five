import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./Home.jsx";
import { ProductList } from "./product/ProductList.jsx";
import { ProductUpload } from "./product/ProductUpload.jsx";
import { MainProduct } from "./product/MainProduct.jsx";
import { ProductEdit } from "./product/ProductEdit.jsx";
import { ProductDetails } from "./product/ProductDetails.jsx";
import { SignUp } from "./user/SignUp.jsx";
import { Login } from "./user/Login.jsx";
import { LoginProvider } from "./component/LoginProvider.jsx";
import axios from "axios";
import { BoardWrite } from "./board/BoardWrite.jsx";
import { BoardList } from "./board/BoardList.jsx";
import { BoardView } from "./board/BoardView.jsx";
import { BoardModify } from "./board/BoardModify.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChatRoom } from "./chat/ChatRoom.jsx";
import { QuestionWrite } from "./Question/QuestionWrite.jsx";
import { QuestionList } from "./Question/QuestionList.jsx";
import { QuestionView } from "./Question/QuestionView.jsx";
import { QuestionEdit } from "./Question/QuestionEdit.jsx";
import { MyPage } from "./myPage/MyPage.jsx";
import { ProductShop } from "./product/ProductShop.jsx";
import { UserEdit } from "./myPage/UserEdit.jsx";
import { UserInfo } from "./myPage/UserInfo.jsx";
import { UserList } from "./user/UserList.jsx";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      //   product
      { index: true, element: <MainProduct /> },
      { path: "write", element: <ProductUpload /> },
      { path: "list", element: <ProductList /> },
      { path: "edit/:id", element: <ProductEdit /> },
      { path: "product/:id", element: <ProductDetails /> },

      // user
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "user/list", element: <UserList /> },

      //question
      { path: "question/write", element: <QuestionWrite /> },
      { path: "question/list", element: <QuestionList /> },
      { path: "question/:id", element: <QuestionView /> },
      { path: "question/edit/:id", element: <QuestionEdit /> },

      //board
      { path: "board", element: <BoardWrite /> },
      { path: "board/list", element: <BoardList /> },
      { path: "board/:board_id", element: <BoardView /> },
      { path: "board/modify/:board_id", element: <BoardModify /> },

      //my page
      { path: "myPage/:userId", element: <Navigate to="info" /> },
      // { path: "shop/:userId/products", element: <MyPage /> },
      // { path: "myPage/:userId/info", element: <MyPage tab="info" /> },
      { path: "shop/:userId/userInfo", element: <UserInfo /> },
      { path: "shop/:userId/userEdit", element: <UserEdit /> },
      { path: "myPage/:userId/like", element: <MyPage tab="like" /> },
      { path: "myPage/:userId/shop", element: <MyPage tab="shop" /> },
      { path: "myPage/:userId/bids", element: <MyPage tab="bids" /> },
      { path: "myPage/:userId/reviews", element: <MyPage tab="reviews" /> },

      //채팅방
      { path: "chat/:product_id", element: <ChatRoom /> },
    ],
  },
]);

function App() {
  return (
    <LoginProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </LoginProvider>
  );
}

export default App;
