import profile from "../../assets/images/image1.png"

const ProductFea = () => {
  return (
      <div className="flex justify-center mt-20 h-auto overflow-y-hidden">
        <div className="w-1/3 h-full mr-7">
            <h3 className="text-2xl">Product Features</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum voluptas iusto, quisquam praesentium ducimus saepe quam quia culpa harum doloremque iure labore amet molestiae maxime illum. Ut rerum voluptatum fugiat?</p>
            <div className="mt-5">
                <div className="icon">

                </div>
                <div className="content">
                    <div className="h-28 w-full bg-slate-400 rounded-xl px-3 py-3 mb-3">
                        <h1>hello</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium temporibus labore dolorem officia sunt dolor. Animi porro voluptate adipisci rem?</p>
                    </div>
                    <div className="  h-28 w-full bg-slate-400 rounded-xl px-3 py-3 mb-3">
                        <h1>hello</h1>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi amet, aliquam fuga officiis hic error voluptas labore alias neque debitis.</p>
                    </div>
                    <div className="h-28 w-full bg-slate-400 rounded-xl px-3 py-3 mb-3">
                        <h1>hello</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia quas, impedit neque fuga ea beatae placeat cum tenetur? Veniam, cumque.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="ml-5 h-full px-auto py-10 w-1/3 bg-slate-200 flex justify-center">
            <img className="flex w-96 my-16" src={profile} alt="" />
        </div>
      </div>
  )
}

export default ProductFea
