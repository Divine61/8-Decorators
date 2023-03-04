//Задача № 1
function cachingDecoratorNew(func) {
  let cache = [];
  function wrapper(...args) {
    const hash = md5(args);
    let objectInCache = cache.find( item => item.hash === hash);
    if (objectInCache) {
      return `Из кэша: ${objectInCache.value}`;
    }
    let result = func(...args);
    cache.push({"hash": hash, "value": result});
    if (cache.length > 5) {
      cache.shift();
    }
    return `Вычисляем: ${result}`;
  }
  return wrapper;
}
// Без MD5
// function cachingDecoratorNew(func) {
//   let cache = {};
//   return (...args) => {
//     const hash = args.join(`,`);
//     let cacheKeys = Object.keys(cache);
//     if (cacheKeys.length > 5) {
//       delete cache[cacheKeys[0]];
//     }
//     if (hash in cache) {
//       return `Из кэша: ${cache[hash]}`;
//     }
//     const result = func(...args);
//     cache[hash] = result;
//     return `Вычисляем: ${result}`;
//   }
// }

//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId;
  let isTrottled = false;
  function wrapper(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout( () => {
      func(args);
      wrapper.count++;
    }, delay);
    if (!isTrottled) {
      func(...args);
      wrapper.count++;
      isTrottled = true;
    }
    wrapper.allCount++;
  }
  wrapper.count = 0;
  wrapper.allCount = 0;
  return wrapper;
}