import React, { useState } from "react";
import { db } from "../firebase/config";
import { ref, push } from "firebase/database";

const MainPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    experience: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate form data before submission
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Add timestamp and status to the form data
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        status: "pending",
      };

      // Create reference to the guideApplications node
      const guideApplicationsRef = ref(db, "guideApplications");

      // Attempt to write data
      await push(guideApplicationsRef, submissionData);

      // If successful, show success message
      alert("Application submitted successfully!");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        experience: "",
      });
    } catch (error) {
      setError(error);
      console.error("Error submitting form:", error);

      // Handle specific error types
      switch (error.code) {
        case "PERMISSION_DENIED":
          alert("Access denied. Please try again later.");
          break;
        case "NETWORK_ERROR":
          alert("Network error. Please check your connection.");
          break;
        default:
          alert("An error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article>
      <section class="hero" id="home">
        <div class="container">
          <h2 class="h1 hero-title">
            A personalize journey for you and your accompany
          </h2>

          <p class="hero-text">
            Wanna go for a trip with maximum personalization? We are here to
            help you.
          </p>
        </div>
      </section>

      <section class="popular" id="destination">
        <div class="container">
          <p class="section-subtitle">Uncover place</p>

          <h2 class="h2 section-title">Popular destination</h2>

          <p class="section-text">
            Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec
            nemo, rutrum. Vestibulum cumque laudantium. Sit ornare mollitia
            tenetur, aptent.
          </p>

          <ul class="popular-list">
            <li>
              <div class="popular-card">
                <figure class="card-img">
                  <img
                    src="https://image.vietnamnews.vn/uploadvnnews/Article/2021/4/28/149954_3888583451742356_haivanpass.jpg"
                    alt="San miguel, italy"
                    loading="lazy"
                  />
                </figure>

                <div class="card-content">
                  <div class="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>

                  <p class="card-subtitle">
                    <a href="#">Đa Nang</a>
                  </p>

                  <h3 class="h3 card-title">
                    <a href="#">Hai Van Pass</a>
                  </h3>

                  <p class="card-text">
                    Stunning views and a thrilling ride through the mountains.{" "}
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div class="popular-card">
                <figure class="card-img">
                  <img
                    src="https://vietnam.travel/sites/default/files/inline-images/782A2680_resize.jpg"
                    alt="Burj khalifa, dubai"
                    loading="lazy"
                  />
                </figure>

                <div class="card-content">
                  <div class="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>

                  <p class="card-subtitle">
                    <a href="#">Quang Ninh</a>
                  </p>

                  <h3 class="h3 card-title">
                    <a href="#">Ha Long bay</a>
                  </h3>

                  <p class="card-text">
                    Explore majestic limestone islands and emerald waters.
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div class="popular-card">
                <figure class="card-img">
                  <img
                    src="https://www.vietnambooking.com/wp-content/uploads/2023/08/dia-danh-viet-nam-2.jpg"
                    alt="Kyoto temple, japan"
                    loading="lazy"
                  />
                </figure>

                <div class="card-content">
                  <div class="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>

                  <p class="card-subtitle">
                    <a href="#">Ha Giang</a>
                  </p>

                  <h3 class="h3 card-title">
                    <a href="#">Terraced fields</a>
                  </h3>

                  <p class="card-text">
                    Witness stunning rice terraces carved into the mountains.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section class="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/YLuRbwYDY9Y?controls=0&showinfo=0&rel=0&modestbranding=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </section>

      <section class="package" id="package">
        <div class="container">
          <p class="section-subtitle">Local tour guiders</p>

          <h2 class="h2 section-title">Our top tour guiders..</h2>

          <p class="section-text">
            Meet our top-rated local tour guides who are passionate about
            sharing their knowledge and love for their hometowns. Whether you're
            exploring bustling cities or tranquil countryside, our guides will
            ensure you have an authentic and memorable experience. Get to know
            them below:
          </p>
          <ul class="guider-list">
            <li>
              <div class="guider-card">
                <figure class="card-img2">
                  <img
                    src="https://vnn-imgs-f.vgcloud.vn/2021/03/01/17/giai-phap-tang-chat-luong-hoc-truc-tuyen-cho-tre-tieu-hoc-7.jpg"
                    alt="Tour Guider 1"
                    loading="lazy"
                  />
                </figure>
                <div class="card-content">
                  <h3 class="h3 card-title">Tan dinh nguyen</h3>
                  <p class="card-text">Local businessman.</p>
                </div>
              </div>
            </li>
            <li>
              <div class="guider-card">
                <figure class="card-img2">
                  <img
                    src="https://tinhdoan.caobang.gov.vn/uploads/news/2023_05/nu-sinh-vien-nguoi-san-diu-het-minh-voi-mau-ao-xanh.jpg"
                    alt="Tour Guider 2"
                    loading="lazy"
                  />
                </figure>
                <div class="card-content">
                  <h3 class="h3 card-title">Nguyen Cao Mai</h3>
                  <p class="card-text">A sophomore from Ha Noi University.</p>
                </div>
              </div>
            </li>
            <li>
              <div class="guider-card">
                <figure class="card-img2">
                  <img
                    src="https://media.truyenhinhdulich.vn/upload/news/6_2019/288850c61254e65daa1f347ff7994263.jpg"
                    alt="Tour Guider 3"
                    loading="lazy"
                  />
                </figure>
                <div class="card-content">
                  <h3 class="h3 card-title">Tour guider: Le Huy Phu</h3>
                  <p class="card-text">Local Uber driver.</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section class="package" id="package">
        <div class="container">
          <p class="section-subtitle">Sample tour</p>

          <h2 class="h2 section-title">Checkout Our Tours</h2>

          <p class="section-text">
            Check in our exclusive tour packages designed to provide you with
            unforgettable experiences. Whether you're seeking adventure,
            relaxation, or cultural immersion, we have the perfect tour for you.
          </p>

          <ul class="package-list">
            <li>
              <div class="package-card">
                <figure class="card-banner">
                  <img
                    src="../images/packege-1.jpg"
                    alt="Experience The Great Holiday On Beach"
                    loading="lazy"
                  />
                </figure>

                <div class="card-content">
                  <h3 class="h3 card-title">NHA TRANG PARADISE GETAWAY</h3>

                  <p class="card-text">
                    Discover the beauty of Nha Trang, the jewel of Vietnam's
                    coastline. Immerse yourself in crystal-clear waters, explore
                    stunning islands, and relax on golden beaches. This 7-day
                    trip offers the perfect blend of adventure and leisure with
                    island-hopping tours, cultural excursions, and time to
                    unwind in world-class resorts.
                  </p>

                  <ul class="card-meta-list">
                    <li class="card-meta-item">
                      <div class="meta-box">
                        <ion-icon name="time"></ion-icon>

                        <p class="text">7D/6N</p>
                      </div>
                    </li>

                    <li class="card-meta-item">
                      <div class="meta-box">
                        <ion-icon name="people"></ion-icon>

                        <p class="text">pax: 10</p>
                      </div>
                    </li>

                    <li class="card-meta-item">
                      <div class="meta-box">
                        <ion-icon name="location"></ion-icon>

                        <p class="text">Malaysia</p>
                      </div>
                    </li>
                  </ul>
                  <div class="tour-guide">
                    <img
                      src="https://vnn-imgs-f.vgcloud.vn/2021/03/01/17/giai-phap-tang-chat-luong-hoc-truc-tuyen-cho-tre-tieu-hoc-7.jpg"
                      alt="Tour Guide"
                      class="tour-guide-avatar"
                    />
                    <p class="tour-guide-name">Tour guider: Tan Dinh Nguyen</p>
                  </div>
                </div>

                <div class="card-price">
                  <div class="wrapper">
                    <p class="reviews">(25 reviews)</p>

                    <div class="card-rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </div>

                  <p class="price">
                    550.000VND
                    <span>/ per person</span>
                  </p>

                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#bookNowModal"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </li>

            <li>
              <div class="package-card">
                <figure class="card-banner">
                  <img
                    src="https://mia.vn/media/uploads/blog-du-lich/den-dat-cang-dung-bo-qua-top-18-diem-du-lich-hai-phong-tuyet-dep-phan-1-5-1647973371.jpg"
                    alt="Summer Holiday To The Oxolotan River"
                    loading="lazy"
                  />
                </figure>

                <div class="card-content">
                  <h3 class="h3 card-title">HAI PHONG CULTURAL JOURNEY</h3>

                  <p class="card-text">
                    Dive into the rich history and breathtaking landscapes of
                    Hai Phong on this 4-day adventure. Explore the ancient
                    pagodas, marvel at the natural beauty of the region, and
                    experience the local culture with your expert guide. This
                    trip is perfect for travelers looking to immerse themselves
                    in Vietnam's heritage while enjoying modern comforts.
                  </p>

                  <ul class="card-meta-list">
                    <li class="card-meta-item">
                      <div class="meta-box">
                        <ion-icon name="time"></ion-icon>

                        <p class="text">4D/3N</p>
                      </div>
                    </li>

                    <li class="card-meta-item">
                      <div class="meta-box">
                        <ion-icon name="people"></ion-icon>

                        <p class="text">pax: 10</p>
                      </div>
                    </li>

                    <li class="card-meta-item">
                      <div class="meta-box">
                        <ion-icon name="location"></ion-icon>

                        <p class="text">Malaysia</p>
                      </div>
                    </li>
                  </ul>
                  <div class="tour-guide">
                    <img
                      src="https://media.truyenhinhdulich.vn/upload/news/6_2019/288850c61254e65daa1f347ff7994263.jpg"
                      alt="Tour Guide"
                      class="tour-guide-avatar"
                    />
                    <p class="tour-guide-name">Tour guider: Le Huy Phu</p>
                  </div>
                </div>

                <div class="card-price">
                  <div class="wrapper">
                    <p class="reviews">(20 reviews)</p>

                    <div class="card-rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </div>

                  <p class="price">
                    520.000VND
                    <span>/ per person</span>
                  </p>

                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#bookNowModal"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </li>

            <li>
              <div class="package-card">
                <figure class="card-banner">
                  <img
                    src="https://vietnam.travel/sites/default/files/inline-images/One%20Pillar%20Pagoda%20Hanoi.jpg"
                    alt="Santorini Island's Weekend Vacation"
                    loading="lazy"
                  />
                </figure>

                <div class="card-content">
                  <h3 class="h3 card-title">HANOI HERITAGE ADVENTURE</h3>

                  <p class="card-text">
                    Experience the charm of Vietnam's capital, Hanoi, with a
                    7-day journey through its vibrant streets, historic
                    landmarks, and serene temples. Visit the iconic Old Quarter,
                    enjoy authentic Vietnamese cuisine, and learn about the
                    city's fascinating history. With guided tours and free time
                    to explore on your own, this trip offers the perfect mix of
                    structure and spontaneity.
                  </p>

                  <ul class="card-meta-list">
                    <li class="card-meta-item">
                      <div class="meta-box">
                        <ion-icon name="time"></ion-icon>

                        <p class="text">7D/6N</p>
                      </div>
                    </li>

                    <li class="card-meta-item">
                      <div class="meta-box">
                        <ion-icon name="people"></ion-icon>

                        <p class="text">pax: 10</p>
                      </div>
                    </li>

                    <li class="card-meta-item">
                      <div class="meta-box">
                        <ion-icon name="location"></ion-icon>

                        <p class="text">Malaysia</p>
                      </div>
                    </li>
                  </ul>
                  <div class="tour-guide">
                    <img
                      src="https://tinhdoan.caobang.gov.vn/uploads/news/2023_05/nu-sinh-vien-nguoi-san-diu-het-minh-voi-mau-ao-xanh.jpg"
                      alt="Tour Guide"
                      class="tour-guide-avatar"
                    />
                    <p class="tour-guide-name">Tour guider: Nguyen Cao Mai</p>
                  </div>
                </div>

                <div class="card-price">
                  <div class="wrapper">
                    <p class="reviews">(40 reviews)</p>

                    <div class="card-rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </div>

                  <p class="price">
                    580.000VND
                    <span>/ per person</span>
                  </p>

                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#bookNowModal"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </li>
          </ul>

          <button class="btn btn-primary">View All Packages</button>
        </div>
      </section>

      <section class="gallery" id="gallery">
        <div class="container">
          <p class="section-subtitle">Photo Gallery</p>

          <h2 class="h2 section-title">Photo's From Travellers</h2>

          <p class="section-text">
            Explore the world through the eyes of our travelers. From
            breathtaking landscapes to vibrant cityscapes, our photo gallery
            showcases the unforgettable moments captured during their journeys.
            Get inspired and start planning your next adventure with us!
          </p>

          <ul class="gallery-list">
            <li class="gallery-item">
              <figure class="gallery-image">
                <img src={require("../images/gallery-1.jpg")} alt="Gallery " />
              </figure>
            </li>

            <li class="gallery-item">
              <figure class="gallery-image">
                <img src={require("../images/gallery-2.jpg")} alt="Gallery " />
              </figure>
            </li>

            <li class="gallery-item">
              <figure class="gallery-image">
                <img src={require("../images/gallery-3.jpg")} alt="Gallery " />
              </figure>
            </li>

            <li className="gallery-item">
              <figure className="gallery-image">
                <img
                  src={require("../images/gallery-4.jpg")}
                  alt="Gallery image"
                />
              </figure>
            </li>

            <li className="gallery-item">
              <figure className="gallery-image">
                <img
                  src={require("../images/gallery-5.jpg")}
                  alt="Gallery image"
                />
              </figure>
            </li>
          </ul>
        </div>
      </section>

      <section className="become-guide" id="become-guide">
        <div className="container">
          <p className="section-subtitle">Join Our Team</p>

          <h2 className="h2 section-title">Become a Tour Guide</h2>

          <p className="section-text">
            Are you passionate about sharing your local knowledge and culture?
            Join our team of experienced tour guides and help create
            unforgettable experiences for travelers from around the world.
          </p>

          <form className="guide-application-form" onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error.message}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                <select
                  id="city"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Your City</option>
                  <option value="hanoi">Hanoi</option>
                  <option value="ho-chi-minh">Ho Chi Minh City</option>
                  <option value="da-nang">Da Nang</option>
                  <option value="hoi-an">Hoi An</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Tell us about your experience and why you'd make a great tour guide"
                required
                className="form-control"
                rows="4"
              ></textarea>
            </div>

            <div className="form-group submit-group">
              <button
                type="submit"
                className={`btn btn-primary submit-button ${
                  isSubmitting ? "submitting" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section class="cta" id="contact">
        <div class="container">
          <div class="cta-content">
            <p class="section-subtitle">Call To Action</p>

            <h2 class="h2 section-title">
              Ready For Unforgatable Travel. Remember Us!
            </h2>

            <p class="section-text">
              Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec
              nemo, rutrum. Vestibulum cumque laudantium. Sit ornare mollitia
              tenetur, aptent.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default MainPage;
