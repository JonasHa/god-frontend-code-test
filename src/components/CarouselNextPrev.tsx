import Image from "next/image";
import { View } from "vcc-ui";

type Props = {
  next: () => void;
  previous: () => void;
  className?: string;
};
const CarouselNextPrev = ({ next, previous, className }: Props) => {
  return (
    <View
      className={className}
      direction="row"
      justifyContent="end"
      extend={{
        padding: "0 12px",
        untilL: {
          display: "none",
        },
      }}
    >
      <View
        as="button"
        extend={{
          transform: "scaleX(-1)",
        }}
        aria-label="Previous item"
        onClick={previous}
      >
        <Image
          width="40"
          height="40"
          src={"/icons/chevron-circled.svg#light-primary"}
          role="presentation"
          unoptimized
          alt=""
        />
      </View>
      <View as="button" aria-label="Next item" onClick={next}>
        <Image
          width="40"
          height="40"
          src={"/icons/chevron-circled.svg#light-primary"}
          role="presentation"
          alt=""
          unoptimized
        />
      </View>
    </View>
  );
};

export default CarouselNextPrev;
