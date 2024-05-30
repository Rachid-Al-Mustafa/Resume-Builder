import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import 'jspdf-autotable';
import { createRoot } from 'react-dom/client';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import Resume from '../components/Resume';
import { useParams } from 'react-router-dom';

function ShowPDF() {
  const { resume } = useParams();

  return (
    <>
      <Header />
      <div className="flex justify-between m-4 items-start justify-content-flex-start">
        <div>
          <PDFViewer height="600vh" className="w-[80vh] rounded-lg m-4">
            <Resume />
          </PDFViewer>
        </div>
        <div className="flex flex-col items-start p-4">
          <h2 className="text-3xl font-bold text-black my-4">
            {resume}
          </h2>
          <p className="text-xl text-black text-start w-full md:w-2/3 my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            odio venenatis, vulputate laoreet mauris at, gravida justo. Aenean
            eu leo quam.
          </p>
          <button onClick={handleAddResume} className="bg-blue-900 text-white py-1.5 px-2.5 rounded-md text-lg font-medium mt-4">
            Add to My Resumes
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShowPDF;
