export const  nextPrime =(n)=> {
  function isPrime(x) {
    if (x < 2) return false;
    for (let i = 2; i * i <= x; i++) {
      if (x % i === 0) return false;
    }
    return true;
  }

  let p = n + 1;
  while (!isPrime(p)) p++;
  return p;
}
