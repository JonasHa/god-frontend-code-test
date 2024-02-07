import Image from "next/image";
import { View } from "vcc-ui";
import styles from "./CarouselNextPrev.module.css";

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
      <button
        className={`${styles.toggler} ${styles.togglerPrevious}`}
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
      </button>
      <button className={styles.toggler} aria-label="Next item" onClick={next}>
        <Image
          width="40"
          height="40"
          src={"/icons/chevron-circled.svg#light-primary"}
          role="presentation"
          alt=""
          unoptimized
        />
      </button>
    </View>
  );
};

export default CarouselNextPrev;
