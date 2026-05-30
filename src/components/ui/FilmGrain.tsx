const FilmGrain = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999999] opacity-[0.03] optimize-gpu"
      style={{
        backgroundImage: "url('/noise.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: '150px 150px',
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
      aria-hidden="true"
    />
  );
};

export default FilmGrain;