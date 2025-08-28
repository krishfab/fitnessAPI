import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; 

const HomeHeader = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/workouts");
  };

  return (
    <section className="home-header d-flex align-items-center">
      <div className="container">
        <div className="row">
          {/* Left Column */}
          <div className="col-12 col-md-6 text-start">
            <h2 className="text-white mb-2">Achieve your</h2>
            <h1 className="text-white mb-2 display-4 display-md-1">Fitness Goals</h1>
            <h2 className="text-white mb-4">With Fitmaker</h2>
            <p className="text-light mb-4">
              Join the Fitmaker Community and transform your fitness journey.
              This app helps you create personalized programs to help you achieve
              your fitness goals. Ready to make a change?
            </p>
            <button className="start-button" onClick={handleStart}>
              Start Your Journey
            </button>
          </div>

          {/* Right Column (blank) */}
          <div className="col-12 col-md-6">
            {/* Empty for design spacing */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeader;
