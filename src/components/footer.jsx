export const Footer = () => {
  const fullYear = new Date().getFullYear();
  return (
    <footer className="w-full flex justify-center items-center h-16 px-4 bg-base-300/80 backdrop-blur-md text-sm text-base-content border-t border-base-100/50">
      <p className="text-center">
        Made in {fullYear} with <span className="text-red-500">♥</span> for the community
      </p>
    </footer>
  );
};
