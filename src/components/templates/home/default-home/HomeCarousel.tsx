import { Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Cooking from "../../../../assets/cooking.jpg";
import Electrical from "../../../../assets/electrical.jpg";
import Education from "../../../../assets/education.png";

const carouselImages = [Cooking, Education, Electrical];

const HomeCarousel = () => {
  return (
    <Carousel>
      {carouselImages.map((img, i) => (
        <Item key={i} imageUrl={img} />
      ))}
    </Carousel>
  );
};

function Item(props: any) {
  return (
    <Paper>
      <div style={{ height: "450px" }}>
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "45% 25%",
          }}
          src={props.imageUrl}
          alt="carousel"
          className="carousel-img"
        />
      </div>
    </Paper>
  );
}

export default HomeCarousel;
