import { Text, View, useTheme } from "vcc-ui";
import { Filter } from "../hooks/useCars";

type Props = {
  filters?: Filter[];
  active: string;
  setActive: (val: string) => void;
};

const CarouselFilter = ({ filters, active, setActive }: Props) => {
  const { color } = useTheme();

  if (!filters) return;

  return (
    <View
      direction="row"
      justifyContent="center"
      extend={{ marginBottom: "32px" }}
    >
      {filters
        .filter(({ count }) => count && count > 0)
        .map(({ value, label, count }) => (
          <View
            as="button"
            onClick={() => setActive(value)}
            aria-label="tab"
            type="button"
            key={value}
            extend={{
              margin: "0 0.5rem",
              borderBottom: value === active ? "2px solid" : "none",
            }}
          >
            <Text
              extend={{
                color: color.foreground.secondary,
                textTransform: "capitalize",
              }}
            >
              {label} ({count})
            </Text>
          </View>
        ))}
    </View>
  );
};

export default CarouselFilter;
