export function debounce(fn: () => void, delay = 200, ...args: any) {
  let timer: number | null = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn.apply(fn, args);
      timer = null;
    }, delay);
  };
}

export function throttle(fn: () => void, delay = 100, ...args: any) {
  let timer: number | null = null;
  return function () {
    if (timer) return;
    timer = window.setTimeout(() => {
      fn.apply(fn, args);
      timer = null;
    }, delay);
  };
}
