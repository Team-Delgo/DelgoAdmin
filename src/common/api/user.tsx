import axios, { AxiosResponse } from "axios";

async function user(pageParam: number) {
  const pageSize = 5;
  try {
    const res = await axios.get(
      `https://www.test.delgo.pet/api/user/all?currentPage=${pageParam}&pageSize=${pageSize}`
      //pageSize:한페이지에 불러올 데이터 개수, pageParam:현재 페이지
    );
    return res.data;
  } catch (error: any) {
    console.error(error);
  }
}
export default user;
