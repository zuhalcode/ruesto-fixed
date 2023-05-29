const Loading = ({ className = "mt-3" }) => {
  return (
    <div className={`mx-auto flex items-center justify-center ${className}`}>
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loading;
