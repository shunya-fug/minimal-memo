import AuthButton from "@/components/AuthButton";

export const NavigationBar = () => {
  return (
    <header>
      <nav className="navbar bg-neutral">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <h1 className="text-4xl select-none">Minimal Memo</h1>
        </div>
        <div className="navbar-end">
          <AuthButton />
        </div>
      </nav>
    </header>
  );
};
