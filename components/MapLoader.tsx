import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

const MapLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={460}
      viewBox="0 0 400 350"
      backgroundColor="#FF9C01"
      foregroundColor="#ecebeb"
    >
      <Rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
    </ContentLoader>
  );
};

export default MapLoader;
