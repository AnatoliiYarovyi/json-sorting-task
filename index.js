const axios = require("axios");
const endPoints = require("./endPoints");

let count = 0;
async function getOllData() {
  try {
    const arrIsDone = await getArrIsDone(endPoints);
    const { isTrue, isFalse } = filterIsDone(arrIsDone);
    console.log("значений True: ", isTrue);
    console.log("значений False: ", isFalse);
  } catch (error) {
    if (count < 3) {
      console.log(count);
      getOllData();
      count++;
    }
    if (count === 3) {
      console.log(error);
    }
  }
}

const getArrIsDone = async (type) => {
  const qwe = await Promise.all(
    type.map(async (el) => {
      const zxc = await axios.get(el).then((resp) => {
        if (resp.data.isDone != undefined) {
          return resp.data.isDone;
        } else if (resp.data.location.isDone != undefined) {
          return resp.data.location.isDone;
        } else if (resp.data.higherEducation.isDone != undefined) {
          return resp.data.higherEducation.isDone;
        }
      });
      return await zxc;
    })
  );
  return await qwe;
};
const filterIsDone = (data) => {
  let isTrue = null;
  let isFalse = null;
  data.map((el) => {
    if (el) {
      isTrue++;
    } else {
      isFalse++;
    }
  });
  return { isTrue, isFalse };
};

getOllData();