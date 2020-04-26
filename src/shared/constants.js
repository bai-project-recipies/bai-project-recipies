export const UrlSuffix = 'apiKey=faab0c512e854c5a98f1ee457848e1f3'
const apiKey='faab0c512e854c5a98f1ee457848e1f3'
export const baseRecipiesApiUrl = 'https://api.spoonacular.com/recipes'
export const baseRecipiesApiPhotosUrl = 'https://spoonacular.com/recipeImages/'

export const addParametersToUrl = (url, map) => {
  let result = url
  let isFirstParameter = true
  let char = '?'
  map.forEach((key, value) => {
    if (isFirstParameter) {
      isFirstParameter = false
    } else {
      char = '&'
    }
    result = result.concat(`${char}${key}=${value}`)
  })
  return result.concat(`${char}${UrlSuffix}`)
}

export const getWithEndpoint = (url) => {
  url.searchParams.append('apiKey', apiKey);
  return url
}



