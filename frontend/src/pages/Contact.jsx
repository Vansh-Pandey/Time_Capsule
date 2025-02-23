import React from 'react';
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import '../styling/Contact.css';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    alert("Message Sent Successfully!");
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you!</p>
      </header>
      <section className="contact-content">
        <div className="contact-info">
          <div className="info-item"><Mail className="icon" /> <span>vp0158530@gmail.com</span></div>
          <div className="info-item"><Phone className="icon" /> <span>+91 78400 52725</span></div>
          <div className="info-item"><MapPin className="icon" /> <span>B15 , IIT Mandi</span></div>
        </div>
        {/* <div className="contact-form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <input {...register("name", { required: "Name is required" })} type="text" placeholder="Your Name" className="form-input" />
            {errors.name && <p className="error-text">{errors.name.message}</p>}

            <input {...register("email", { required: "Email is required", pattern: { value: /.+@.+\..+/, message: "Enter a valid email" } })} type="email" placeholder="Your Email" className="form-input" />
            {errors.email && <p className="error-text">{errors.email.message}</p>}

            <input {...register("subject", { required: "Subject is required" })} type="text" placeholder="Subject" className="form-input" />
            {errors.subject && <p className="error-text">{errors.subject.message}</p>}

            <textarea {...register("message", { required: "Message is required" })} placeholder="Your Message" className="form-textarea"></textarea>
            {errors.message && <p className="error-text">{errors.message.message}</p>}

            <motion.button type="submit" className="submit-button" whileTap={{ scale: 0.95 }} disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </div> */}
      </section>
      <footer className="contact-footer-2">
        <p>&copy; 2025 Time Capsule. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
