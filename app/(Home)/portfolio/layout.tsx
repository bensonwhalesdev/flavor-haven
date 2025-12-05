import Header from "../components/header";
import MinimalFooter from "../components/MinimalFooter";


export default function ShareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Header />
        {children}
        <MinimalFooter />
    </div>
  );
}