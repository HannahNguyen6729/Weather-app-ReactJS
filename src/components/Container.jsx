import React from "react";
import Card from "./Card";

export default function Container() {
  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-3 col-sm-2"></div>
        <div className="col-lg-4 col-sm-8 col-md-6">
          <Card />
        </div>
        <div className="col-lg-4 col-md-3 col-sm-2">
          <div className=" d-flex justify-content-end">
            <div className="w-25">
              <a
                href="http://www.accuweather.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="img-fluid"
                  src={require("../../src/img/logo.png")}
                  alt="logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
