import React, { useEffect } from "react";

const GoogleAd = ({ dataAdSlot }) => {
  useEffect(() => {
    try {
      // Push the ad to the adsbygoogle array to load it
      console.debug("GoogleAd: inserting ad slot", dataAdSlot);
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.debug("GoogleAd: pushed to adsbygoogle", !!window.adsbygoogle);
    } catch (e) {
      console.error("Error loading AdSense ad:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-2521856853254381"
      data-ad-slot={dataAdSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default GoogleAd;
