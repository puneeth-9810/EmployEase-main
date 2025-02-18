import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './cont.css';

import { Autoplay } from 'swiper/modules';

export default function App() {
  const reviews = [
    {
      text: "EmployEase has made job searching so easy and efficient. The job listings are diverse and the interface is user-friendly.",
      rating: 5,
      reviewer: "Sundar Balakrishnan"
    },
    {
      text: "I was able to land my dream job thanks to the amazing opportunities I found on EmployEase. Highly recommend!",
      rating: 5,
      reviewer: "Vinod Khosla"
    },
    {
      text: "The user interface is very intuitive, and I love the variety of job listings available. Great tool for job seekers!",
      rating: 4,
      reviewer: "Shantanu Narayen"
    },
    {
      text: "EmployEase provided a seamless experience in finding a job. Worth every minute!",
      rating: 5,
      reviewer: "Arvind Krishna"
    },
    {
      text: "A fantastic job portal! The search filters allowed me to find a job that perfectly matched my qualifications.",
      rating: 4,
      reviewer: "Rajeev Suri"
    },
    {
      text: "EmployEase is a game-changer for job applications. The application process is also very convenient.",
      rating: 5,
      reviewer: "Roshni Nadar Malhotra"
    },
    {
      text: "Finding a job has never been easier. EmployEase offers great value and excellent results.",
      rating: 4,
      reviewer: "Padmasree Warrior"
    },
    {
      text: "The customer support is very responsive and helpful. I got quick assistance whenever I needed it.",
      rating: 5,
      reviewer: "Parag Agrawal"
    },
    {
      text: "I love how user-friendly and efficient EmployEase is. It helped me find a job in no time.",
      rating: 5,
      reviewer: "Nikesh Arora"
    }
  ];

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <i key={i} className={`bi bi-star-fill`} style={{color:"gold"}}></i>
    ));
  };

  return (
    <section className="swiper-container">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {reviews.slice(0, 3).map((review, index) => (
          <SwiperSlide key={index}>
            <p>{review.text}</p>
            <div>{renderStars(review.rating)}</div>
            <p>- {review.reviewer}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {reviews.slice(3, 6).map((review, index) => (
          <SwiperSlide key={index}>
            <p>{review.text}</p>
            <div>{renderStars(review.rating)}</div>
            <p>- {review.reviewer}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {reviews.slice(6, 9).map((review, index) => (
          <SwiperSlide key={index}>
            <p>{review.text}</p>
            <div>{renderStars(review.rating)}</div>
            <p>- {review.reviewer}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
