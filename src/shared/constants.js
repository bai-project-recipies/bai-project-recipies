export const UrlSuffix = 'apiKey=f67dc8adad4d4e8b8ff7900faa341342'
const apiKey='f67dc8adad4d4e8b8ff7900faa341342'
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



