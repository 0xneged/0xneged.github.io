export default async function (url: string) {
  await navigator.share?.({
    title: 'get Rich or ger Rekt',
    url,
  })
}
