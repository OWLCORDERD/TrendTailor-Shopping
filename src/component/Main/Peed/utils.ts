const throttle = (
  func: React.MouseEventHandler<HTMLDivElement>,
  ms: number
) => {
  let throttled = false;
  return () => {
    if (!throttle) {
      throttled = true;
      setTimeout(() => {
        func;
        throttled = false;
        console.log(throttled);
      }, ms);
    }
  };
};

export default throttle;
