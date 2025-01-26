import { Link } from "react-router-dom";

const PurchaseCoin = () => {
  const purchaseData = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 },
  ];

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-extrabold text-center mb-8">
        Choose Your Plan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {purchaseData.map((item, index) => (
          <div
            key={index}
            className="relative bg-white shadow-xl rounded-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <div className="absolute top-0 left-0 bg-green-500 text-white px-3 py-1 text-sm font-semibold rounded-br-lg">
              Best Value
            </div>
            <div className="p-5 mt-4">
              <h3 className="text-2xl font-bold text-amber-500 mb-4">
                {item.coins}{" "}
                <span className="text-2xl font-bold text-gray-800">Coins</span>
              </h3>
              <p className="text-3xl font-extrabold text-blue-600 mb-4">
                ${item.price}
              </p>
              <p className="text-gray-500 mb-6">
                Save more by purchasing higher coin packs!
              </p>
              <Link
                to="/dashboard/payment"
                state={{ coins: item.coins, price: item.price }}
              >
                {" "}
                <button className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PurchaseCoin;
