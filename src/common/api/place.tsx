import axios from "axios";

async function place(page: number, category: string) {
  const size = 5;
  try {
    const res = await axios.get(
      `https://admin.delgo.pet/api/mungple/category?categoryCode=${category}&isActive=${false}&page=${page}&size=${size}`
      //size:한페이지에 불러올 데이터 개수, page:현재 페이지
    );
    // console.log("pageNumber:" + page);
    return res.data;
  } catch (error: any) {
    console.error(error);
  }
}
async function placeOne(search: string, page: number) {
  const size = 5;
  try {
    const res = await axios.get(
      `https://admin.delgo.pet/api/mungple/search?keyword=${search}&page=${page}&size=${size}`
    );
    return res.data;
  } catch (error: any) {
    console.error(error);
  }
}

async function placeDelete(mungpleId: string) {
  try {
    const res = await axios.delete(
      `https://admin.delgo.pet/api/mungple/${mungpleId}`
    );
    return res.data;
  } catch (error: any) {
    console.error(error);
  }
}
async function placePhoto(mungpleId: string, formData: FormData) {
  try {
    await axios.put(`/api/mungple/thumbnail/${mungpleId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Thumbnail updated successfully");
  } catch (error: any) {
    console.error(error);
  }
}

export { place, placeOne, placeDelete, placePhoto };
