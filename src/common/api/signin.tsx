import axios, { AxiosResponse } from "axios";

function signin(
  data: { email: string; password: string },
  success: (data: AxiosResponse) => void
) {
  axios
    .post(`https://www.test.delgo.pet/login`, {
      email: data.email,
      password: data.password,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export default signin;
