import axios, { AxiosResponse } from "axios";

async function userOne(userId: string) {
  try {
    const res = await axios.get(
      `https://admin.delgo.pet/api/user?userId=${userId}`
      //size:한페이지에 불러올 데이터 개수, page:현재 페이지
    );
    return res.data;
  } catch (error: any) {
    console.error(error);
  }
}
export default userOne;
