import React from "react";

const useReferenceSize = (
  reference: React.RefObject<HTMLElement>
): number[] => {
  const [size, setSize] = React.useState<number[]>([0, 0]);

  React.useLayoutEffect(() => {
    setSize([
      reference.current?.offsetWidth ?? 0,
      reference.current?.offsetHeight ?? 0,
    ]);
  }, []);

  React.useLayoutEffect(() => {
    const updateSize = () => {
      setSize([
        reference.current!.offsetWidth,
        reference.current!.offsetHeight,
      ]);
    };

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export default useReferenceSize;
