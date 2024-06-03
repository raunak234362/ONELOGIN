import Footer from "./Footer"
import Header from "./Header"
import Navbar from "./Navbar"
import ProductFea from "./ProductFea"

export const Landing = () =>{
  return (
    <div className="h-screen top-0 bg-gradient-to-b from-green-500 via-green-300 to-white ">
     <Navbar /> 
     <Header />
     <ProductFea />
     <Footer />
    </div>
  )
}
