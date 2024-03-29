import Image from "next/image";
import { Spacer, View } from "vcc-ui";

type Props = {
  next: () => void;
  previous: () => void;
};
const CarouselNextPrev = ({ next, previous }: Props) => {
  return (
    <View
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
      <Spacer size={1} />
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
