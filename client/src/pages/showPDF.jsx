import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import 'jspdf-autotable';
import { createRoot } from 'react-dom/client';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import Resume from '../components/Resume';

function ShowPDF() {
  return (
    <>
      <Header />
      <div className="flex justify-between m-4 items-start justify-content-flex-start">
        <div>
          <PDFViewer height="600vh" className="w-96 rounded-lg m-4">
            <Resume />
          </PDFViewer>
        </div>
        <div className="flex items-start">
          <PDFDownloadLink document={<Resume />} fileName="resume.pdf">
            {({ loading }) =>
              loading ? (
                <button className="bg-blue-900 text-white py-1.5 px-2.5 rounded-md text-lg font-medium">
                  Loading Document...
                </button>
              ) : (
                <button className="bg-blue-900 text-white py-1.5 px-2.5 rounded-md text-lg font-medium">
                  Download
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShowPDF;
