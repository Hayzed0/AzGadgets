import React from "react";
import clearance from "../assets/clearance-deal.avif";
import samsung from "../assets/samsung-banner.avif";
import ipadAir from "../assets/banner-ipad.avif";
import nintendo from "../assets/banner-nitendo.avif";
import { Helmet } from "react-helmet";

const Banner = () => {
  return (
    <>
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={clearance}
          type="image/avif"
          fetchpriority="high"
        />
      </Helmet>

      <section className="flex flex-col mt-4 p-2">
        <div className="flex flex-col items-center gap-6 justify-between md:flex-row">
          <div className="flex w-full h-60 md:h-90 lg:h-auto">
            <img
              src={clearance}
              alt="Clearance sales banner"
              className="h-auto w-full rounded-lg"
              loading="eager"
              fetchpriority="high"
            />
          </div>
          <div className="flex w-full h-60 md:h-90 lg:h-auto">
            <img
              src={samsung}
              alt="Samsung Deal Banner"
              className="h-auto w-full rounded-lg"
              loading="eager"
            />
          </div>
          <div className="flex w-full h-60 md:h-90 lg:h-auto">
            <img
              src={ipadAir}
              alt="IpadAir banner"
              className="h-auto w-full rounded-lg"
              loading="eager"
            />
          </div>
        </div>
        <div className="mt-8">
          <img src={nintendo} alt="nintendo" loading="eager" fetchpriority="high"/>
        </div>
      </section>
    </>
  );
};

export default Banner;
