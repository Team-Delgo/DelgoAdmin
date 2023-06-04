import axios, { AxiosResponse } from "axios";

async function post(page: number) {
  const size = 10;
  try {
    const res = await axios.get(
      `https://admin.delgo.pet/api/certification/all?page=${page}&size=${size}`
      //size:한페이지에 불러올 데이터 개수, page:현재 페이지
    );
    return res.data;
  } catch (error: any) {
    console.error(error);
  }
}
async function postOne(userId: number) {
  try {
    const res = await axios.get(
      `https://admin.delgo.pet/api/certification/all?userId=${userId}`
      //size:한페이지에 불러올 데이터 개수, page:현재 페이지
    );
    return res.data;
    console.log(res.data);
  } catch (error: any) {
    console.error(error);
  }
}
async function postDelete(userId: number) {
  try {
    const res = await axios.delete(
      `https://admin.delgo.pet/api/certification/${userId}`
      //size:한페이지에 불러올 데이터 개수, page:현재 페이지
    );
    return res.data;
  } catch (error: any) {
    console.error(error);
  }
}

export { post, postOne, postDelete };
