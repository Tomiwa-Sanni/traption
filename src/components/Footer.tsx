
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 border-t">
      <div className="container flex flex-col items-center justify-center text-sm text-muted-foreground">
        <p>Traption by Tresh Tech, copyright Tresh Tech</p>
        <p className="mt-2">© {new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>
  );
};
