// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Card from '../components/card';
import BWM from '../assets/BWM.png';
import BlueProfessional from '../assets/BlueProfessional.png';
import WhiteGrey from '../assets/WhiteGrey.png';
import BlackModern from '../assets/BlackModern.png';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

const filters = [
  { label: 'All Filters', value: 'all' },
  { label: 'Style', value: 'style' },
  { label: 'Theme', value: 'theme' },
  { label: 'Feature', value: 'feature' },
  { label: 'Price', value: 'price' },
  { label: 'Color', value: 'color' },
];

function Templates() {
  const [selectedFilter, setSelectedFilter] = useState(filters[0].value);
  const [resumes, setResumes] = useState([]);

  const filterResumes = (value) => {
    setSelectedFilter(value);
    if (value === 'all') {
      setResumes(resumeData);
    } else {
      // Implement your filtering logic here based on the value
      // This example filters by name containing the filter value
      const filtered = resumeData.filter((resume) =>
        resume.name.toLowerCase().includes(value.toLowerCase())
      );
      setResumes(filtered);
    }
  };

  const addCard = () => {
    // Implement your logic to add a new card here
    // This example adds a new blank card
    setResumes([...resumes, { name: '', title: '' }]);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-start items-start mb-8 mt-2">
          <select
            className="border rounded-sm px-2 py-1 text-gray-700 focus:outline-none"
            value={selectedFilter}
            onChange={(e) => filterResumes(e.target.value)}
          >
            {filters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col lg:flex-row lg:flex-wrap gap-2 my-4">
          <div
            onClick={addCard}
            className="flex justify-center items-center rounded-lg shadow-md overflow-hidden w-56 mx-auto mb-4 cursor-pointer bg-gray-300"
          >
            <IoMdAddCircleOutline size={80} color="white" />
          </div>
          <Link to="/Templates/Black White Minimalist Resume">
            <Card
              title={'euhf'}
              description={'Black White Minimalist Resume'}
              image={BWM}
            />
          </Link>
          <Link to="/Templates/Minimalist White and Grey Professional Resume">
            <Card
              title={'euhf'}
              description={'Minimalist White and Grey Professional Resume'}
              image={WhiteGrey}
            />
          </Link>
          <Link to="/Templates/Blue Professional Modern Resume">
            <Card
              title={'euhf'}
              description={'Blue Professional Modern Resume'}
              image={BlueProfessional}
            />
          </Link>
          <Link to="/Templates/Black Modern Corporate Resume">
            <Card
              title={'euhf'}
              description={'Black Modern Corporate Resume'}
              image={BlackModern}
            />
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Templates;
