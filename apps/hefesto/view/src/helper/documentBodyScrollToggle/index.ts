export const documentBodyScrollToggle: (locked: boolean) => void = (
  locked: boolean
) => {
  if (locked) {
    global.window.document.body.style.overflow = "hidden";
  } else {
    global.window.document.body.style.overflow = "initial";
  }
};
