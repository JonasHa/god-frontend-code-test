import { StrictMode } from "react";
import { StyleProvider, ThemePicker } from "vcc-ui";
import "../public/css/styles.css";
import { Carousel } from "../src/components/Carousel";
import { useCars } from "../src/hooks/useCars";

function HomePage() {
  const { cars, filters, activeFilter, setActiveFilter } = useCars();

  return (
    <StrictMode>
      <StyleProvider>
        <ThemePicker variant="light">
          <main>
            {cars && (
              <Carousel
                items={cars}
                filters={filters}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
            )}
          </main>
        </ThemePicker>
      </StyleProvider>
    </StrictMode>
  );
}

export default HomePage;
