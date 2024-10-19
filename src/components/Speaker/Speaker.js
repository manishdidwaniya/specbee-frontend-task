import React, { useState } from 'react';
import speakersData from '../../shared/assets/speakers.json'; // Adjust the path based on your file structure
import './Speaker.css';
import { FaLinkedin, FaTwitter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Speaker = () => {
    const [activeSpeaker, setActiveSpeaker] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const speakersCount = speakersData.length;
    const visibleCount = 4;

    const openDetails = (speaker) => {
        setActiveSpeaker(speaker);
    };

    const handleNext = () => {
        if (currentIndex < Math.ceil(speakersCount / visibleCount) - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    return (
        <div className="flex flex-col mt-10 items-center justify-center px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-4 text-center">View our Featured Speakers for the Event</h2>
            <p className="text-gray-600 mb-8 text-center max-w-2xl">
                Speakers are core contributors and industry thought leaders working at
                <span className="text-blue-600 cursor-pointer"> companies </span>
                that push for innovation.
            </p>

            {/* Selected Speaker Details */}
            {activeSpeaker && (
                <div className="relative p-4 rounded-lg w-full max-w-4xl mb-6 shadow-lg">
                    <button
                        className="absolute top-2 right-2 text-gray-500 font-semibold hover:text-gray-700"
                        onClick={() => setActiveSpeaker(null)}
                    >
                        X
                    </button>
                    <div className="flex items-center justify-center space-x-4">
                        <img
                            src={activeSpeaker.image}
                            alt={activeSpeaker.name}
                            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                            <h3 className="text-xl font-bold">{activeSpeaker.name}</h3>
                            <p className="text-gray-600">{activeSpeaker.title}</p>
                            <p className="text-gray-400">{activeSpeaker.company}</p>
                            <div className="flex justify-center space-x-4 mt-4">
                                {activeSpeaker.socials && activeSpeaker.socials.linkedin && (
                                    <a
                                        href={activeSpeaker.socials.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaLinkedin className="text-black hover:text-gray-700" size={20} />
                                    </a>
                                )}
                                {activeSpeaker.socials && activeSpeaker.socials.twitter && (
                                    <a
                                        href={activeSpeaker.socials.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaTwitter className="text-black hover:text-gray-700" size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="border-l border-gray-300 h-40 mx-4"></div>
                        <div className="pr-4">
                            <p className="text-gray-500 mt-2">{activeSpeaker.bio}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Slider Container */}
            <div className="relative flex items-center w-full max-w-4xl">
                {/* Left Arrow Button */}
                <button
                    className={`absolute left-0 transform -translate-x-1/2 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handlePrev}
                    disabled={currentIndex === 0} // Disable button if at the first index
                >
                    <FaChevronLeft size={16} />
                </button>

                {/* Cards */}
                <div className="flex overflow-hidden w-full">
                    <div
                        className="flex shadow-xl transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${(currentIndex * (100 / visibleCount))}%)`,
                            width: `${Math.ceil(speakersCount / visibleCount) * 100}%`,
                        }}
                    >
                        {speakersData.map((speaker) => (
                            <div
                                key={speaker.id}
                                className="bg-white p-4 rounded-lg shadow-xl w-48 md:w-64 cursor-pointer"
                                onClick={() => openDetails(speaker)}
                            >
                                <img
                                    src={speaker.image}
                                    alt={speaker.name}
                                    className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-lg font-semibold text-center">{speaker.name}</h3>
                                <p className="text-gray-600 text-center">{speaker.title}</p>
                                <p className="text-sm text-gray-400 text-center">{speaker.company}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Arrow Button */}
                <button
                    className={`absolute right-0 transform translate-x-1/2 z-10 shadow-lg p-2 rounded-full bg-gray-200 hover:bg-gray-300 ${currentIndex >= Math.ceil(speakersCount / visibleCount) - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleNext}
                    disabled={currentIndex >= Math.ceil(speakersCount / visibleCount) - 1}
                >
                    <FaChevronRight size={16} />
                </button>
            </div>

            {/*See Program Button*/}
            <button className="bg-blue-600 text-white px-6 py-2 mt-8 rounded-md hover:bg-blue-700">
                See the Program
            </button>
        </div>
    );
};

export default Speaker;
