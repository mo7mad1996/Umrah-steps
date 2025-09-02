import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

interface Options {
  handlers?: string[];
  maxScrollbarLength?: number;
  minScrollbarLength?: number;
  scrollingThreshold?: number;
  scrollXMarginOffset?: number;
  scrollYMarginOffset?: number;
  suppressScrollX?: boolean;
  suppressScrollY?: boolean;
  swipeEasing?: boolean;
  useBothWheelAxes?: boolean;
  wheelPropagation?: boolean;
  wheelSpeed?: number;
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      initPerfectScrollbar: (
        element: HTMLElement,
        options: Options = { suppressScrollX: false }
      ) => {
        if (element) return new PerfectScrollbar(element, options);
      },
    },
  };
});
