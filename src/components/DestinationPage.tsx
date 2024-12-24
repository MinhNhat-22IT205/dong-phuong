import React from "react";
import DestinationList from "./DestinationList";

const DestinationPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="bg-cover bg-center flex items-center justify-center text-white bg-black bg-opacity-70 bg-blend-overlay min-h-[400px] pt-[125px] text-center"
        style={{
          backgroundImage: `url(${require("../images/hero-banner.jpg")})`,
        }}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Explore Our Destinations</h1>
          <p className="text-xl">
            Discover amazing places and create unforgettable memories
          </p>
        </div>
      </section>

      <DestinationList />
    </main>
  );
};

export default DestinationPage;
