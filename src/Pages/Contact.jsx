import { useState } from "react";
import Hero from "../Components/Hero";
import { heroData } from "../heroData";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState();
  const navigate = useNavigate();

  const fromHandler = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is Required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is Required";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Please enter a valid email address ";
    }
    if (!message) {
      newErrors.message = "Message Cannot be Empty";
      setError(error);
    }
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setSuccessMessage("");
    } else {
      try {
        const response = await fetch("https://formbold.com/s/oavBK", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });
        console.log("this is form res", response);
        if (response.ok) {
          setError({});
          setName("");
          setEmail("");
          setMessage("");
          setSuccessMessage("Form Submited Successfully");
          navigate("/thankyou");
        }
      } catch (error) {
        setSuccessMessage("Something went Wrong");
      }
    }
  };
  return (
    <>
      <Hero data={heroData.contact} />
      {/* contact form */}

      <div className="py-[100px] container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8">
          <h2 className="text-center mb-12">Feel Free to Contact Us</h2>

          {successMessage && <p>{successMessage}</p>}
          <form
            onSubmit={fromHandler}
            className="flex flex-col gap-8 w-full md:w-1/2 sm:w-1/2 lg:w-1/3"
          >
            <div className="relative">
              <p className="absolute bottom-11 text-red-500 text-sm">
                {error.name}
              </p>
              <input
                className={`w-full ${error.name ? "border-red-500" : "border-gray-200"} border  p-2 rounded-sm`}
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative">
              <p className="absolute bottom-10 text-red-500 text-sm">
                {error.email}
              </p>
              <input
                className={`${error.email ? "border-red-500" : "border-gray-200"} w-full border  p-2 rounded-sm`}
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <p className="absolute  top-[-25px] text-red-500 text-sm">
                {error.message}
              </p>
              <textarea
                className={` ${error.message ? "border-red-500" : "border-gray-200"} w-full border  p-2 rounded-sm`}
                name="message"
                rows={5}
                value={message}
                id=""
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <input
              className="bg-orange rounded-sm text-white p-4 uppercase cursor-pointer"
              type="submit"
            />
          </form>
        </div>
      </div>

      {/* map section */}

      <div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15239.228018641355!2d73.3621490627642!3d31.71173908267711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1775635337539!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};
export default Contact;
