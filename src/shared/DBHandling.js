import axios from "axios"
export const dbCorsKey = '5e98b2d4436377171a0c24a1'
export const dbTableUrl = 'https://bai2020-dca5.restdb.io/rest/recipies'

let headers = {
  "content-type": "application/json",
  "x-apikey": dbCorsKey,
  "cache-control": "no-cache",
}


export const getLikes = (recipe_id) => {
  let url = new URL(dbTableUrl + `?q={"recipe_id": ${recipe_id}}`);
  return axios.get(url=url, {headers: headers})
    .then(response => {
      if(response.data.length == 0){
        return 0;
      }else{
        return response.data[0].likes;
      }
    });
}

export const setLikes = (recipe_id, likes) => {
  let url = new URL(dbTableUrl + `?q={"recipe_id": ${recipe_id}}`);
  return axios.get(url=url, {headers: headers})
    .then(response => {
      if(response.data.length == 0){
        axios({
          method: 'post',
          url: new URL(dbTableUrl),
          headers: headers,
          data: {
            "recipe_id": recipe_id,
            "likes": likes
          }
        })
        return likes;
      }else{
        axios({
          method: 'put',
          url: new URL(dbTableUrl + `/${response.data[0]._id}`),
          headers: headers,
          data: {
            "likes": likes
          }
        })
        return likes;
      }
    });
}