import Image from 'next/image';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <section className="relative bg-gray-50 py-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="bg-gradient-to-r from-green-100 to-transparent opacity-30 clip-path-hexagon"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl font-extrabold text-gray-800 md:text-6xl"
            data-aos="fade-up"
          >
            About Us
          </h2>
          <p
            className="text-gray-600 mt-4 text-lg md:text-xl max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Discover more about our bookstore, our mission, and our team.
          </p>
        </div>

        {/* Introduction Section */}
        <div className="mb-16 text-center" data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-4xl font-semibold text-green-700">Who We Are</h3>
          <p className="mt-4 text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
            Welcome to our online bookstore, your number one source for all genres of books. We're committed to providing the best book shopping experience with a focus on customer service, accessibility, and a vast selection of literature.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16 flex flex-col lg:flex-row items-center lg:items-start">
          <div className="lg:w-1/2 mb-8 lg:mb-0" data-aos="fade-right">
            <Image
              src="/abb.jpeg"
              alt="Our Bookstore"
              width={600}
              height={400}
              className="rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-8" data-aos="fade-left">
            <h3 className="text-4xl font-semibold text-green-700">Our Mission</h3>
            <p className="mt-4 text-gray-700 text-lg md:text-xl">
              Our mission is to cultivate a love of reading by offering a diverse selection of books, from timeless classics to contemporary works. We aim to connect readers with books that inspire, inform, and entertain.
            </p>
          </div>
        </div>

        <div className="mb-16 text-center" data-aos="fade-up">
          <h3 className="text-4xl font-semibold text-green-700">Our Values</h3>
          <ul className="mt-6 list-disc list-inside text-gray-700 text-lg md:text-xl max-w-2xl mx-auto space-y-3">
            <li>Providing excellent customer service</li>
            <li>Offering a wide variety of books from all genres</li>
            <li>Supporting independent authors and publishers</li>
            <li>Creating a space where all readers feel welcome</li>
          </ul>
        </div>

        {/* Team Section */}
        <div className="mb-16 text-center">
          <h3 className="text-4xl font-semibold text-green-700" data-aos="fade-up">
            Meet Our Team
          </h3>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Team Member 1 */}
            <div className="flex flex-col items-center text-center transition-transform transform hover:scale-105">
              <div className="w-40 h-40 relative">
                <Image
                  src="/ab.jpg"
                  alt="Abakarcody"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-green-700 shadow-lg"
                />
              </div>
              <h4 className="mt-4 font-semibold text-lg text-gray-800">Abakarcody</h4>
              <p className="text-gray-600">Founder & CEO</p>
            </div>

            {/* New Team Member: Abakar */}
            <div className="flex flex-col items-center text-center transition-transform transform hover:scale-105">
              <div className="w-40 h-40 relative">
                <Image
                  src="/saman.jpg"
                  alt="salmandotweb"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-green-700 shadow-lg"
                />
              </div>
              <h4 className="mt-4 font-semibold text-lg text-gray-800">salmandotweb</h4>
              <p className="text-gray-600">Co-Founder</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center" data-aos="fade-up">
          <h3 className="text-4xl font-semibold text-green-700">Get in Touch</h3>
          <p className="mt-6 text-gray-700 text-lg md:text-xl max-w-xl mx-auto">
            Have questions? Contact us at <a href="mailto:support@bookstore.com" className="text-green-600 hover:underline">support@bookstore.com</a> or call us at <span className="text-green-600">0315-4195240</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
