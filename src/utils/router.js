import App from "../App";
import AuthorizeReader from "../Components/AuthorizeReader";

export const routers = [
  {
    path: "/",
    element: <App />,
  },
  { path: "/authorize", element: <AuthorizeReader /> },
];
