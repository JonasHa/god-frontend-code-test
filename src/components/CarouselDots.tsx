import { View } from "vcc-ui";

type Props = {
  currentIndex: number;
  indexes: number[];
  className?: string;
};
const CarouselDots = ({ indexes, currentIndex, className }: Props) => {
  if (!indexes) return null;

  return (
    <View
      direction="row"
      justifyContent="center"
      extend={{
        fromL: {
          display: "none",
        },
      }}
    >
      {indexes.map((index) => (
        <View key={index}>
          <View
            extend={{
              backgroundColor:
                index === currentIndex
                  ? "rgba(0, 0, 0, 0.96)"
                  : "rgb(235, 235, 235)",
              height: 8,
              width: 8,
              margin: "0px 4px",
              borderRadius: "100%",
            }}
          ></View>
        </View>
      ))}
    </View>
  );
};

export default CarouselDots;
