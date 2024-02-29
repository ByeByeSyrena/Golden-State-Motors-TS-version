import React from "react";
import css from "./WelcomePage.module.css";
import { Link } from "react-router-dom";
import { selectOverallIsLoading } from "../../redux/catalog/selectors";
import { Loader } from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import { Show } from "../../components/ServiceComponents/Show";

const WelcomePage = () => {
  const isLoading = useSelector(selectOverallIsLoading);

  return (
    <>
      <section className={css.section}>
        <div className={css.container}>
          <Show>
            <Show.When isTrue={isLoading}>
              <Loader />
            </Show.When>
            <Show.Else>
              <div className={css.layout}>
                <img
                  className={css.image}
                  src={require("../../images/pexels-hamann-la-1131575.jpg")}
                  alt="car"
                />
                <div>
                  <h1 className={css.par}>Golden State Motors</h1>
                  <p className={css.par}>
                    At Golden State Motors, we embody the spirit of the Wild
                    West with a Californian twist! Nestled in the heart of the
                    Golden State, our dealership offers a sun-kissed selection
                    of vehicles as vibrant as the Pacific sunset. From sleek
                    convertibles for cruising down the coast to rugged SUVs
                    built to conquer the Sierra Nevada trails, we've got the
                    perfect ride to match your California dreams. Our team of
                    laid-back experts is here to guide you through the process,
                    ensuring your journey to finding the ultimate wheels is as
                    smooth as a California breeze. Swing by Golden State Motors
                    and let us help you catch that California vibe on four
                    wheels!
                  </p>
                </div>
                <div>
                  <p className={css.par}>
                    Dive into the vast realm of vehicle variation, where each
                    model boasts its own distinct personality and purpose. From
                    the reliable efficiency of compact cars to the commanding
                    presence of full-size SUVs, there's a vehicle to match every
                    lifestyle and preference. Whether you're navigating city
                    streets with agility or venturing off-road with confidence,
                    the array of options ensures that you'll find the perfect
                    ride to suit your needs. In the world of trucks and pickups,
                    rugged durability meets impressive towing capacity, making
                    them indispensable companions for both work and play. From
                    hauling heavy loads on the job site to towing recreational
                    gear for weekend getaways, these versatile vehicles are
                    designed to tackle any challenge with ease. With advanced
                    technology and innovative features, modern trucks offer a
                    seamless blend of power, comfort, and capability. So, why
                    wait? Take the driver's seat and explore the endless
                    possibilities that await you on the open road. Whether
                    you're upgrading your daily commute or embarking on a new
                    adventure, finding the right vehicle is the first step
                    towards unlocking unforgettable experiences. Visit our
                    dealership today and let us help you find the perfect
                    vehicle to elevate your journey.
                  </p>
                  <Link to="/home" className={css.button}>
                    Go to catalog
                  </Link>
                </div>
                <img
                  className={css.image}
                  src={require("../../images/pexels-neil-kelly-712618.jpg")}
                  alt="car"
                />

                <img
                  className={css.image}
                  src={require("../../images/pexels-charles-kettor-1005162.jpg")}
                  alt="car"
                />
                <div>
                  <p className={css.par}>
                    Choosing a favorite car can be quite subjective, as it often
                    reflects personal tastes, lifestyles, and aspirations. For
                    some, the sleek lines and roaring engines of sports cars
                    like the Lamborghini Aventador ignite a sense of
                    exhilaration and speed, making it a favorite. Its striking
                    design, coupled with unmatched performance, captures the
                    essence of automotive excellence, appealing to those with a
                    passion for adrenaline-fueled adventures on the road. On the
                    other hand, the timeless elegance and luxury of classic cars
                    such as the Rolls-Royce Phantom hold a special place in the
                    hearts of enthusiasts. Its opulent interior, handcrafted
                    details, and whisper-quiet ride evoke a sense of refinement
                    and sophistication, making every journey an indulgent
                    experience fit for royalty. For those who appreciate the
                    finer things in life and seek unparalleled comfort and
                    prestige, the Rolls-Royce Phantom remains an unmatched
                    favorite. Meanwhile, the versatility and ruggedness of
                    off-road vehicles like the Jeep Wrangler resonate with
                    adventure seekers and outdoor enthusiasts alike. With its
                    iconic design, robust construction, and go-anywhere
                    capability, the Jeep Wrangler embodies the spirit of
                    exploration and freedom, allowing drivers to conquer
                    challenging terrain with confidence. Its removable doors and
                    roof offer a unique open-air driving experience, inviting
                    drivers to embrace the thrill of off-road adventures while
                    forging unforgettable memories along the way.
                  </p>
                  <Link to="/favorites" className={css.button}>
                    Go to favorites
                  </Link>
                </div>
              </div>
            </Show.Else>
          </Show>
        </div>
      </section>
    </>
  );
};
export default WelcomePage;
