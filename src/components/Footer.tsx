
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 border-t">
      <div className="container flex flex-col items-center justify-center text-sm text-muted-foreground">
        <a onClick={()=> prevent.default()} href="tel:+2349138289542" className="text-primary"><p>Contact Tresh Tech </p></a>
        <p className="mt-2">© {new Date().getFullYear()} Tresh Tech | All Right Reserved</p>
      </div>
    </footer>
  );
};
