// eslint-disable-next-line no-restricted-globals
const ctx = self as any;

ctx.addEventListener('message', async () => {
  const data = await fetch('/data/airports.json')
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('get data failed');
    })
    .catch(error => console.log(error));
    ctx.postMessage(data);
})

export { };