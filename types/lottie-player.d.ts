import type { DetailedHTMLProps, HTMLAttributes } from "react";

type LottiePlayerElement = HTMLElement & {
  play: () => void;
  pause: () => void;
  seek: (frame: number) => void;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": DetailedHTMLProps<
        HTMLAttributes<LottiePlayerElement> & {
          src?: string;
          background?: string;
          speed?: string | number;
          loop?: boolean;
          autoplay?: boolean;
        },
        LottiePlayerElement
      >;
    }
  }
}
