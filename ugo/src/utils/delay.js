export default function (ms) {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms);
  })
}