import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const ImageGallery = ({ images }) => {

  return (
    <ImageList
      sx={{ width: "100%", cursor: "pointer",height:500 }}
      variant="quilted"
      cols={4}
      gap={10}
    >

      {
        images ?
          images.map((image, i) => (
            <ImageListItem key={i}>
              <img
                src={`${image}?w=161&fit=crop&auto=format`}
                srcSet={`${image}?w=161&fit=crop&auto=format&dpr=2 2x`}
                alt="textoImagen"
                loading="lazy"
              />
            </ImageListItem>
          )) : null
      }
    </ImageList>
  );
};
export default ImageGallery;
