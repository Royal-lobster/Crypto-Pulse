import Navbar from "~/components/navbar/Navbar";

const Nav = () => {
  return (
    <>
      <div
        className="absolute top-0 left-0 h-[300px] w-[240px] bg-gradient-to-br from-[#3D4045] via-transparent to-[#27272A]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, #3D4045 30%, #27272A 30%)",
        }}
      />
      <Navbar />
    </>
  );
};

export default Nav;
